"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from "react"
import ptTranslations from "../locales/pt.json"
import enTranslations from "../locales/en.json"
import esTranslations from "../locales/es.json"

type Language = "pt" | "en" | "es"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
  pt: ptTranslations,
  en: enTranslations,
  es: esTranslations,
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("pt")

  useEffect(() => {
    // Carregar idioma salvo do localStorage
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage && ["pt", "en", "es"].includes(savedLanguage)) {
        setLanguageState(savedLanguage)
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang)
      // Atualizar o atributo lang do HTML
      document.documentElement.lang = lang === "pt" ? "pt-BR" : lang === "en" ? "en-US" : "es-ES"
    }
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key
      }
    }
    
    return typeof value === "string" ? value : key
  }

  useEffect(() => {
    // Atualizar o atributo lang do HTML quando o idioma mudar
    if (typeof document !== "undefined") {
      document.documentElement.lang = language === "pt" ? "pt-BR" : language === "en" ? "en-US" : "es-ES"
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

