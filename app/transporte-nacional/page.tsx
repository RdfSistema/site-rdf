import Header from "@/components/header"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Location from "@/components/location"

export default function TransporteNacional() {
  return (
    <main className="bg-white">
      <Header />
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#223354] to-[#24345c] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Transporte Nacional
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Transporte rodoviário nacional com cobertura completa em todo o Brasil, ênfase no Sul e rastreamento em tempo real
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "#223354" }}>
                Transporte Rodoviário Nacional
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                A RDF oferece serviços completos de transporte rodoviário nacional com cobertura em todos os estados brasileiros, com especial ênfase na região Sul do país. Nossa frota moderna, rastreada e assegurada, aliada a uma equipe experiente, garante que suas mercadorias sejam transportadas com máxima segurança, agilidade e pontualidade. Trabalhamos com diferentes tipos de cargas, desde fracionadas até completas, sempre com rastreamento em tempo real e seguro de carga incluído.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Cargas Fracionadas
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Transporte de cargas fracionadas com consolidação inteligente para otimizar custos e maximizar a eficiência do transporte. Ideal para empresas que não precisam de um veículo completo, permitindo compartilhar o espaço e reduzir significativamente os custos logísticos.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Consolidação inteligente de cargas</li>
                    <li>Redução de custos logísticos</li>
                    <li>Rastreamento individualizado</li>
                    <li>Flexibilidade de volumes</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Cargas Completas (TL)
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Transporte de cargas completas (TL - Truck Load) com veículos adequados para diferentes tipos de mercadorias. Oferecemos uma ampla variedade de veículos, desde caminhões baú até carretas, garantindo que sua carga seja transportada no veículo mais adequado às suas necessidades.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Veículos adequados por tipo de carga</li>
                    <li>Frota moderna e rastreada</li>
                    <li>Maior segurança e controle</li>
                    <li>Ideal para grandes volumes</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Transporte Expresso
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Serviço expresso para entregas urgentes com prazo garantido e rastreamento em tempo real. Priorizamos sua carga e garantimos entrega rápida e segura, ideal para mercadorias com prazo crítico ou alto valor agregado.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Prazo garantido</li>
                    <li>Rastreamento em tempo real</li>
                    <li>Priorização de carga</li>
                    <li>Ideal para urgências</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Cargas Especiais
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Transporte de cargas especiais, volumosas, de grande porte ou que requerem cuidados especiais. Contamos com equipamentos adequados e equipe especializada para transportar máquinas, equipamentos industriais, estruturas metálicas e outros tipos de cargas que exigem tratamento diferenciado.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Equipamentos especializados</li>
                    <li>Equipe treinada</li>
                    <li>Planejamento detalhado</li>
                    <li>Máquinas e equipamentos industriais</li>
                  </ul>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>100%</div>
                  <div className="text-gray-700 font-semibold">Cobertura Nacional</div>
                </div>
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>24/7</div>
                  <div className="text-gray-700 font-semibold">Rastreamento e Suporte</div>
                </div>
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>100%</div>
                  <div className="text-gray-700 font-semibold">Cargas Seguradas</div>
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

