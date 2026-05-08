"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative">
      {/* Parte superior com fundo escuro */}
      <div className="bg-[#223354] text-white py-16">
        <div className="mx-auto w-full max-w-[min(100%,min(110rem,calc(100vw-1.5rem)))] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo e Sobre */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <img
                  src="/logo.png"
                  alt="RDF Logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <p className="text-gray-300 leading-relaxed text-sm">
                {t("footer.description")}
              </p>
            </div>

            {/* Links */}
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#34d1b4" }}>
                {t("footer.quickLinks")}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#servicos" className="hover:text-[#34d1b4] transition-colors">
                    {t("footer.services")}
                  </a>
                </li>
                <li>
                  <a href="#sobre" className="hover:text-[#34d1b4] transition-colors">
                    {t("footer.about")}
                  </a>
                </li>
                <li>
                  <a href="#contato" className="hover:text-[#34d1b4] transition-colors">
                    {t("footer.contact")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Serviços */}
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#34d1b4" }}>
                {t("footer.services")}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/transporte-internacional" className="hover:text-[#34d1b4] transition-colors">
                    {t("footer.internationalTransport")}
                  </a>
                </li>
                <li>
                  <a href="/despacho-aduaneiro" className="hover:text-[#34d1b4] transition-colors">
                    {t("footer.customsClearance")}
                  </a>
                </li>
                <li>
                  <a href="/transporte-nacional" className="hover:text-[#34d1b4] transition-colors">
                    {t("footer.nationalTransport")}
                  </a>
                </li>
                <li>
                  <a href="/servicos-logisticos" className="hover:text-[#34d1b4] transition-colors">
                    {t("footer.logisticsServices")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contato */}
            <div>
              <h3 className="font-bold text-lg mb-4" style={{ color: "#34d1b4" }}>
                {t("footer.contact")}
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{t("contact.phoneValue")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>{t("contact.emailValue")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{t("contact.addressValue")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Parte inferior com fundo branco */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="mx-auto w-full max-w-[min(100%,min(110rem,calc(100vw-1.5rem)))] px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
          <p className="text-center text-gray-600">
            {t("footer.copyright").replace("{year}", currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  )
}
