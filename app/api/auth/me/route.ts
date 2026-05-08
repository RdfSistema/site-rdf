import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { cookies } from 'next/headers'
import { getDb } from '@/lib/mongodb'
import { AUTH_COOKIE_NAME, readSessionToken } from '@/lib/auth-session'
import { usersCollection } from '@/lib/users'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const jar = await cookies()
    const token = jar.get(AUTH_COOKIE_NAME)?.value
    if (!token) {
      return NextResponse.json({ user: null })
    }

    let session: { sub: string }
    try {
      session = await readSessionToken(token)
    } catch {
      return NextResponse.json({ user: null })
    }

    if (!ObjectId.isValid(session.sub)) {
      return NextResponse.json({ user: null })
    }

    const db = await getDb()
    const users = usersCollection(db)
    const doc = await users.findOne(
      { _id: new ObjectId(session.sub) },
      { projection: { passwordHash: 0 } }
    )

    if (!doc) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({
      user: {
        id: doc._id.toString(),
        email: doc.email,
        name: doc.name,
        companyName: doc.companyName ?? '',
        role: doc.role ?? 'user',
      },
    })
  } catch (err) {
    console.error('me error', err)
    return NextResponse.json({ user: null })
  }
}
