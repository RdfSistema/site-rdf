import { createRemoteJWKSet, jwtVerify } from 'jose'

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

const JWKS = createRemoteJWKSet(
  new URL(
    'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'
  )
)

export type FirebaseTokenPayload = {
  sub: string
  email?: string
  name?: string
}

export async function verifyFirebaseIdToken(
  idToken: string
): Promise<FirebaseTokenPayload> {
  if (!PROJECT_ID) {
    throw new Error('NEXT_PUBLIC_FIREBASE_PROJECT_ID não está definido.')
  }

  const { payload } = await jwtVerify(idToken, JWKS, {
    issuer: `https://securetoken.google.com/${PROJECT_ID}`,
    audience: PROJECT_ID,
  })

  const sub = payload.sub
  if (!sub || typeof sub !== 'string') {
    throw new Error('Token Firebase inválido.')
  }

  return {
    sub,
    email: typeof payload.email === 'string' ? payload.email : undefined,
    name: typeof payload.name === 'string' ? payload.name : undefined,
  }
}
