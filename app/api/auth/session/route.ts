import { NextResponse } from 'next/server'
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore, doc, getDoc } from 'firebase/firestore'
import {
  AUTH_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} from '@/lib/auth-session'
import { verifyFirebaseIdToken } from '@/lib/verify-firebase-token'
import type { UserProfile, UserRole } from '@/lib/user-profile'

export const runtime = 'nodejs'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

function getFirebaseApp() {
  const existing = getApps()
  if (existing.length > 0) {
    return existing[0]
  }
  return initializeApp(firebaseConfig)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      idToken?: string
    }

    const idToken = String(body.idToken ?? '')
    if (!idToken) {
      return NextResponse.json({ error: 'Token ausente.' }, { status: 400 })
    }

    const decoded = await verifyFirebaseIdToken(idToken)
    const email = String(decoded.email ?? '').toLowerCase()
    const profileSnap = await getDoc(
      doc(getFirestore(getFirebaseApp()), 'users', decoded.sub)
    )
    const profile = profileSnap.data() as UserProfile | undefined

    if (profile?.accessStatus === 'pending') {
      return NextResponse.json(
        {
          error:
            'Seu cadastro foi recebido e está aguardando autorização. Você receberá um e-mail quando o acesso ao sistema for liberado.',
        },
        { status: 403 }
      )
    }

    const role = (profile?.role === 'admin' ? 'admin' : 'user') as UserRole
    const name = profile?.name ?? String(decoded.name ?? '')
    const companyName = profile?.companyName ?? ''

    const token = await createSessionToken({
      sub: decoded.sub,
      email,
      name,
      companyName,
      role,
    })

    const user = {
      id: decoded.sub,
      email,
      name,
      companyName,
      role,
    }

    const res = NextResponse.json({ user })
    res.cookies.set(AUTH_COOKIE_NAME, token, sessionCookieOptions())
    return res
  } catch (err) {
    console.error('session error', err)
    return NextResponse.json(
      { error: 'Sessão inválida. Faça login novamente.' },
      { status: 401 }
    )
  }
}
