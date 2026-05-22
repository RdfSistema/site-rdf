import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME, readSessionToken } from '@/lib/auth-session'
import type { UserRole } from '@/lib/user-profile'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const jar = await cookies()
    const token = jar.get(AUTH_COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.json({ user: null })
    }

    let session: Awaited<ReturnType<typeof readSessionToken>>
    try {
      session = await readSessionToken(token)
    } catch {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: session.sub,
        email: session.email,
        name: session.name,
        companyName: session.companyName,
        role: (session.role === 'admin' ? 'admin' : 'user') as UserRole,
      },
    })
  } catch (err) {
    console.error('me error', err)
    return NextResponse.json({ user: null })
  }
}
