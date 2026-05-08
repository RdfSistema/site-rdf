"use client"

import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/header"
import Footer from "@/components/footer"
import VideoLoading from "@/components/video-loading"

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const { login } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const showRegisterSuccess = searchParams.get("registered") === "1"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setShowLoading(true)
  }

  const handleLoadingComplete = async () => {
    setShowLoading(false)
    setIsLoading(true)

    try {
      const result = await login(email, password)
      if (result.ok) {
        router.push("/area-cliente")
      } else {
        setError(result.error || t("login.invalidCredentials"))
        setIsLoading(false)
      }
    } catch {
      setError(t("login.error") || "Erro ao fazer login. Tente novamente.")
      setIsLoading(false)
    }
  }

  return (
    <>
      {showLoading && <VideoLoading onComplete={handleLoadingComplete} duration={4000} />}
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10">
              <div className="text-center mb-8">
                <h1
                  className="text-3xl sm:text-4xl font-bold mb-2"
                  style={{ color: "#223354" }}
                >
                  {t("login.title") || "Login"}
                </h1>
                <p className="text-gray-600">
                  {t("login.subtitle") || "Acesse sua área do cliente"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {showRegisterSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-lg text-sm">
                    {t("login.afterRegister")}
                  </div>
                )}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#223354" }}
                  >
                    {t("login.email") || "Email"}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#34d1b4] transition-all duration-300"
                    placeholder={t("login.emailPlaceholder") || "seu@email.com"}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: "#223354" }}
                  >
                    {t("login.password") || "Senha"}
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-[#34d1b4] transition-all duration-300"
                    placeholder={t("login.passwordPlaceholder") || "••••••••"}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#34d1b4" }}
                >
                  {isLoading
                    ? t("login.loading") || "Entrando..."
                    : t("login.submit") || "Entrar"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-600 mt-6">
                {t("login.noAccount")}{" "}
                <Link
                  href="/cadastro"
                  className="font-semibold text-[#34d1b4] hover:underline"
                >
                  {t("login.registerLink")}
                </Link>
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
          <p className="text-gray-600">…</p>
        </main>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
