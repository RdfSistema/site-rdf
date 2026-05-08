export type OperationStatus = "parada" | "em_processo" | "finalizada"

/** Chave para tradução `clientArea.operationsPage.type_*` */
export type OperationKind =
  | "import_maritime"
  | "export_air"
  | "import_lcl"
  | "export_maritime"
  | "warehousing"

export type MockClientOperation = {
  id: string
  reference: string
  kind: OperationKind
  status: OperationStatus
  title: string
  description: string
  openedAt: string
  lastUpdate: string
}

export const MOCK_CLIENT_OPERATIONS: MockClientOperation[] = [
  {
    id: "op-1",
    reference: "RDF-OP-2025-0142",
    kind: "import_maritime",
    status: "em_processo",
    title: "Importação marítima — contêiner 40'",
    description:
      "Desembaraço em Paranaguá e transporte rodoviário até São José dos Pinhais. Aguardando liberação fiscal complementar.",
    openedAt: "12/03/2025",
    lastUpdate: "05/05/2026 — 11:20",
  },
  {
    id: "op-2",
    reference: "RDF-OP-2025-0098",
    kind: "import_lcl",
    status: "em_processo",
    title: "Importação LCL — consolidação Ásia",
    description:
      "Carga fracionada em consolidação. Coleta de documentos de embarque e emissão de LI em andamento.",
    openedAt: "28/02/2025",
    lastUpdate: "04/05/2026 — 09:05",
  },
  {
    id: "op-3",
    reference: "RDF-OP-2025-0033",
    kind: "export_air",
    status: "parada",
    title: "Exportação aérea — termolábeis",
    description:
      "Operação pausada por pendência de certificação sanitária do exportador. Retomada após envio do laudo.",
    openedAt: "15/01/2025",
    lastUpdate: "22/04/2026 — 16:40",
  },
  {
    id: "op-4",
    reference: "RDF-OP-2024-1201",
    kind: "warehousing",
    status: "parada",
    title: "Armazenagem geral — cross-docking",
    description:
      "Parada programada: aguardando janela de descarga acordada com o importador final.",
    openedAt: "02/11/2024",
    lastUpdate: "10/04/2026 — 08:00",
  },
  {
    id: "op-5",
    reference: "RDF-OP-2024-0888",
    kind: "export_maritime",
    status: "finalizada",
    title: "Exportação marítima — grãos",
    description:
      "Embarque concluído, BL e documentos de exportação arquivados. Encerramento operacional.",
    openedAt: "05/08/2024",
    lastUpdate: "18/12/2024 — 14:15",
  },
  {
    id: "op-6",
    reference: "RDF-OP-2024-0750",
    kind: "import_maritime",
    status: "finalizada",
    title: "Importação marítima — projeto completo",
    description:
      "Desembaraço, transporte e entrega finalizados. Nota de encerramento disponível na área de documentos.",
    openedAt: "20/06/2024",
    lastUpdate: "02/10/2024 — 17:30",
  },
]

export function groupOperationsByStatus(
  list: MockClientOperation[]
): Record<OperationStatus, MockClientOperation[]> {
  const empty: Record<OperationStatus, MockClientOperation[]> = {
    parada: [],
    em_processo: [],
    finalizada: [],
  }
  for (const op of list) {
    empty[op.status].push(op)
  }
  return empty
}

export function buildOperationReportContent(
  op: MockClientOperation,
  typeLabel: string,
  statusLabel: string
): string {
  return [
    "RDF — RELATÓRIO COMPLETO DA OPERAÇÃO (demonstração)",
    "=====================================================",
    "",
    `Referência: ${op.reference}`,
    `Tipo de operação: ${typeLabel}`,
    `Situação atual: ${statusLabel}`,
    "",
    `Título: ${op.title}`,
    "",
    "Descrição resumida:",
    op.description,
    "",
    `Abertura: ${op.openedAt}`,
    `Última atualização: ${op.lastUpdate}`,
    "",
    "---",
    "Seções que um relatório real poderia incluir:",
    "- Linha do tempo de eventos",
    "- Documentos vinculados",
    "- Custos e faturamento",
    "- Contatos e responsáveis",
    "",
    "Este arquivo é apenas ilustrativo. Em produção, gere PDF a partir do seu ERP ou API.",
  ].join("\n")
}
