"use client"

import { useLanguage } from "@/contexts/LanguageContext"

export default function Stats() {
  const { t } = useLanguage()
  
  const stats = [
    { labelKey: "stats.activeClients", value: "500+" },
    { labelKey: "stats.yearsExperience", value: "20+" },
    { labelKey: "stats.monthlyOperations", value: "1000+" },
    { labelKey: "stats.satisfactionRate", value: "98%" },
  ]

  return (
    <section className="py-20 sm:py-32 bg-gradient-to-r from-[#223354] to-[#2c5890]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center text-white animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: "#34d1b4" }}>
                {stat.value}
              </div>
              <p className="text-gray-200 text-lg">{t(stat.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
