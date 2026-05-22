import { NextResponse } from 'next/server'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { isValidCnpj, normalizeCnpj, onlyDigits } from '@/lib/cnpj'
import { sendRegistrationEmails } from '@/lib/email'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD = 8

type FirebaseLikeError = {
  code?: string
  message?: string
}

type RegisterBody = {
  name?: unknown
  companyName?: unknown
  cnpj?: unknown
  password?: unknown
  confirmPassword?: unknown
  phone?: unknown
  email?: unknown
  howHeard?: unknown
}

function getFirebaseApp() {
  const existing = getApps()
  if (existing.length > 0) {
    return existing[0]
  }
  return initializeApp(firebaseConfig)
}

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '')
}

function mapFirebaseAuthError(error: unknown): string {
  const firebaseError = error as FirebaseLikeError
  const code = firebaseError.code
  const message = firebaseError.message

  switch (code) {
    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado.'
    case 'auth/invalid-email':
      return 'E-mail inválido.'
    case 'auth/weak-password':
      return `A senha deve ter pelo menos ${MIN_PASSWORD} caracteres.`
    case 'auth/configuration-not-found':
      return 'Configuração do Firebase Auth não encontrada. Verifique se o método E-mail/senha está habilitado no Firebase Authentication e se as chaves do .env pertencem ao mesmo projeto.'
    default:
      return typeof message === 'string' && message.length > 0
        ? message
        : 'Não foi possível concluir o cadastro. Tente novamente.'
  }
}

export const runtime = 'nodejs'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)
  if (!body || typeof body !== 'object') {
    return NextResponse.json(
      { error: 'Formato de requisição inválido. Envie JSON.' },
      { status: 400 }
    )
  }

  const data = body as RegisterBody
  const name = String(data.name ?? '').trim()
  const companyName = String(data.companyName ?? '').trim()
  const cnpjInput = String(data.cnpj ?? '').trim()
  const password = String(data.password ?? '')
  const confirmPassword = String(data.confirmPassword ?? '')
  const phone = String(data.phone ?? '').trim()
  const email = String(data.email ?? '').trim().toLowerCase()
  const howHeard = String(data.howHeard ?? '').trim()

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'E-mail inválido.' }, { status: 400 })
  }
  if (password.length < MIN_PASSWORD) {
    return NextResponse.json(
      { error: `A senha deve ter pelo menos ${MIN_PASSWORD} caracteres.` },
      { status: 400 }
    )
  }
  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: 'A confirmação da senha não confere.' },
      { status: 400 }
    )
  }

  const cnpjDigits = onlyDigits(cnpjInput)
  let cnpj: string | undefined
  if (cnpjDigits.length > 0) {
    const normalized = normalizeCnpj(cnpjInput)
    if (!isValidCnpj(normalized)) {
      return NextResponse.json(
        { error: 'CNPJ inválido. Deixe em branco ou informe um CNPJ válido.' },
        { status: 400 }
      )
    }
    cnpj = normalized
  }

  try {
    const app = getFirebaseApp()
    const auth = getAuth(app)
    const db = getFirestore(app)

    // Check if CNPJ already exists
    if (cnpj) {
      const claimSnap = await getDoc(doc(db, 'cnpj_claims', cnpj))
      if (claimSnap.exists()) {
        return NextResponse.json(
          { error: 'Este CNPJ já está cadastrado.' },
          { status: 400 }
        )
      }
    }

    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const uid = userCredential.user.uid

    // Create user profile in Firestore
    const userProfile = {
      name,
      companyName,
      phone: normalizePhone(phone),
      email,
      howHeard,
      role: 'user',
      accessStatus: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(cnpj ? { cnpj } : {}),
    }

    await setDoc(doc(db, 'users', uid), userProfile)

    // Create CNPJ claim if applicable
    if (cnpj) {
      await setDoc(doc(db, 'cnpj_claims', cnpj), { uid })
    }

    // Sign out the user to prevent session creation
    await signOut(auth)
    await sendRegistrationEmails({
      uid,
      name,
      companyName,
      phone,
      email,
      howHeard,
      ...(cnpj ? { cnpj } : {}),
    }).catch((emailError) => {
      console.error('Registration email notification error:', emailError)
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Registration error:', error)
    const message = mapFirebaseAuthError(error)
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
