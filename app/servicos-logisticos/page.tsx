import Header from "@/components/header"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import Location from "@/components/location"

export default function ServicosLogisticos() {
  return (
    <main className="bg-white">
      <Header />
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#223354] to-[#24345c] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Serviços Logísticos
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Projetos logísticos personalizados e soluções integradas para otimizar toda sua cadeia de suprimentos
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold mb-6" style={{ color: "#223354" }}>
                Soluções Logísticas Completas
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                A RDF oferece uma gama completa de serviços logísticos integrados para atender todas as necessidades da sua empresa. Desenvolvemos projetos logísticos exclusivos e personalizados, desde armazenagem até distribuição final, garantindo eficiência operacional, segurança e redução de custos em toda a sua cadeia de suprimentos. Nossa abordagem consultiva permite entender profundamente suas necessidades e criar soluções que se adaptam perfeitamente ao seu negócio.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Armazenagem
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Armazéns modernos, seguros e climatizados com controle de estoque completo, operações de picking e packing profissional. Nossos centros de distribuição são equipados com tecnologia de ponta para garantir rastreabilidade total e eficiência operacional.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Armazéns modernos e climatizados</li>
                    <li>Controle de estoque em tempo real</li>
                    <li>Picking e packing profissional</li>
                    <li>Segurança e rastreabilidade</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Distribuição
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Serviços de distribuição com roteirização otimizada, entregas programadas e gestão completa da última milha. Utilizamos tecnologia avançada para otimizar rotas, reduzir custos e garantir entregas pontuais em qualquer região do país.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Roteirização otimizada</li>
                    <li>Entregas programadas</li>
                    <li>Gestão da última milha</li>
                    <li>Redução de custos operacionais</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Gestão de Estoque
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Controle completo de estoque com sistemas informatizados, relatórios em tempo real e indicadores de performance (KPIs). Oferecemos visibilidade total do seu estoque, permitindo tomadas de decisão mais assertivas e redução de custos de capital de giro.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Sistemas informatizados</li>
                    <li>Relatórios e KPIs em tempo real</li>
                    <li>Visibilidade total do estoque</li>
                    <li>Otimização de capital de giro</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Cross-Docking
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Operações de cross-docking para reduzir tempo de armazenagem e custos operacionais. Recebemos suas mercadorias e as redirecionamos imediatamente para o destino final, eliminando a necessidade de armazenamento intermediário e acelerando o ciclo de distribuição.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Redução de tempo de armazenagem</li>
                    <li>Redução de custos operacionais</li>
                    <li>Aceleração do ciclo de distribuição</li>
                    <li>Eliminação de estoque intermediário</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Fulfillment
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Serviço completo de fulfillment incluindo recebimento, armazenagem, embalagem personalizada, etiquetagem, expedição e gestão de pedidos. Ideal para e-commerce e empresas que buscam terceirizar completamente o processo de atendimento de pedidos.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Embalagem personalizada</li>
                    <li>Etiquetagem e expedição</li>
                    <li>Gestão completa de pedidos</li>
                    <li>Ideal para e-commerce</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold mb-4" style={{ color: "#34d1b4" }}>
                    Logística Reversa
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Gestão completa de logística reversa para devoluções, trocas, recalls e descarte de mercadorias. Oferecemos processos estruturados para recebimento, inspeção, reembalagem e redirecionamento de produtos, garantindo eficiência e redução de perdas.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                    <li>Gestão de devoluções e trocas</li>
                    <li>Processos de recall</li>
                    <li>Inspeção e reembalagem</li>
                    <li>Redução de perdas</li>
                  </ul>
                </div>
              </div>

              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>20%</div>
                  <div className="text-gray-700 font-semibold">Redução de Custos</div>
                </div>
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>100%</div>
                  <div className="text-gray-700 font-semibold">Projetos Personalizados</div>
                </div>
                <div className="text-center p-6 rounded-lg border-2" style={{ borderColor: "#34d1b4" }}>
                  <div className="text-4xl font-bold mb-2" style={{ color: "#34d1b4" }}>24/7</div>
                  <div className="text-gray-700 font-semibold">Monitoramento e Suporte</div>
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

