"use client"

import { ClipboardList, FileBarChart } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  MOCK_CLIENT_OPERATIONS,
  groupOperationsByStatus,
  buildOperationReportContent,
  type MockClientOperation,
  type OperationStatus,
} from "@/lib/mock-client-operations"

function downloadReport(
  op: MockClientOperation,
  typeLabel: string,
  statusLabel: string
) {
  const body = buildOperationReportContent(op, typeLabel, statusLabel)
  const safeRef = op.reference.replace(/[^\w-]+/g, "_")
  const blob = new Blob([body], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = `relatorio-operacao-${safeRef}.txt`
  a.rel = "noopener"
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

function statusSectionClass(status: OperationStatus): string {
  if (status === "parada") {
    return "border-amber-200 bg-amber-50/60"
  }
  if (status === "em_processo") {
    return "border-sky-200 bg-sky-50/50"
  }
  return "border-emerald-200 bg-emerald-50/50"
}

function statusBadgeClass(status: OperationStatus): string {
  if (status === "parada") {
    return "bg-amber-100 text-amber-900 ring-amber-200/60"
  }
  if (status === "em_processo") {
    return "bg-sky-100 text-sky-900 ring-sky-200/60"
  }
  return "bg-emerald-100 text-emerald-900 ring-emerald-200/60"
}

export default function ClientAreaOperations() {
  const { t } = useLanguage()
  const grouped = groupOperationsByStatus(MOCK_CLIENT_OPERATIONS)
  const counts = {
    parada: grouped.parada.length,
    em_processo: grouped.em_processo.length,
    finalizada: grouped.finalizada.length,
  }

  const typeLabel = (kind: MockClientOperation["kind"]) =>
    t(`clientArea.operationsPage.type_${kind}`)

  const statusLabel = (status: OperationStatus) =>
    t(`clientArea.operationsPage.status_${status}`)

  const sections: { status: OperationStatus; items: MockClientOperation[] }[] = [
    { status: "em_processo", items: grouped.em_processo },
    { status: "parada", items: grouped.parada },
    { status: "finalizada", items: grouped.finalizada },
  ]

  return (
    <section className="overflow-hidden rounded-2xl border border-[#dce3ef] bg-white shadow-lg">
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-6"
        style={{ background: "linear-gradient(90deg, #223354 0%, #2d4a7c 40%, #34d1b4 100%)" }}
      >
        <div className="flex items-center gap-2 text-white">
          <ClipboardList className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
          <h2 className="text-base font-bold tracking-tight sm:text-lg">
            {t("clientArea.operationsPage.title")}
          </h2>
        </div>
        <span className="rounded bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 sm:text-xs">
          {t("clientArea.operationsPage.demoBadge")}
        </span>
      </div>

      <div className="p-5 sm:p-6 lg:p-8">
        <p className="mb-6 text-sm leading-relaxed text-gray-600">
          {t("clientArea.operationsPage.subtitle")}
        </p>

        {/* Resumo por situação */}
        <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-3 text-center sm:text-left">
            <p className="text-2xl font-bold text-sky-800">{counts.em_processo}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
              {t("clientArea.operationsPage.status_em_processo")}
            </p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-center sm:text-left">
            <p className="text-2xl font-bold text-amber-800">{counts.parada}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-800">
              {t("clientArea.operationsPage.status_parada")}
            </p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3 text-center sm:text-left">
            <p className="text-2xl font-bold text-emerald-800">{counts.finalizada}</p>
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
              {t("clientArea.operationsPage.status_finalizada")}
            </p>
          </div>
        </div>

        <p className="mb-4 text-xs font-bold uppercase tracking-wide text-gray-500">
          {t("clientArea.operationsPage.sectionsIntro")}
        </p>

        <div className="space-y-10">
          {sections.map(({ status, items }) => (
            <div key={status}>
              <h3
                className={`mb-3 inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-bold ring-1 ${statusBadgeClass(status)}`}
              >
                {statusLabel(status)}
                <span className="ml-2 font-normal opacity-80">({items.length})</span>
              </h3>
              {items.length === 0 ? (
                <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-500">
                  {t("clientArea.operationsPage.emptySection")}
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((op) => (
                    <li
                      key={op.id}
                      className={`rounded-xl border p-4 shadow-sm sm:p-5 ${statusSectionClass(status)}`}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-bold text-[#223354] ring-1 ring-gray-200">
                              {typeLabel(op.kind)}
                            </span>
                            <span className="font-mono text-xs font-semibold text-gray-600">
                              {t("clientArea.operationsPage.refLabel")}: {op.reference}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-[#223354] sm:text-lg">
                            {op.title}
                          </h4>
                          <p className="mt-2 text-sm leading-relaxed text-gray-700">
                            {op.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
                            <span>
                              <span className="font-semibold text-gray-500">
                                {t("clientArea.operationsPage.openedAt")}:
                              </span>{" "}
                              {op.openedAt}
                            </span>
                            <span>
                              <span className="font-semibold text-gray-500">
                                {t("clientArea.operationsPage.lastUpdate")}:
                              </span>{" "}
                              {op.lastUpdate}
                            </span>
                          </div>
                        </div>
                        <div className="shrink-0 lg:pt-1">
                          <button
                            type="button"
                            onClick={() =>
                              downloadReport(
                                op,
                                typeLabel(op.kind),
                                statusLabel(op.status)
                              )
                            }
                            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#223354]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#223354] shadow-sm transition hover:bg-[#223354] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34d1b4] focus-visible:ring-offset-2 lg:w-auto"
                          >
                            <FileBarChart className="h-4 w-4" aria-hidden />
                            {t("clientArea.operationsPage.reportFull")}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 rounded-lg bg-gray-50 px-4 py-3 text-center text-xs text-gray-500">
          {t("clientArea.operationsPage.footerNote")}
        </p>
      </div>
    </section>
  )
}
