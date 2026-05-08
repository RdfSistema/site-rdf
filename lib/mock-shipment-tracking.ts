/**
 * Rastreio mock (demonstração). Substitua por resposta de API quando existir backend.
 * Ordem: do mais recente ao mais antigo (padrão comum em rastreio).
 */
export type MockShipmentEvent = {
  date: string
  time: string
  location: string
  unitName: string
  status: string
  detail?: string
}

export function getMockShipmentTrace(_reference: string): MockShipmentEvent[] {
  void _reference
  return [
    {
      date: "06/05/2026",
      time: "09:41",
      location: "SÃO JOSÉ DOS PINHAIS / PR",
      unitName: "Centro de Distribuição RDF — Terminal",
      status: "Carga encaminhada para transportadora parceira",
      detail: "Documentação de transporte emitida. Previsão de coleta: D+1 útil.",
    },
    {
      date: "05/05/2026",
      time: "16:22",
      location: "PARANAGUÁ / PR",
      unitName: "Pátio Portuário — Desconsolidação",
      status: "Carga desembaraçada e liberada para retirada",
      detail: "Processo aduaneiro concluído sem pendências.",
    },
    {
      date: "04/05/2026",
      time: "11:05",
      location: "PARANAGUÁ / PR",
      unitName: "Unidade de Desembaraço Aduaneiro",
      status: "Mercadoria em análise documental",
    },
    {
      date: "02/05/2026",
      time: "08:17",
      location: "PARANAGUÁ / PR",
      unitName: "Armazém Alfandegado",
      status: "Carga posicionada para desova e conferência física",
    },
    {
      date: "28/04/2026",
      time: "19:53",
      location: "ALTO MAR",
      unitName: "Navio — em trânsito internacional",
      status: "Em trânsito internacional para o Brasil",
    },
    {
      date: "18/04/2026",
      time: "14:30",
      location: "SHANGHAI / CN",
      unitName: "Terminal de exportação",
      status: "Embarque confirmado — saída do porto de origem",
      detail: "Conhecimento de embarque (BL) registrado no sistema.",
    },
  ]
}
