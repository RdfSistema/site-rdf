"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { onAuthStateChanged } from "firebase/auth"
import { getFirebaseAuth } from "@/lib/firebase"
import {
  loginWithFirebase,
  logoutFromFirebase,
  syncSessionFromFirebaseUser,
} from "@/lib/auth-client"

export type UserRole = "user" | "admin"

export interface User {
  id: string
  email: string
  name: string
  companyName: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (
    email: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>
  logout: () => Promise<void>
  isAuthenticated: boolean
  isAuthLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

async function fetchMe(): Promise<User | null> {
  const res = await fetch("/api/auth/me", { credentials: "include" })
  const data = (await res.json()) as { user: User | null }
  return data.user
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const loadUser = async () => {
      setIsAuthLoading(true)
      try {
        const synced = await syncSessionFromFirebaseUser()
        if (cancelled) return
        if (synced) {
          setUser(synced)
          return
        }
        const fromCookie = await fetchMe()
        if (!cancelled) {
          setUser(fromCookie)
        }
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setIsAuthLoading(false)
      }
    }

    void loadUser()

    const auth = getFirebaseAuth()
    const unsubscribe = onAuthStateChanged(auth, () => {
      void loadUser()
    })

    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [])

  const login = async (email: string, password: string) => {
    const result = await loginWithFirebase(email, password)
    if (!result.ok) {
      return { ok: false as const, error: result.error }
    }
    setUser(result.user)
    return { ok: true as const }
  }

  const logout = async () => {
    try {
      await logoutFromFirebase()
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAuthLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
