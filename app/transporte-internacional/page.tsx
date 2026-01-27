import Header from "@/components/header"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Location from "@/components/location"

export default function TransporteInternacional() {
  return (
    <main className="bg-white">
      <Header />
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#223354] to-[#24345c] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Transporte Internacional
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Conectamos seu negócio ao mundo com soluções logísticas internacionais completas, seguras e eficientes
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "#223354" }}>
                Nossos Serviços de Transporte Internacional
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                A RDF oferece soluções completas e integradas de transporte internacional para importação e exportação. Com mais de 20 anos de experiência no mercado, nossa equipe especializada garante que suas mercadorias sejam transportadas com máxima segurança, agilidade e dentro dos prazos estabelecidos. Trabalhamos com uma rede global de parceiros confiáveis, proporcionando acesso direto aos principais portos e aeroportos do mundo.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Transporte Marítimo
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Soluções completas para transporte marítimo de cargas FCL (Full Container Load) e LCL (Less than Container Load), com conexões para os principais portos do mundo. Oferecemos rotas regulares para Ásia, Europa, Américas e África, com opções de consolidação e desconsolidação de cargas.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Cargas FCL e LCL</li>
                    <li>Conexões para principais portos globais</li>
                    <li>Rastreamento em tempo real</li>
                    <li>Documentação completa</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Transporte Aéreo
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Transporte aéreo expresso para cargas urgentes e de alto valor agregado. Trabalhamos com as principais companhias aéreas internacionais, oferecendo opções de frete aéreo consolidado ou dedicado, com rastreamento em tempo real e entrega rápida em qualquer destino do mundo.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Serviço expresso e urgente</li>
                    <li>Rastreamento 24/7</li>
                    <li>Parcerias com principais companhias aéreas</li>
                    <li>Ideal para cargas de alto valor</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Transporte Rodoviário Internacional
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Serviços especializados de transporte rodoviário internacional com cobertura completa em toda a América do Sul. Nossa frota moderna e equipe experiente garantem transporte seguro e eficiente entre países, com documentação adequada e cumprimento de todas as regulamentações alfandegárias.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Cobertura em toda América do Sul</li>
                    <li>Frota moderna e rastreada</li>
                    <li>Documentação e desembaraço</li>
                    <li>Transporte de cargas completas e fracionadas</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Transporte Multimodal
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Soluções logísticas integradas combinando diferentes modais de transporte (marítimo, aéreo, rodoviário e ferroviário) para otimizar custos, prazos e eficiência operacional. Desenvolvemos projetos personalizados que integram toda a cadeia logística, desde a origem até o destino final.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Integração de múltiplos modais</li>
                    <li>Otimização de custos e prazos</li>
                    <li>Projetos personalizados</li>
                    <li>Gestão completa da cadeia logística</li>
                  </ul>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>20+</div>
                  <div className="text-gray-700 font-semibold">Anos de Experiência</div>
                </div>
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>100+</div>
                  <div className="text-gray-700 font-semibold">Países Atendidos</div>
                </div>
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>24/7</div>
                  <div className="text-gray-700 font-semibold">Suporte e Rastreamento</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Location />
      <Footer />
    </main>
  )
}

