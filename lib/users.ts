import type { Collection, Db, WithId } from 'mongodb'

export type UserRole = 'user' | 'admin'

export type UserDocument = {
  name: string
  companyName: string
  /** Presente apenas quando o usuário informou CNPJ válido. */
  cnpj?: string
  passwordHash: string
  phone: string
  email: string
  howHeard: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export type UserInDb = WithId<UserDocument>

export async function ensureUserIndexes(db: Db): Promise<void> {
  const col = usersCollection(db)
  await col.createIndex({ email: 1 }, { unique: true })
  await col.createIndex(
    { cnpj: 1 },
    { unique: true, sparse: true }
  )
}

export function usersCollection(db: Db): Collection<UserDocument> {
  return db.collection<UserDocument>('users')
}
