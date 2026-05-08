"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Building2,
  FileBadge,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { formatCnpjInput } from "@/lib/cnpj"
import { formatBrazilPhoneInput } from "@/lib/phone"
import Header from "@/components/header"
import Footer from "@/components/footer"

const HOW_HEARD_VALUES = [
  "google",
  "referral",
  "social",
  "event",
  "site",
  "other",
] as const

type HowHeardValue = (typeof HOW_HEARD_VALUES)[number]

function isHowHeardValue(v: string): v is HowHeardValue {
  return (HOW_HEARD_VALUES as readonly string[]).includes(v)
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 shadow-sm transition-all placeholder:text-gray-400 focus:border-[#34d1b4] focus:outline-none focus:ring-2 focus:ring-[#34d1b4]/25"

const labelClass = "mb-1.5 flex items-center gap-2 text-sm font-semibold text-[#223354]"

export default function CadastroPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [name, setName] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [howHeard, setHowHeard] = useState<HowHeardValue | "">("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const howHeardLabel = (key: HowHeardValue) =>
    t(`register.howHeardOptions.${key}`) || key

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          companyName,
          cnpj,
          password,
          confirmPassword,
          phone,
          email,
          howHeard: howHeard ? howHeardLabel(howHeard) : "",
        }),
      })
      const data = (await res.json()) as { error?: string }

      if (!res.ok) {
        setError(data.error || t("register.errorGeneric"))
        setIsLoading(false)
        return
      }

      router.push("/login?registered=1")
    } catch {
      setError(t("register.errorGeneric"))
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f6f9]">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -right-32 -top-24 h-96 w-96 rounded-full opacity-[0.12]"
          style={{ background: "radial-gradient(circle, #34d1b4 0%, transparent 70%)" }}
        />
        <div
          className="absolute -left-24 top-1/3 h-80 w-80 rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #223354 0%, transparent 70%)" }}
        />
      </div>

      <Header />
      <div className="relative mx-auto w-full max-w-[min(100%,min(110rem,calc(100vw-1.5rem)))] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10">
          <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_20px_50px_-12px_rgba(34,51,84,0.12)]">
            <div
              className="h-1.5 w-full"
              style={{
                background: "linear-gradient(90deg, #34d1b4 0%, #2ab59c 35%, #223354 100%)",
              }}
            />

            <div className="px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
              <div className="mb-6 text-center lg:mb-7 lg:text-left">
                <h1
                  className="text-2xl font-bold tracking-tight lg:text-3xl"
                  style={{ color: "#223354" }}
                >
                  {t("register.title")}
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 lg:text-base">
                  {t("register.subtitle")}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-800"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-8">
                {/* Acesso */}
                <section className="flex h-full min-h-0 flex-col rounded-2xl border border-gray-100 bg-gradient-to-b from-slate-50/90 to-white p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#34d1b4]/15 text-[#223354]">
                      <Lock className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-bold text-[#223354] lg:text-lg">
                          {t("register.sectionAccessTitle")}
                        </h2>
                        <span className="rounded-full bg-[#34d1b4]/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#0d6b5c] sm:text-xs">
                          {t("register.requiredBadge")}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        {t("register.sectionAccessHint")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col space-y-4">
                    <div>
                      <label htmlFor="email" className={labelClass}>
                        <Mail className="h-4 w-4 shrink-0 text-[#34d1b4]" aria-hidden />
                        {t("register.email")}
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        className={inputClass}
                        placeholder={t("login.emailPlaceholder")}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div>
                        <label htmlFor="password" className={labelClass}>
                          <Lock className="h-4 w-4 shrink-0 text-[#34d1b4]" aria-hidden />
                          {t("register.password")}
                        </label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          minLength={8}
                          autoComplete="new-password"
                          className={inputClass}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          {t("register.passwordHint")}
                        </p>
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className={labelClass}>
                          <Lock className="h-4 w-4 shrink-0 text-[#34d1b4]" aria-hidden />
                          {t("register.confirmPassword")}
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          minLength={8}
                          autoComplete="new-password"
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Perfil opcional */}
                <section className="flex h-full min-h-0 flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                  <div className="mb-4 flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#223354]/10 text-[#223354]">
                      <User className="h-5 w-5" aria-hidden />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-bold text-[#223354] lg:text-lg">
                          {t("register.sectionProfileTitle")}
                        </h2>
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-600 sm:text-xs">
                          {t("register.optionalBadge")}
                        </span>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                        {t("register.sectionProfileHint")}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <div>
                        <label htmlFor="name" className={labelClass}>
                          <User className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
                          {t("register.name")}
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="companyName" className={labelClass}>
                          <Building2 className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
                          {t("register.companyName")}
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          autoComplete="organization"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        <Phone className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
                        {t("register.phone")}
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) =>
                          setPhone(formatBrazilPhoneInput(e.target.value))
                        }
                        placeholder="(41) 99999-9999"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label htmlFor="cnpj" className={labelClass}>
                        <FileBadge className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
                        {t("register.cnpj")}
                      </label>
                      <input
                        id="cnpj"
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        value={cnpj}
                        onChange={(e) =>
                          setCnpj(formatCnpjInput(e.target.value))
                        }
                        placeholder="00.000.000/0000-00"
                        className={inputClass}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        {t("register.cnpjHint")}
                      </p>
                    </div>

                    <div>
                      <label htmlFor="howHeard" className={labelClass}>
                        <Sparkles className="h-4 w-4 shrink-0 text-gray-400" aria-hidden />
                        {t("register.howHeard")}
                      </label>
                      <select
                        id="howHeard"
                        value={howHeard}
                        onChange={(e) => {
                          const v = e.target.value
                          setHowHeard(isHowHeardValue(v) ? v : "")
                        }}
                        className={`${inputClass} cursor-pointer appearance-none bg-[length:1rem] bg-[right_0.75rem_center] bg-no-repeat pr-10`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                        }}
                      >
                        <option value="">{t("register.howHeardPlaceholder")}</option>
                        {HOW_HEARD_VALUES.map((key) => (
                          <option key={key} value={key}>
                            {howHeardLabel(key)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full overflow-hidden rounded-xl py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-55 sm:text-base"
                  style={{ backgroundColor: "#34d1b4" }}
                >
                  <span
                    className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)" }}
                  />
                  <span className="relative">
                    {isLoading ? t("register.submitting") : t("register.submit")}
                  </span>
                </button>
              </form>

              <p className="mt-6 border-t border-gray-100 pt-5 text-center text-sm text-gray-600">
                {t("register.alreadyAccount")}{" "}
                <Link
                  href="/login"
                  className="font-semibold text-[#34d1b4] underline-offset-2 hover:underline"
                >
                  {t("register.loginLink")}
                </Link>
              </p>
            </div>
          </div>
      </div>
      <Footer />
    </main>
  )
}
