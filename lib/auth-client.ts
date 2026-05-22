'use client'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type AuthError,
} from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { isValidCnpj, normalizeCnpj, onlyDigits } from '@/lib/cnpj'
import { getFirebaseAuth, getFirebaseFirestore } from '@/lib/firebase'
import type { UserProfile, UserRole } from '@/lib/user-profile'

const MIN_PASSWORD = 8
const USERS_COLLECTION = 'users'

function normalizePhone(raw: string): string {
  return raw.replace(/\D/g, '')
}

function mapAuthError(err: unknown): string {
  const code = (err as AuthError)?.code
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Este e-mail já está cadastrado.'
    case 'auth/invalid-email':
      return 'E-mail inválido.'
    case 'auth/weak-password':
      return `A senha deve ter pelo menos ${MIN_PASSWORD} caracteres.`
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'E-mail ou senha inválidos.'
    case 'auth/configuration-not-found':
      return 'Configuração do Firebase Auth não encontrada. Verifique se o método E-mail/senha está habilitado no Firebase Authentication e se as chaves do .env pertencem ao mesmo projeto.'
    default:
      return 'Não foi possível concluir a operação. Tente novamente.'
  }
}

export type RegisterInput = {
  name: string
  companyName: string
  cnpj: string
  password: string
  confirmPassword: string
  phone: string
  email: string
  howHeard: string
}

export async function registerWithFirebase(
  input: RegisterInput
): Promise<{ ok: true } | { ok: false; error: string }> {
  const email = input.email.trim().toLowerCase()
  const password = input.password

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'E-mail inválido.' }
  }
  if (password.length < MIN_PASSWORD) {
    return {
      ok: false,
      error: `A senha deve ter pelo menos ${MIN_PASSWORD} caracteres.`,
    }
  }
  if (password !== input.confirmPassword) {
    return { ok: false, error: 'A confirmação da senha não confere.' }
  }

  const cnpjDigits = onlyDigits(input.cnpj)
  let cnpj: string | undefined
  if (cnpjDigits.length > 0) {
    const normalized = normalizeCnpj(input.cnpj)
    if (!isValidCnpj(normalized)) {
      return {
        ok: false,
        error: 'CNPJ inválido. Deixe em branco ou informe um CNPJ válido.',
      }
    }
    cnpj = normalized
  }

  const db = getFirebaseFirestore()

  if (cnpj) {
    const claimSnap = await getDoc(doc(db, 'cnpj_claims', cnpj))
    if (claimSnap.exists()) {
      return { ok: false, error: 'Este e-mail ou CNPJ já está cadastrado.' }
    }
  }

  const auth = getFirebaseAuth()

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    const profile: UserProfile & {
      createdAt: ReturnType<typeof serverTimestamp>
      updatedAt: ReturnType<typeof serverTimestamp>
    } = {
      name: input.name.trim(),
      companyName: input.companyName.trim(),
      phone: normalizePhone(input.phone),
      email,
      howHeard: input.howHeard.trim(),
      role: 'user',
      accessStatus: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      ...(cnpj ? { cnpj } : {}),
    }

    await setDoc(doc(db, USERS_COLLECTION, cred.user.uid), profile)
    if (cnpj) {
      await setDoc(doc(db, 'cnpj_claims', cnpj), { uid: cred.user.uid })
    }
    await signOut(auth)
    return { ok: true }
  } catch (err) {
    return { ok: false, error: mapAuthError(err) }
  }
}

export async function loginWithFirebase(
  email: string,
  password: string
): Promise<
  | { ok: true; user: { id: string; email: string; name: string; companyName: string; role: UserRole } }
  | { ok: false; error: string }
> {
  const auth = getFirebaseAuth()
  const normalizedEmail = email.trim().toLowerCase()

  try {
    const cred = await signInWithEmailAndPassword(
      auth,
      normalizedEmail,
      password
    )
    const idToken = await cred.user.getIdToken()

    const res = await fetch('/api/auth/session', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    })

    if (!res.ok) {
      await signOut(auth)
      const data = (await res.json()) as { error?: string }
      return { ok: false, error: data.error ?? 'Erro ao iniciar sessão.' }
    }

    const data = (await res.json()) as {
      user: { id: string; email: string; name: string; companyName: string; role: UserRole }
    }

    return { ok: true, user: data.user }
  } catch (err) {
    return { ok: false, error: mapAuthError(err) }
  }
}

export async function logoutFromFirebase(): Promise<void> {
  try {
    await signOut(getFirebaseAuth())
  } catch {
    /* ignore */
  }
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  })
}

export async function syncSessionFromFirebaseUser(): Promise<{
  id: string
  email: string
  name: string
  companyName: string
  role: UserRole
} | null> {
  const auth = getFirebaseAuth()
  const fbUser = auth.currentUser
  if (!fbUser) {
    return null
  }

  const idToken = await fbUser.getIdToken()
  const res = await fetch('/api/auth/session', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
  })

  if (!res.ok) {
    await signOut(auth)
    return null
  }

  const data = (await res.json()) as {
    user: { id: string; email: string; name: string; companyName: string; role: UserRole }
  }
  return data.user
}
