"use client"

import { useState } from "react"

interface ClientsCarouselProps {
  direction?: "left" | "right"
  logos: string[]
}

export default function ClientsCarousel({ direction = "left", logos }: ClientsCarouselProps) {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  
  // Duplicar os logos múltiplas vezes para garantir que todos apareçam e criar um loop infinito suave
  // Usar 4 cópias para garantir que todos os logos sejam visíveis durante a animação e criar um loop perfeito
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos]
  
  // Debug: verificar se logo26 está presente
  if (process.env.NODE_ENV === 'development' && logos.includes('/logo26.webp')) {
    console.log(`Carrossel ${direction}: Total de logos: ${logos.length}, Logo26 presente: ${logos.includes('/logo26.webp')}, Total duplicado: ${duplicatedLogos.length}`)
  }

  const handleImageError = (logo: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    // Adicionar à lista de imagens que falharam
    setFailedImages(prev => new Set(prev).add(logo))
    // Esconder a imagem apenas se realmente falhou
    const target = e.currentTarget
    target.style.display = 'none'
    // Log para debug
    if (process.env.NODE_ENV === 'development') {
      console.warn(`Imagem falhou ao carregar: ${logo}`)
    }
  }

  return (
    <div className="overflow-hidden py-4">
      <div
        className="flex gap-12 md:gap-16 animate-scroll"
        style={{
          animationDirection: direction === "left" ? "normal" : "reverse",
        }}
      >
        {duplicatedLogos.map((logo, index) => {
          // Se a imagem já falhou antes, não renderizar
          if (failedImages.has(logo)) {
            return null
          }
          
          return (
            <div
              key={`${logo}-${index}`}
              className="flex-shrink-0 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 bg-white rounded-lg p-4 shadow-sm"
            >
              <img
                src={logo}
                alt={`Cliente ${index + 1}`}
                className="max-w-full max-h-full object-contain"
                onError={(e) => handleImageError(logo, e)}
                onLoad={() => {
                  // Debug: verificar se logo26 carregou
                  if (process.env.NODE_ENV === 'development' && logo === '/logo26.webp') {
                    console.log('Logo26 carregado com sucesso!')
                  }
                }}
                loading="lazy"
                decoding="async"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

