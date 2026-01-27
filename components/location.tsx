"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function Location() {
  const { t } = useLanguage()
  const address = t("location.addressValue")
  const encodedAddress = encodeURIComponent(address)
  const googleMapsUrl = `https://www.google.com/maps?q=${encodedAddress}`

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: "#223354" }}>
              {t("location.title")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t("location.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Informações de Endereço */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 shadow-lg">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#34d1b4" }}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: "#223354" }}>
                      {t("location.address")}
                    </h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {address}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-300">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-xl transform hover:scale-105"
                    style={{ backgroundColor: "#34d1b4" }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    {t("location.viewOnMaps")}
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2" style={{ borderColor: "#34d1b4" }}>
                <h4 className="font-bold text-lg mb-3" style={{ color: "#223354" }}>
                  {t("location.hours")}
                </h4>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-semibold">{t("location.weekdays")}</span>
                    <span>{t("location.weekdaysHours")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">{t("location.saturday")}</span>
                    <span>{t("location.saturdayHours")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">{t("location.sunday")}</span>
                    <span>{t("location.closed")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                style={{ minHeight: "400px", border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

