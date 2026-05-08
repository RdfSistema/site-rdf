"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

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

async function fetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers as Record<string, string>),
    },
  })
  return res.json() as Promise<T>
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setIsAuthLoading(true)
      try {
        const data = await fetchJson<{ user: User | null }>("/api/auth/me")
        if (!cancelled) {
          setUser(data.user)
        }
      } catch {
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setIsAuthLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
    const data = (await res.json()) as { user?: User; error?: string }
    if (!res.ok || !data.user) {
      return { ok: false as const, error: data.error }
    }
    setUser(data.user)
    return { ok: true as const }
  }

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
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
