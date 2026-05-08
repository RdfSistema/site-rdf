import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { MongoServerError, type OptionalId } from 'mongodb'
import { getDb } from '@/lib/mongodb'
import { isValidCnpj, normalizeCnpj, onlyDigits } from '@/lib/cnpj'
import { ensureUserIndexes, usersCollection, type UserDocument } from '@/lib/users'

export const runtime = 'nodejs'

const MIN_PASSWORD = 8

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '')
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>

    const name = String(body.name ?? '').trim()
    const companyName = String(body.companyName ?? '').trim()
    const cnpjRaw = String(body.cnpj ?? '')
    const password = String(body.password ?? '')
    const confirmPassword = String(body.confirmPassword ?? '')
    const phoneRaw = String(body.phone ?? '')
    const email = String(body.email ?? '')
      .trim()
      .toLowerCase()
    const howHeard = String(body.howHeard ?? '').trim()

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

    const cnpjDigits = onlyDigits(cnpjRaw)
    let cnpj: string | undefined
    if (cnpjDigits.length > 0) {
      const normalized = normalizeCnpj(cnpjRaw)
      if (!isValidCnpj(normalized)) {
        return NextResponse.json(
          { error: 'CNPJ inválido. Deixe em branco ou informe um CNPJ válido.' },
          { status: 400 }
        )
      }
      cnpj = normalized
    }

    const db = await getDb()
    await ensureUserIndexes(db)
    const users = usersCollection(db)

    const passwordHash = await bcrypt.hash(password, 10)
    const now = new Date()

    const doc: OptionalId<UserDocument> = {
      name,
      companyName,
      passwordHash,
      phone: normalizePhone(phoneRaw),
      email,
      howHeard,
      role: 'user',
      createdAt: now,
      updatedAt: now,
    }
    if (cnpj) {
      doc.cnpj = cnpj
    }

    await users.insertOne(doc)

    return NextResponse.json({ ok: true })
  } catch (err: unknown) {
    if (err instanceof MongoServerError && err.code === 11000) {
      return NextResponse.json(
        { error: 'Este e-mail ou CNPJ já está cadastrado.' },
        { status: 409 }
      )
    }
    console.error('register error', err)
    return NextResponse.json(
      { error: 'Não foi possível concluir o cadastro. Tente novamente.' },
      { status: 500 }
    )
  }
}
