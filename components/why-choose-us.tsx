"use client"

import { useMemo } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import ClientsCarousel from "./clients-carousel"

// Array de logos dos clientes - logo1 a logo26
const clientLogos = [
  "/logo1.png",
  "/logo2.jpg",
  "/logo3.png",
  "/logo4.png",
  "/logo5.png",
  "/logo6.png",
  "/logo7.avif",
  "/logo9.jpg",
  "/logo10.jpg",
  "/logo11.jpg",
  "/logo12.png",
  "/logo13.png",
  "/logo14.png",
  "/logo15.png",
  "/logo16.png",
  "/logo17.jpg",
  "/logo19.jpg",
  "/logo20.jpg",
  "/logo21.jpg",
  "/logo22.png",
  "/logo23.png",
  "/logo24.png",
  "/logo25.jpg",
  "/logo26.png",
]

// Seeded random number generator para garantir que o shuffle seja o mesmo no servidor e no cliente
function seededRandom(seed: number) {
  let value = seed
  return () => {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

// Função para embaralhar array (Fisher-Yates shuffle) com seed determinístico
function shuffleArray<T>(array: T[], seed: number): T[] {
  const shuffled = [...array]
  const random = seededRandom(seed)
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export default function WhyChooseUs() {
  const { t } = useLanguage()
  
  // Embaralhar os logos com seeds fixos para garantir consistência entre servidor e cliente
  const shuffledLogosLeft = useMemo(() => {
    const shuffled = shuffleArray(clientLogos, 12345)
    // Debug: verificar se logo26 está presente
    if (process.env.NODE_ENV === 'development') {
      console.log('Left carousel logos:', shuffled.length, 'includes logo26:', shuffled.includes('/logo26.webp'))
    }
    return shuffled
  }, [])
  const shuffledLogosRight = useMemo(() => {
    const shuffled = shuffleArray(clientLogos, 67890)
    // Debug: verificar se logo26 está presente
    if (process.env.NODE_ENV === 'development') {
      console.log('Right carousel logos:', shuffled.length, 'includes logo26:', shuffled.includes('/logo26.webp'))
    }
    return shuffled
  }, [])

  return (
    <>
      <section id="sobre" className="py-20 sm:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Imagem */}
            <div className="order-2 md:order-1 animate-slideInLeft">
              <div className="relative h-96 sm:h-full">
                <div
                  className="w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #2c5890 0%, #34d1b4 100%)",
                  }}
                >
                  <img src="/sobrenos.png" alt="Equipe RDF" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="order-1 md:order-2 animate-slideInRight">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" style={{ color: "#223354" }}>
                {t("whyChooseUs.title")}
              </h2>

              <div 
                className="space-y-6 p-8 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #e6f7f3 100%)"
                }}
              >
                {[
                  {
                    titleKey: "whyChooseUs.costReduction.title",
                    descKey: "whyChooseUs.costReduction.description",
                  },
                  {
                    titleKey: "whyChooseUs.efficiency.title",
                    descKey: "whyChooseUs.efficiency.description",
                  },
                  {
                    titleKey: "whyChooseUs.flexibility.title",
                    descKey: "whyChooseUs.flexibility.description",
                  },
                  {
                    titleKey: "whyChooseUs.marketExpansion.title",
                    descKey: "whyChooseUs.marketExpansion.description",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                      style={{ backgroundColor: "#34d1b4" }}
                    >
                      ✓
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1" style={{ color: "#223354" }}>
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-gray-600">{t(item.descKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Nossos Clientes */}
      <section 
        className="py-12 sm:py-16"
        style={{
          background: "linear-gradient(180deg, #ffffff 0%, #f9fafb 50%, #f3f4f6 100%)"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-center" style={{ color: "#223354" }}>
            {t("whyChooseUs.clients")}
          </h2>
          
          {/* Primeiro carrossel - roda para a esquerda com logos aleatórios */}
          <div className="mb-6">
            <ClientsCarousel direction="left" logos={shuffledLogosLeft} />
          </div>
          
          {/* Segundo carrossel - roda para a direita com logos aleatórios */}
          <div>
            <ClientsCarousel direction="right" logos={shuffledLogosRight} />
          </div>
        </div>
      </section>
    </>
  )
}
