import { onlyDigits } from '@/lib/cnpj'

/** Celular fixo ou móvel BR: até 11 dígitos (DDD + número). */
export const BRAZIL_PHONE_MAX_DIGITS = 11

/**
 * Máscara progressiva: `(00) 0000-0000` (10 dígitos) ou `(00) 00000-0000` (11 dígitos).
 * Aceita apenas dígitos na entrada; descarta o restante e limita o tamanho.
 */
export function formatBrazilPhoneInput(raw: string): string {
  const d = onlyDigits(raw).slice(0, BRAZIL_PHONE_MAX_DIGITS)
  if (d.length === 0) return ''
  if (d.length <= 2) return `(${d}`
  const dd = d.slice(0, 2)
  const rest = d.slice(2)
  if (d.length <= 6) return `(${dd}) ${rest}`
  if (d.length <= 10) {
    return `(${dd}) ${rest.slice(0, 4)}-${rest.slice(4)}`
  }
  return `(${dd}) ${rest.slice(0, 5)}-${rest.slice(5)}`
}
