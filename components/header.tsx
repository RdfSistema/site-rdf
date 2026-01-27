"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/AuthContext"
import LanguageSelector from "@/components/language-selector"
import VideoLoading from "@/components/video-loading"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { t } = useLanguage()
  const { isAuthenticated, logout } = useAuth()

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setShowLoading(true)
  }

  const handleLoadingComplete = () => {
    setShowLoading(false)
    router.push("/login")
  }

  const menuItems = [
    { href: "/", labelKey: "header.home" },
    { href: "/transporte-internacional", labelKey: "header.internationalTransport" },
    { href: "/despacho-aduaneiro", labelKey: "header.customsClearance" },
    { href: "/transporte-nacional", labelKey: "header.nationalTransport" },
    { href: "/servicos-logisticos", labelKey: "header.logisticsServices" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname?.startsWith(href)
  }

  return (
    <>
      {showLoading && <VideoLoading onComplete={handleLoadingComplete} duration={4000} />}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-18 h-18">
            <img
              src="/logo.png"
              alt="RDF Logo"
              className="w-full h-full object-contain"
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm lg:text-base transition-colors ${
                isActive(item.href)
                  ? "text-[#34d1b4] font-semibold"
                  : "text-gray-700 hover:text-[#34d1b4]"
              }`}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>

        {/* Language Selector and CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageSelector />
          {isAuthenticated ? (
            <>
              <Link
                href="/area-cliente"
                className="px-6 py-2 rounded-lg text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-100 border border-gray-300"
              >
                {t("header.clientArea") || "Área do Cliente"}
              </Link>
              <button
                onClick={() => {
                  logout()
                  router.push("/")
                }}
                className="px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                style={{ backgroundColor: "#dc2626" }}
              >
                {t("header.logout") || "Sair"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className="px-6 py-2 rounded-lg text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-100 border border-gray-300"
              >
                {t("header.login")}
              </button>
              <Link
                href="/tracking"
                className="px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                style={{ backgroundColor: "#34d1b4" }}
              >
                {t("header.tracking")}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden shadow-lg">
            <div className="flex flex-col p-4 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-gray-700 hover:text-[#34d1b4] transition-colors ${
                    isActive(item.href) ? "text-[#34d1b4] font-semibold" : ""
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200">
                <LanguageSelector />
              </div>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/area-cliente"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg text-gray-700 font-semibold mt-2 text-center border border-gray-300 hover:bg-gray-100"
                  >
                    {t("header.clientArea") || "Área do Cliente"}
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                      router.push("/")
                    }}
                    className="px-4 py-2 rounded-lg text-white font-semibold mt-2 text-center w-full"
                    style={{ backgroundColor: "#dc2626" }}
                  >
                    {t("header.logout") || "Sair"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={(e) => {
                      setIsOpen(false)
                      handleLoginClick(e)
                    }}
                    className="px-4 py-2 rounded-lg text-gray-700 font-semibold mt-2 text-center border border-gray-300 hover:bg-gray-100 w-full"
                  >
                    {t("header.login")}
                  </button>
                  <Link
                    href="/tracking"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 rounded-lg text-white font-semibold mt-2 text-center"
                    style={{ backgroundColor: "#34d1b4" }}
                  >
                    {t("header.tracking")}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
    </>
  )
}
