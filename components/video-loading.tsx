"use client"

import { useEffect, useRef } from "react"

interface VideoLoadingProps {
  onComplete: () => void
  duration?: number
}

export default function VideoLoading({ onComplete, duration = 4000 }: VideoLoadingProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Reproduzir o vídeo
    video.play().catch((error) => {
      console.error("Erro ao reproduzir vídeo:", error)
    })

    // Após a duração especificada, chamar onComplete
    const timer = setTimeout(() => {
      onComplete()
    }, duration)

    return () => {
      clearTimeout(timer)
    }
  }, [onComplete, duration])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] px-4">
        <video
          ref={videoRef}
          src="/loading.mp4"
          className="w-full h-auto rounded-lg"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </div>
  )
}
