"use client"

import { FileDown, FileText } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  MOCK_CLIENT_DOCUMENTS,
  buildDemoFileContent,
  type ClientDocumentMock,
} from "@/lib/mock-client-documents"

function downloadDemoFile(doc: ClientDocumentMock) {
  const body = buildDemoFileContent(doc)
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = doc.fileName
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

export default function ClientAreaDocuments() {
  const { t } = useLanguage()

  return (
    <section className="overflow-hidden rounded-2xl border border-[#dce3ef] bg-white shadow-lg">
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-6"
        style={{ background: "linear-gradient(90deg, #223354 0%, #2d4a7c 50%, #34d1b4 100%)" }}
      >
        <div className="flex items-center gap-2 text-white">
          <FileText className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
          <h2 className="text-base font-bold tracking-tight sm:text-lg">
            {t("clientArea.documentsPage.title")}
          </h2>
        </div>
        <span className="rounded bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 sm:text-xs">
          {t("clientArea.documentsPage.demoBadge")}
        </span>
      </div>

      <div className="p-5 sm:p-6 lg:p-8">
        <p className="mb-6 text-sm leading-relaxed text-gray-600">
          {t("clientArea.documentsPage.subtitle")}
        </p>

        <ul className="space-y-4">
          {MOCK_CLIENT_DOCUMENTS.map((doc) => (
            <li
              key={doc.id}
              className="rounded-xl border border-gray-100 bg-[#fafbfc] p-4 shadow-sm transition hover:border-[#34d1b4]/40 hover:bg-white sm:p-5"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#34d1b4]/15 px-2.5 py-0.5 text-xs font-semibold text-[#0d6b5c]">
                      {doc.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {t("clientArea.documentsPage.availableLabel")}: {doc.availableDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#223354]">{doc.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    {doc.description}
                  </p>
                </div>
                <div className="flex shrink-0 lg:pt-1">
                  <button
                    type="button"
                    onClick={() => downloadDemoFile(doc)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34d1b4] focus-visible:ring-offset-2 lg:w-auto"
                    style={{ backgroundColor: "#34d1b4" }}
                  >
                    <FileDown className="h-4 w-4" aria-hidden />
                    {t("clientArea.documentsPage.download")}
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <p className="mt-6 rounded-lg bg-gray-50 px-4 py-3 text-center text-xs text-gray-500">
          {t("clientArea.documentsPage.footerNote")}
        </p>
      </div>
    </section>
  )
}
