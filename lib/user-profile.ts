export type UserRole = 'user' | 'admin'
export type UserAccessStatus = 'pending' | 'approved'

export type UserProfile = {
  name: string
  companyName: string
  cnpj?: string
  phone: string
  email: string
  howHeard: string
  role: UserRole
  accessStatus?: UserAccessStatus
}
