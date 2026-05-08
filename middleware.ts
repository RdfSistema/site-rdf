import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import { AUTH_COOKIE_NAME } from '@/lib/auth-session'

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith('/area-cliente')) {
    return NextResponse.next()
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const secret = process.env.AUTH_SECRET

  if (!token || !secret || secret.length < 16) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ['HS256'],
    })
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/area-cliente/:path*'],
}
