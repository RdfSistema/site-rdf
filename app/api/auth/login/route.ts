import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getDb } from '@/lib/mongodb'
import {
  AUTH_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
} from '@/lib/auth-session'
import { usersCollection } from '@/lib/users'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string }
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase()
    const password = String(body.password ?? '')

    if (!email || !password) {
      return NextResponse.json(
        { error: 'E-mail e senha são obrigatórios.' },
        { status: 400 }
      )
    }

    const db = await getDb()
    const users = usersCollection(db)
    const user = await users.findOne({ email })

    if (!user) {
      return NextResponse.json(
        { error: 'E-mail ou senha inválidos.' },
        { status: 401 }
      )
    }

    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) {
      return NextResponse.json(
        { error: 'E-mail ou senha inválidos.' },
        { status: 401 }
      )
    }

    const role = user.role ?? 'user'
    const token = await createSessionToken({
      sub: user._id.toString(),
      email: user.email,
      name: user.name,
      role,
    })

    const res = NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        companyName: user.companyName ?? '',
        role,
      },
    })

    res.cookies.set(AUTH_COOKIE_NAME, token, sessionCookieOptions())
    return res
  } catch (err) {
    console.error('login error', err)
    return NextResponse.json(
      { error: 'Erro ao entrar. Tente novamente.' },
      { status: 500 }
    )
  }
}
