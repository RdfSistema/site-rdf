import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getAnalytics, isSupported, type Analytics } from 'firebase/analytics'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

export function getFirebaseClientApp(): FirebaseApp {
  const existing = getApps()
  if (existing.length > 0) {
    return existing[0]!
  }
  return initializeApp(firebaseConfig)
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseClientApp())
}

export function getFirebaseFirestore(): Firestore {
  return getFirestore(getFirebaseClientApp())
}

let analyticsInstance: Analytics | null = null

/** Analytics só funciona no navegador (não em SSR). */
export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (typeof window === 'undefined') {
    return null
  }
  if (analyticsInstance) {
    return analyticsInstance
  }
  const supported = await isSupported()
  if (!supported) {
    return null
  }
  analyticsInstance = getAnalytics(getFirebaseClientApp())
  return analyticsInstance
}
