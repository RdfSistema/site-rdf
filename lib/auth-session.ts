import { SignJWT, jwtVerify } from 'jose'

export const AUTH_COOKIE_NAME = 'rdf_session'

function getSecretKey(): Uint8Array {
  const s = process.env.AUTH_SECRET
  if (!s || s.length < 16) {
    throw new Error('AUTH_SECRET deve ter pelo menos 16 caracteres.')
  }
  return new TextEncoder().encode(s)
}

export type SessionPayload = {
  sub: string
  email: string
  name: string
  role: string
}

export async function createSessionToken(payload: SessionPayload): Promise<string> {
  return new SignJWT({
    email: payload.email,
    name: payload.name,
    role: payload.role,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey())
}

export async function readSessionToken(token: string): Promise<SessionPayload> {
  const { payload } = await jwtVerify(token, getSecretKey(), {
    algorithms: ['HS256'],
  })
  const sub = payload.sub
  if (!sub || typeof sub !== 'string') {
    throw new Error('Token inválido')
  }
  return {
    sub,
    email: String(payload.email ?? ''),
    name: String(payload.name ?? ''),
    role: String(payload.role ?? 'user'),
  }
}

export function sessionCookieOptions(): {
  httpOnly: boolean
  secure: boolean
  sameSite: 'lax'
  path: string
  maxAge: number
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  }
}
