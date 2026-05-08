"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ClientAreaDocuments from "@/components/client-area-documents"

export default function AreaClienteDocumentosPage() {
  const { isAuthenticated, isAuthLoading } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (isAuthLoading) return
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthLoading, isAuthenticated, router])

  if (isAuthLoading || !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-600">{t("clientArea.loading")}</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="mx-auto w-full max-w-[min(100%,min(110rem,calc(100vw-1.5rem)))] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 xl:px-10 2xl:px-12">
          <Link
            href="/area-cliente"
            className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-[#223354]"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            {t("clientArea.backToClientArea")}
          </Link>
          <ClientAreaDocuments />
      </div>
      <Footer />
    </main>
  )
}
