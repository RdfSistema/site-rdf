"use client"

import { Ship, FileCheck, Truck, Package } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const services = [
  {
    id: 1,
    titleKey: "services.internationalTransport",
    descriptionKey: "services.internationalTransportDesc",
    icon: Ship,
  },
  {
    id: 2,
    titleKey: "services.customsClearance",
    descriptionKey: "services.customsClearanceDesc",
    icon: FileCheck,
  },
  {
    id: 3,
    titleKey: "services.nationalTransport",
    descriptionKey: "services.nationalTransportDesc",
    icon: Truck,
  },
  {
    id: 4,
    titleKey: "services.logisticsServices",
    descriptionKey: "services.logisticsServicesDesc",
    icon: Package,
  },
]

export default function Services() {
  const { t } = useLanguage()
  return (
    <section id="servicos" className="py-0">
      {/* Header Section */}
      <div className="bg-[#223354] py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center sm:text-left">
            {t("services.title") || "NOSSOS SERVIÇOS"}
          </h2>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
        {services.map((service, index) => {
          const IconComponent = service.icon
          return (
            <div
              key={service.id}
              className="bg-[#34d1b4] p-8 sm:p-10 lg:p-12 min-h-[300px] flex flex-col justify-center animate-fadeInUp cursor-pointer transition-all duration-300 ease-in-out hover:bg-[#2cccac] hover:scale-105 hover:shadow-2xl hover:z-10 relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 transition-transform duration-300 hover:scale-110">
                <IconComponent className="w-12 h-12 sm:w-16 sm:h-16 text-white" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white uppercase leading-tight transition-transform duration-300 hover:translate-x-2">
                {t(service.titleKey)}
              </h3>
              <p className="text-white text-base sm:text-lg leading-relaxed transition-opacity duration-300 hover:opacity-90">
                {t(service.descriptionKey)}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
