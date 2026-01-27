"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function AreaClientePage() {
  const { user, isAuthenticated, logout } = useAuth()
  const { t } = useLanguage()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">{t("clientArea.loading") || "Carregando..."}</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header da Área do Cliente */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: "#223354" }}>
                  {t("clientArea.welcome") || "Bem-vindo à sua Área do Cliente"}
                </h1>
                <p className="text-gray-600">
                  {t("clientArea.greeting") || "Olá"} {user?.name}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {user?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="mt-4 sm:mt-0 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                style={{ backgroundColor: "#dc2626" }}
              >
                {t("clientArea.logout") || "Sair"}
              </button>
            </div>
          </div>

          {/* Cards de Informações */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Card de Operações */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: "#223354" }}>
                  {t("clientArea.operations") || "Operações"}
                </h3>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#34d1b4" }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mb-2" style={{ color: "#34d1b4" }}>0</p>
              <p className="text-gray-600 text-sm">
                {t("clientArea.activeOperations") || "Operações ativas"}
              </p>
            </div>

            {/* Card de Rastreamento */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: "#223354" }}>
                  {t("clientArea.tracking") || "Rastreamento"}
                </h3>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#34d1b4" }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mb-2" style={{ color: "#34d1b4" }}>0</p>
              <p className="text-gray-600 text-sm">
                {t("clientArea.trackedItems") || "Itens rastreados"}
              </p>
            </div>

            {/* Card de Documentos */}
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold" style={{ color: "#223354" }}>
                  {t("clientArea.documents") || "Documentos"}
                </h3>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#34d1b4" }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold mb-2" style={{ color: "#34d1b4" }}>0</p>
              <p className="text-gray-600 text-sm">
                {t("clientArea.pendingDocuments") || "Documentos pendentes"}
              </p>
            </div>
          </div>

          {/* Seção de Ações Rápidas */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#223354" }}>
              {t("clientArea.quickActions") || "Ações Rápidas"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#34d1b4] transition-all duration-300 text-left group">
                <h4 className="font-semibold mb-2 group-hover:text-[#34d1b4]" style={{ color: "#223354" }}>
                  {t("clientArea.newOperation") || "Nova Operação"}
                </h4>
                <p className="text-sm text-gray-600">
                  {t("clientArea.newOperationDesc") || "Solicite uma nova operação de importação ou exportação"}
                </p>
              </button>

              <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#34d1b4] transition-all duration-300 text-left group">
                <h4 className="font-semibold mb-2 group-hover:text-[#34d1b4]" style={{ color: "#223354" }}>
                  {t("clientArea.trackShipment") || "Rastrear Envio"}
                </h4>
                <p className="text-sm text-gray-600">
                  {t("clientArea.trackShipmentDesc") || "Acompanhe o status das suas mercadorias"}
                </p>
              </button>

              <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#34d1b4] transition-all duration-300 text-left group">
                <h4 className="font-semibold mb-2 group-hover:text-[#34d1b4]" style={{ color: "#223354" }}>
                  {t("clientArea.viewDocuments") || "Ver Documentos"}
                </h4>
                <p className="text-sm text-gray-600">
                  {t("clientArea.viewDocumentsDesc") || "Acesse seus documentos e certificados"}
                </p>
              </button>
            </div>
          </div>

          {/* Seção de Notícias e Atualizações */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold" style={{ color: "#223354" }}>
                {t("clientArea.newsTitle") || "Notícias e Atualizações"}
              </h2>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#34d1b4" }}>
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              {t("clientArea.newsSubtitle") || "Fique por dentro das últimas atualizações sobre despacho aduaneiro, portos e comércio exterior"}
            </p>

            <div className="space-y-4">
              {/* Notícia 1 */}
              <div className="border-l-4 border-[#34d1b4] bg-gray-50 rounded-r-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded" style={{ backgroundColor: "#34d1b4", color: "white" }}>
                        {t("clientArea.newsTag.ports") || "Portos"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {t("clientArea.newsDate1") || "15 de Janeiro, 2024"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#223354" }}>
                      {t("clientArea.newsTitle1") || "Novo terminal de contêineres no Porto de Santos"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {t("clientArea.newsContent1") || "O Porto de Santos inaugurou um novo terminal que aumentará a capacidade de movimentação de contêineres em 30%, reduzindo tempos de espera e melhorando a eficiência operacional."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notícia 2 */}
              <div className="border-l-4 border-[#34d1b4] bg-gray-50 rounded-r-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded" style={{ backgroundColor: "#34d1b4", color: "white" }}>
                        {t("clientArea.newsTag.customs") || "Despacho Aduaneiro"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {t("clientArea.newsDate2") || "12 de Janeiro, 2024"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#223354" }}>
                      {t("clientArea.newsTitle2") || "Atualização nas normas de despacho aduaneiro"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {t("clientArea.newsContent2") || "A Receita Federal publicou novas diretrizes que simplificam o processo de despacho aduaneiro para importações de baixo valor, agilizando o desembaraço de mercadorias."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notícia 3 */}
              <div className="border-l-4 border-[#34d1b4] bg-gray-50 rounded-r-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded" style={{ backgroundColor: "#34d1b4", color: "white" }}>
                        {t("clientArea.newsTag.ports") || "Portos"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {t("clientArea.newsDate3") || "10 de Janeiro, 2024"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#223354" }}>
                      {t("clientArea.newsTitle3") || "Porto de Paranaguá registra recorde de movimentação"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {t("clientArea.newsContent3") || "O Porto de Paranaguá bateu recorde histórico de movimentação de cargas no último trimestre, com destaque para exportações de grãos e importações de produtos industrializados."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notícia 4 */}
              <div className="border-l-4 border-[#34d1b4] bg-gray-50 rounded-r-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded" style={{ backgroundColor: "#34d1b4", color: "white" }}>
                        {t("clientArea.newsTag.customs") || "Despacho Aduaneiro"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {t("clientArea.newsDate4") || "8 de Janeiro, 2024"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#223354" }}>
                      {t("clientArea.newsTitle4") || "Sistema de despacho aduaneiro digital ganha novas funcionalidades"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {t("clientArea.newsContent4") || "A plataforma digital de despacho aduaneiro foi atualizada com novas funcionalidades que permitem acompanhamento em tempo real e notificações automáticas sobre o status das operações."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Notícia 5 */}
              <div className="border-l-4 border-[#34d1b4] bg-gray-50 rounded-r-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded" style={{ backgroundColor: "#34d1b4", color: "white" }}>
                        {t("clientArea.newsTag.ports") || "Portos"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {t("clientArea.newsDate5") || "5 de Janeiro, 2024"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "#223354" }}>
                      {t("clientArea.newsTitle5") || "Melhorias na infraestrutura do Porto de Itajaí"}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {t("clientArea.newsContent5") || "O Porto de Itajaí iniciou obras de modernização que incluem ampliação de pátios, novos equipamentos de movimentação e sistema automatizado de rastreamento de cargas."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
