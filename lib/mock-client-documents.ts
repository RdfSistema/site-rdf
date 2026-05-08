export type ClientDocumentMock = {
  id: string
  title: string
  description: string
  category: string
  availableDate: string
  /** Nome sugerido ao baixar o arquivo de demonstração */
  fileName: string
}

/** Lista mock — substitua por API + URLs reais de armazenamento. */
export const MOCK_CLIENT_DOCUMENTS: ClientDocumentMock[] = [
  {
    id: "doc-1",
    title: "Certificado de origem",
    description:
      "Certificado de origem da mercadoria emitido pela câmara de comércio do país exportador. Necessário para benefícios tarifários e comprovação no despacho.",
    category: "Aduaneiro",
    availableDate: "02/05/2026",
    fileName: "certificado-origem-exemplo.txt",
  },
  {
    id: "doc-2",
    title: "Conhecimento de embarque (BL)",
    description:
      "Cópia do Bill of Lading assinado pelo armador. Comprova o contrato de transporte marítimo e a posse da carga em trânsito internacional.",
    category: "Transporte",
    availableDate: "28/04/2026",
    fileName: "BL-exemplo.txt",
  },
  {
    id: "doc-3",
    title: "Nota fiscal de exportação",
    description:
      "NF-e de venda ao exterior referente ao lote embarcado. Utilize para contabilidade e conferência fiscal.",
    category: "Fiscal",
    availableDate: "25/04/2026",
    fileName: "NF-exportacao-exemplo.txt",
  },
  {
    id: "doc-4",
    title: "LI — Licença de importação",
    description:
      "Registro de LI deferida na Siscomex para produtos sujeitos a controle administrativo. Documento para acompanhamento do desembaraço.",
    category: "Aduaneiro",
    availableDate: "18/04/2026",
    fileName: "LI-importacao-exemplo.txt",
  },
]

export function buildDemoFileContent(doc: ClientDocumentMock): string {
  return [
    "RDF — Documento de demonstração",
    "================================",
    "",
    `Título: ${doc.title}`,
    `Categoria: ${doc.category}`,
    `Disponível em: ${doc.availableDate}`,
    "",
    "Descrição:",
    doc.description,
    "",
    "---",
    "Em produção, este download seria o arquivo real (PDF, XML, etc.)",
    "fornecido pela equipe RDF ou gerado pelo seu sistema.",
  ].join("\n")
}
