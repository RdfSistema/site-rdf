import Header from "@/components/header"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Location from "@/components/location"

export default function DespachoAduaneiro() {
  return (
    <main className="bg-white">
      <Header />
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#223354] to-[#24345c] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Despacho Aduaneiro
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Desembaraço aduaneiro completo com expertise, agilidade e otimização fiscal para suas operações de importação e exportação
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "#223354" }}>
                Serviços de Despacho Aduaneiro
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                A RDF possui uma equipe altamente especializada e certificada em despacho aduaneiro, garantindo que seus processos de importação e exportação sejam realizados com máxima eficiência, total conformidade legal e otimização de custos. Nossa expertise abrange desde a classificação fiscal correta até o desembaraço completo, trabalhando com agilidade para evitar atrasos, multas e retenções alfandegárias. Oferecemos consultoria completa e suporte em todas as etapas do processo aduaneiro.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Despacho de Importação
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Processamento completo de importação, desde a chegada da mercadoria no porto ou aeroporto até a liberação aduaneira final. Realizamos toda a documentação necessária, análise de documentos, pagamento de tributos e acompanhamento junto à Receita Federal para garantir liberação rápida e sem complicações.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Documentação completa e revisada</li>
                    <li>Análise prévia de documentos</li>
                    <li>Pagamento de tributos e taxas</li>
                    <li>Acompanhamento até liberação final</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Despacho de Exportação
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Despacho aduaneiro de exportação com documentação completa e total conformidade regulatória. Preparamos toda a documentação necessária (NFe, DU-E, licenças, certificados), realizamos o registro no Siscomex e garantimos que sua mercadoria seja exportada dentro dos prazos estabelecidos.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Registro no Siscomex</li>
                    <li>Documentação completa (DU-E, NFe, etc.)</li>
                    <li>Licenças e certificados</li>
                    <li>Conformidade regulatória total</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Classificação Fiscal
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Classificação correta de mercadorias conforme NCM (Nomenclatura Comum do Mercosul) para otimização de impostos, taxas e benefícios fiscais. Nossa equipe especializada garante a classificação mais adequada, evitando retenções e maximizando oportunidades de redução tributária.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Classificação NCM precisa</li>
                    <li>Otimização de impostos e taxas</li>
                    <li>Análise de benefícios fiscais</li>
                    <li>Consultoria em classificação</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Consultoria Aduaneira
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Orientação especializada em legislação aduaneira, regulamentações internacionais e otimização de processos. Oferecemos consultoria estratégica para planejamento de importações/exportações, análise de viabilidade, estudos de viabilidade fiscal e suporte em auditorias aduaneiras.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Consultoria em legislação aduaneira</li>
                    <li>Planejamento de operações</li>
                    <li>Análise de viabilidade fiscal</li>
                    <li>Suporte em auditorias</li>
                  </ul>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>100%</div>
                  <div className="text-gray-700 font-semibold">Conformidade Legal</div>
                </div>
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>24h</div>
                  <div className="text-gray-700 font-semibold">Processamento Rápido</div>
                </div>
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>20+</div>
                  <div className="text-gray-700 font-semibold">Anos de Expertise</div>
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

