"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface User {
  email: string
  name: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Credenciais de teste (em produção, isso viria de um backend)
const TEST_USER = {
  email: "cliente@rdfcomex.com.br",
  password: "senha123",
  name: "Cliente RDF"
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Carregar usuário salvo do localStorage
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("user")
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser))
        } catch (error) {
          console.error("Erro ao carregar usuário:", error)
        }
      }
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulação de autenticação
    // Em produção, isso faria uma chamada para a API
    if (email === TEST_USER.email && password === TEST_USER.password) {
      const userData: User = {
        email: TEST_USER.email,
        name: TEST_USER.name
      }
      setUser(userData)
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(userData))
      }
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("user")
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
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
