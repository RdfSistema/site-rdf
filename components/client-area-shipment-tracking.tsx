"use client"

import { useState } from "react"
import { PackageSearch, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { getMockShipmentTrace } from "@/lib/mock-shipment-tracking"

export default function ClientAreaShipmentTracking() {
  const { t } = useLanguage()
  const [reference, setReference] = useState("")
  const [queryRef, setQueryRef] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const r = reference.trim()
    if (r.length < 4) {
      setError(t("clientArea.shipmentTracking.shortRef"))
      setQueryRef("")
      return
    }
    setError("")
    setQueryRef(r.toUpperCase())
  }

  const events = queryRef ? getMockShipmentTrace(queryRef) : null

  return (
    <section className="overflow-hidden rounded-2xl border border-[#dce3ef] bg-white shadow-lg">
      <div
        className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 sm:px-6"
        style={{ background: "linear-gradient(90deg, #0c4a6e 0%, #135b9e 45%, #223354 100%)" }}
      >
        <div className="flex items-center gap-2 text-white">
          <PackageSearch className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
          <h2 className="text-base font-bold tracking-tight sm:text-lg">
            {t("clientArea.shipmentTracking.title")}
          </h2>
        </div>
        <span className="rounded bg-white/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90 sm:text-xs">
          {t("clientArea.shipmentTracking.demoBadge")}
        </span>
      </div>

      <div className="p-5 sm:p-6 lg:p-8">
        <p className="mb-5 text-sm leading-relaxed text-gray-600">
          {t("clientArea.shipmentTracking.subtitle")}
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="min-w-0 flex-1">
            <label
              htmlFor="shipment-ref"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500"
            >
              {t("clientArea.shipmentTracking.referenceLabel")}
            </label>
            <input
              id="shipment-ref"
              type="text"
              value={reference}
              onChange={(e) => {
                setReference(e.target.value)
                setError("")
              }}
              placeholder={t("clientArea.shipmentTracking.placeholder")}
              className="w-full rounded-lg border border-gray-300 bg-[#f8fafc] px-4 py-3 text-sm text-gray-900 shadow-inner outline-none transition focus:border-[#135b9e] focus:ring-2 focus:ring-[#135b9e]/25"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#135b9e] focus-visible:ring-offset-2 sm:py-3"
            style={{ backgroundColor: "#135b9e" }}
          >
            {t("clientArea.shipmentTracking.search")}
          </button>
        </form>

        {error && (
          <p className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-900">
            {error}
          </p>
        )}

        {!queryRef && !error && (
          <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-6 text-center text-sm text-gray-500">
            {t("clientArea.shipmentTracking.emptyHint")}
          </p>
        )}

        {events && queryRef && (
          <div className="border-t border-gray-100 pt-6">
            <div className="mb-6 rounded-xl border border-gray-200 bg-[#f0f6fc] px-4 py-3 sm:px-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#135b9e]">
                {t("clientArea.shipmentTracking.summaryLabel")}
              </p>
              <p className="mt-1 font-mono text-lg font-bold text-[#223354]">
                {t("clientArea.shipmentTracking.summaryPrefix")}{" "}
                <span className="text-[#0c4a6e]">{queryRef}</span>
              </p>
              <p className="mt-2 text-sm text-gray-700">
                {t("clientArea.shipmentTracking.serviceLine")}
              </p>
            </div>

            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
              {t("clientArea.shipmentTracking.timelineTitle")}
            </h3>

            <ol className="relative space-y-0">
              {events.map((ev, index) => {
                const isLast = index === events.length - 1
                const isFirst = index === 0
                return (
                  <li key={`${ev.date}-${ev.time}-${index}`} className="relative flex gap-3 sm:gap-4">
                    <div className="flex w-9 shrink-0 flex-col items-center self-stretch sm:w-10">
                      <div
                        className={`z-[1] mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-white shadow sm:h-4 sm:w-4 ${
                          isFirst
                            ? "bg-[#135b9e] ring-2 ring-[#135b9e]/30"
                            : "bg-gray-300 ring-1 ring-gray-200"
                        }`}
                        aria-hidden
                      />
                      {!isLast && (
                        <div
                          className="mt-1 w-0.5 flex-1 bg-gradient-to-b from-[#94a3b8] to-[#cbd5e1]"
                          aria-hidden
                        />
                      )}
                    </div>

                    <div className={`min-w-0 flex-1 ${isLast ? "pb-0" : "pb-8"}`}>
                      <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-5 sm:py-4">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#135b9e] sm:text-xs">
                          {ev.date} &nbsp;|&nbsp; {ev.time}
                        </p>
                        <p className="mt-2 text-sm font-bold leading-snug text-[#223354] sm:text-base">
                          {ev.status}
                        </p>
                        <div className="mt-2 flex flex-wrap items-start gap-1.5 text-sm text-gray-600">
                          <MapPin
                            className="mt-0.5 h-4 w-4 shrink-0 text-gray-400"
                            aria-hidden
                          />
                          <span>
                            <span className="font-medium text-gray-800">
                              {ev.location}
                            </span>
                            <span className="mx-1.5 text-gray-300">·</span>
                            <span className="text-gray-600">{ev.unitName}</span>
                          </span>
                        </div>
                        {ev.detail && (
                          <p className="mt-2 border-t border-gray-100 pt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                            {ev.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>

            <p className="mt-6 rounded-lg bg-gray-50 px-4 py-3 text-center text-xs text-gray-500">
              {t("clientArea.shipmentTracking.footerNote")}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
