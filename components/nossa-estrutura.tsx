"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

interface EstruturaItem {
  titleKey: string
  descriptionKey: string
  images: string[] // Agora aceita múltiplas imagens
}

const estruturaItems: EstruturaItem[] = [
  {
    titleKey: "structure.warehouse.title",
    descriptionKey: "structure.warehouse.description",
    images: [
      "/operacao.jpg", // Você pode adicionar múltiplas imagens aqui
      // "/estrutura-armazem-2.jpg",
      // "/estrutura-armazem-3.jpg",
    ],
  },
  {
    titleKey: "structure.location.title",
    descriptionKey: "structure.location.description",
    images: [
      "/localizacao.jpg",
      // "/estrutura-localizacao-2.jpg",
    ],
  },
  {
    titleKey: "structure.technology.title",
    descriptionKey: "structure.technology.description",
    images: [
      "/estrutura.png",
      // "/estrutura-tecnologia-2.jpg",
    ],
  },
  {
    titleKey: "structure.sustainability.title",
    descriptionKey: "structure.sustainability.description",
    images: [
      "/estrutura-sustentabilidade.avif",
      // "/estrutura-sustentabilidade-2.jpg",
    ],
  },
]

function ImageCarousel({ images, title, index, t }: { images: string[]; title: string; index: number; t: (key: string) => string }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (idx: number) => {
    setCurrentImageIndex(idx)
  }

  // Se houver apenas uma imagem, não mostra controles
  if (images.length <= 1) {
    return (
      <div className="relative h-64 sm:h-72 mb-4 rounded-t-xl overflow-hidden shadow-lg">
        <img
          src={images[0]}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.currentTarget as HTMLImageElement
            target.style.display = 'none'
            const parent = target.parentElement
            if (parent) {
              parent.style.backgroundColor = '#2c5890'
              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-4xl font-bold">${index + 1}</div>`
            }
          }}
        />
      </div>
    )
  }

  return (
    <div className="relative h-64 sm:h-72 mb-4 rounded-t-xl overflow-hidden shadow-lg group">
      {/* Imagem atual */}
      <img
        src={images[currentImageIndex]}
        alt={`${title} - Imagem ${currentImageIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-300"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement
          target.style.display = 'none'
          const parent = target.parentElement
          if (parent) {
            parent.style.backgroundColor = '#2c5890'
            parent.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-4xl font-bold">${index + 1}</div>`
          }
        }}
      />

      {/* Botões de navegação */}
      <button
        onClick={prevImage}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={t("structure.previousImage")}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextImage}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        aria-label={t("structure.nextImage")}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores de pontos (dots) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToImage(idx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === currentImageIndex
                ? 'bg-white w-6'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`${t("structure.goToImage")} ${idx + 1}`}
          />
        ))}
      </div>

      {/* Contador de imagens */}
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  )
}

export default function NossaEstrutura() {
  const { t } = useLanguage()
  
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden" style={{ backgroundColor: "#223354" }}>
      {/* Formas curvas brancas na parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M0,120 Q300,60 600,80 T1200,100 L1200,120 L0,120 Z" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 text-center text-white">
          {t("structure.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {estruturaItems.map((item, index) => {
            const title = t(item.titleKey)
            return (
              <div
                key={index}
                className="flex flex-col animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Carrossel de Imagens */}
                <ImageCarousel images={item.images} title={title} index={index} t={t} />

                {/* Texto */}
                <div className="bg-white rounded-b-xl p-6 shadow-lg flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: "#223354" }}>
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {t(item.descriptionKey)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

