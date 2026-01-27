"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface TrackingStep {
  id: number
  status: "completed" | "in-progress" | "pending"
  title: string
  description: string
  date: string
  time: string
  location?: string
}

interface TrackingData {
  trackingNumber: string
  containerNumber?: string
  origin: string
  destination: string
  estimatedArrival?: string
  currentStatus: string
  steps: TrackingStep[]
}

// Dados mockados para demonstração
const mockTrackingData: Record<string, TrackingData> = {
  "RDF123456": {
    trackingNumber: "RDF123456",
    containerNumber: "CONT-ABC-123456",
    origin: "Shanghai, China",
    destination: "São Paulo, Brasil",
    estimatedArrival: "2024-02-15",
    currentStatus: "Em Trânsito",
    steps: [
      {
        id: 1,
        status: "completed",
        title: "Documentação Iniciada",
        description: "Documentos de exportação recebidos e em análise",
        date: "2024-01-20",
        time: "09:30",
        location: "Shanghai, China",
      },
      {
        id: 2,
        status: "completed",
        title: "Carga Coletada",
        description: "Carga coletada no local de origem",
        date: "2024-01-22",
        time: "14:15",
        location: "Shanghai, China",
      },
      {
        id: 3,
        status: "completed",
        title: "Despacho Aduaneiro de Exportação",
        description: "Despacho aduaneiro concluído com sucesso",
        date: "2024-01-24",
        time: "11:00",
        location: "Porto de Shanghai",
      },
      {
        id: 4,
        status: "completed",
        title: "Embarque no Navio",
        description: "Container embarcado no navio MV Evergreen",
        date: "2024-01-26",
        time: "16:45",
        location: "Porto de Shanghai",
      },
      {
        id: 5,
        status: "in-progress",
        title: "Em Trânsito",
        description: "Carga em trânsito pelo Oceano Pacífico",
        date: "2024-01-26",
        time: "17:00",
        location: "Oceano Pacífico",
      },
      {
        id: 6,
        status: "pending",
        title: "Chegada ao Porto de Destino",
        description: "Previsão de chegada ao Porto de Santos",
        date: "2024-02-10",
        time: "08:00",
        location: "Porto de Santos, Brasil",
      },
      {
        id: 7,
        status: "pending",
        title: "Desembarque",
        description: "Desembarque do container no porto",
        date: "2024-02-10",
        time: "10:00",
        location: "Porto de Santos, Brasil",
      },
      {
        id: 8,
        status: "pending",
        title: "Despacho Aduaneiro de Importação",
        description: "Início do processo de despacho aduaneiro",
        date: "2024-02-11",
        time: "09:00",
        location: "Alfândega - Porto de Santos",
      },
      {
        id: 9,
        status: "pending",
        title: "Liberação Aduaneira",
        description: "Liberação pela Receita Federal",
        date: "2024-02-12",
        time: "14:00",
        location: "Alfândega - Porto de Santos",
      },
      {
        id: 10,
        status: "pending",
        title: "Armazenamento",
        description: "Carga armazenada em nosso armazém",
        date: "2024-02-13",
        time: "10:00",
        location: "Armazém RDF - São Paulo",
      },
      {
        id: 11,
        status: "pending",
        title: "Transporte Nacional",
        description: "Carga em transporte para destino final",
        date: "2024-02-14",
        time: "08:00",
        location: "São Paulo, Brasil",
      },
      {
        id: 12,
        status: "pending",
        title: "Entrega Finalizada",
        description: "Carga entregue ao destinatário",
        date: "2024-02-15",
        time: "16:00",
        location: "São Paulo, Brasil",
      },
    ],
  },
  "RDF789012": {
    trackingNumber: "RDF789012",
    containerNumber: "CONT-XYZ-789012",
    origin: "Rotterdam, Holanda",
    destination: "São Paulo, Brasil",
    estimatedArrival: "2024-02-20",
    currentStatus: "Armazenamento",
    steps: [
      {
        id: 1,
        status: "completed",
        title: "Documentação Iniciada",
        description: "Documentos de exportação recebidos",
        date: "2024-01-15",
        time: "10:00",
        location: "Rotterdam, Holanda",
      },
      {
        id: 2,
        status: "completed",
        title: "Carga Coletada",
        description: "Carga coletada no local de origem",
        date: "2024-01-17",
        time: "13:30",
        location: "Rotterdam, Holanda",
      },
      {
        id: 3,
        status: "completed",
        title: "Despacho Aduaneiro de Exportação",
        description: "Despacho aduaneiro concluído",
        date: "2024-01-19",
        time: "15:00",
        location: "Porto de Rotterdam",
      },
      {
        id: 4,
        status: "completed",
        title: "Embarque no Navio",
        description: "Container embarcado no navio MV Maersk",
        date: "2024-01-21",
        time: "09:00",
        location: "Porto de Rotterdam",
      },
      {
        id: 5,
        status: "completed",
        title: "Em Trânsito",
        description: "Carga em trânsito pelo Oceano Atlântico",
        date: "2024-01-21",
        time: "10:00",
        location: "Oceano Atlântico",
      },
      {
        id: 6,
        status: "completed",
        title: "Chegada ao Porto de Destino",
        description: "Chegada ao Porto de Santos",
        date: "2024-02-05",
        time: "07:30",
        location: "Porto de Santos, Brasil",
      },
      {
        id: 7,
        status: "completed",
        title: "Desembarque",
        description: "Desembarque do container no porto",
        date: "2024-02-05",
        time: "12:00",
        location: "Porto de Santos, Brasil",
      },
      {
        id: 8,
        status: "completed",
        title: "Despacho Aduaneiro de Importação",
        description: "Processo de despacho aduaneiro iniciado",
        date: "2024-02-06",
        time: "09:00",
        location: "Alfândega - Porto de Santos",
      },
      {
        id: 9,
        status: "completed",
        title: "Liberação Aduaneira",
        description: "Liberação pela Receita Federal",
        date: "2024-02-08",
        time: "11:30",
        location: "Alfândega - Porto de Santos",
      },
      {
        id: 10,
        status: "in-progress",
        title: "Armazenamento",
        description: "Carga armazenada em nosso armazém",
        date: "2024-02-09",
        time: "14:00",
        location: "Armazém RDF - São Paulo",
      },
      {
        id: 11,
        status: "pending",
        title: "Transporte Nacional",
        description: "Aguardando agendamento de transporte",
        date: "2024-02-19",
        time: "08:00",
        location: "São Paulo, Brasil",
      },
      {
        id: 12,
        status: "pending",
        title: "Entrega Finalizada",
        description: "Previsão de entrega ao destinatário",
        date: "2024-02-20",
        time: "16:00",
        location: "São Paulo, Brasil",
      },
    ],
  },
}

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null)
  const [error, setError] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSearching(true)

    // Simular busca (em produção, isso seria uma chamada à API)
    setTimeout(() => {
      const data = mockTrackingData[trackingNumber.toUpperCase()]
      if (data) {
        setTrackingData(data)
      } else {
        setError("Número de rastreamento não encontrado. Tente: RDF123456 ou RDF789012")
        setTrackingData(null)
      }
      setIsSearching(false)
    }, 1000)
  }

  const getStatusColor = (status: TrackingStep["status"]) => {
    switch (status) {
      case "completed":
        return "#34d1b4"
      case "in-progress":
        return "#2c5890"
      case "pending":
        return "#e5e7eb"
    }
  }

  const getStepIcon = (step: TrackingStep) => {
    const title = step.title.toLowerCase()
    
    // Ícone de entrega finalizada
    if (title.includes("entreg") || title.includes("finalizad")) {
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <rect x="6" y="8" width="12" height="10" rx="1" fill="#34d1b4" transform="rotate(-5 12 13)" />
          <path
            d="M8 10 L12 14 L16 10"
            stroke="#223354"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      )
    }
    
    // Ícone de em rota/trânsito
    if (title.includes("rota") || title.includes("trânsito") || title.includes("transporte")) {
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="10" width="16" height="8" rx="1" fill="#34d1b4" />
          <circle cx="7" cy="18" r="2" fill="#223354" />
          <circle cx="17" cy="18" r="2" fill="#223354" />
          <path
            d="M8 14 L16 14"
            stroke="#223354"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
    }
    
    // Ícone de armazenamento/despacho
    if (title.includes("armazen") || title.includes("despacho") || title.includes("liberação")) {
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <rect x="5" y="7" width="14" height="12" rx="1" fill="#34d1b4" />
          <path
            d="M9 11 L15 11 M9 14 L15 14 M9 17 L13 17"
            stroke="#223354"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      )
    }
    
    // Ícone padrão de check para concluído
    if (step.status === "completed") {
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#34d1b4" />
          <path
            d="M8 12 L11 15 L16 9"
            stroke="#223354"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    }
    
    // Ícone de relógio para pendente
    if (step.status === "pending") {
      return (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="2" fill="#f3f4f6" />
          <path
            d="M12 8 L12 12 L15 15"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )
    }
    
    // Ícone padrão
    return (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" fill="#2c5890" />
        <path
          d="M12 8 L12 16 M8 12 L16 12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <main className="bg-white min-h-screen">
      <Header />
      
      <section className="pt-8 pb-12 sm:pt-12 sm:pb-16 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #223354 0%, #2c5890 50%, #223354 100%)" }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Título Melhorado */}
            <div className="text-center mb-8 animate-fadeInUp">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-white">
                Rastreamento de Carga
              </h1>
              <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
                Acompanhe sua carga em tempo real com atualizações detalhadas de cada etapa do processo
              </p>
            </div>

            {/* Formulário de Busca Melhorado */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl mb-8 border border-gray-100 animate-fadeInUp">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative group">
                    <label className="block text-sm font-semibold mb-2" style={{ color: "#223354" }}>
                      Número de Rastreamento
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400 group-focus-within:text-[#34d1b4] transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value.toUpperCase())}
                        placeholder="Ex: RDF123456"
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-[#34d1b4] focus:ring-4 focus:ring-[#34d1b4]/10 transition-all duration-300 text-lg font-semibold placeholder:text-gray-400"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2 ml-1">
                      Digite o código de rastreamento fornecido no momento da contratação
                    </p>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02] hover:bg-[#2cccac] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 min-w-[160px] h-[56px]"
                      style={{ backgroundColor: "#34d1b4" }}
                    >
                      {isSearching ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Buscando...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                          Rastrear Agora
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}
            </div>

            {/* Resultado do Rastreamento */}
            {trackingData && (
              <div className="bg-white rounded-2xl shadow-2xl animate-fadeInUp overflow-hidden border border-gray-100">
                {/* Header Azul */}
                <div className="bg-[#223354] text-white px-6 sm:px-8 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <p className="text-xs font-semibold mb-2 opacity-80 uppercase tracking-wide">
                        Objeto
                      </p>
                      <p className="text-2xl font-bold mb-1">{trackingData.trackingNumber}</p>
                      {trackingData.containerNumber && (
                        <p className="text-sm text-gray-300 font-medium">
                          {trackingData.containerNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2 opacity-80 uppercase tracking-wide">
                        Status
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full animate-pulse"
                          style={{ backgroundColor: "#34d1b4" }}
                        ></span>
                        <p className="text-2xl font-bold" style={{ color: "#34d1b4" }}>
                          {trackingData.currentStatus}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold mb-2 opacity-80 uppercase tracking-wide">
                        Data da entrega
                      </p>
                      <p className="text-2xl font-bold">
                        {trackingData.estimatedArrival
                          ? new Date(trackingData.estimatedArrival).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "A definir"}
                      </p>
                    </div>
                  </div>

                  {/* Informações Adicionais */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#34d1b4] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs opacity-70 mb-1">Origem</p>
                        <p className="text-sm font-semibold">{trackingData.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-[#34d1b4] flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-xs opacity-70 mb-1">Destino</p>
                        <p className="text-sm font-semibold">{trackingData.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Timeline de Etapas */}
                <div className="p-6 sm:p-8 bg-gray-50">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-1" style={{ color: "#223354" }}>
                      Histórico de Rastreamento
                    </h3>
                    <p className="text-sm text-gray-600">
                      Acompanhe todas as etapas do processo de sua carga
                    </p>
                  </div>
                  <div className="relative">
                    {/* Linha vertical da timeline - usando cor accent do site */}
                    <div
                      className="absolute left-8 top-0 bottom-0 w-1 rounded-full"
                      style={{ backgroundColor: "#34d1b4" }}
                    ></div>

                    {/* Etapas - ordem invertida (mais recente no topo) */}
                    <div className="space-y-0">
                      {[...trackingData.steps].reverse().map((step, index) => {
                        const formattedDate = new Date(step.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })
                        const formattedDateTime = `${formattedDate} ${step.time}`

                        return (
                          <div
                            key={step.id}
                            className={`relative flex gap-5 pb-6 last:pb-0 transition-all duration-300 hover:bg-white/50 rounded-lg px-2 -mx-2 ${
                              step.status === "in-progress" ? "bg-white/30" : ""
                            }`}
                          >
                            {/* Ícone da etapa - estilo similar à imagem */}
                            <div
                              className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center relative z-10 shadow-md border-2 transition-all duration-300"
                              style={{
                                backgroundColor:
                                  step.status === "completed" || step.status === "in-progress"
                                    ? "#f3f4f6"
                                    : "#f9fafb",
                                borderColor:
                                  step.status === "completed"
                                    ? "#34d1b4"
                                    : step.status === "in-progress"
                                    ? "#2c5890"
                                    : "#e5e7eb",
                              }}
                            >
                              {getStepIcon(step)}
                            </div>

                            {/* Conteúdo da etapa - estilo mais limpo */}
                            <div className="flex-1 pt-1 pb-2">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <h3
                                  className={`text-base font-bold ${
                                    step.status === "pending"
                                      ? "text-gray-400"
                                      : "text-[#223354]"
                                  }`}
                                >
                                  {step.title}
                                </h3>
                                <span
                                  className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${
                                    step.status === "completed"
                                      ? "bg-[#34d1b4]/10 text-[#34d1b4]"
                                      : step.status === "in-progress"
                                      ? "bg-[#2c5890]/10 text-[#2c5890]"
                                      : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  {step.status === "completed"
                                    ? "Concluído"
                                    : step.status === "in-progress"
                                    ? "Em Andamento"
                                    : "Pendente"}
                                </span>
                              </div>
                              <p
                                className={`text-sm mb-2 leading-relaxed ${
                                  step.status === "pending" ? "text-gray-400" : "text-gray-700"
                                }`}
                              >
                                {step.description}
                              </p>
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                {step.location && (
                                  <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <svg
                                      className="w-4 h-4"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                      />
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                      />
                                    </svg>
                                    <span>{step.location}</span>
                                  </div>
                                )}
                                <p
                                  className={`text-xs font-semibold ${
                                    step.status === "pending" ? "text-gray-400" : "text-gray-600"
                                  }`}
                                >
                                  {formattedDateTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

