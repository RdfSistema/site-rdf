export function onlyDigits(input: string): string {
  return input.replace(/\D/g, '')
}

/** 14 dígitos, sem formatação */
export function normalizeCnpj(input: string): string {
  return onlyDigits(input).slice(0, 14)
}

/** Máscara visual: `00.000.000/0000-00` (no máximo 14 dígitos). */
export function formatCnpjInput(raw: string): string {
  const d = onlyDigits(raw).slice(0, 14)
  if (d.length <= 2) return d
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`
  if (d.length <= 12) {
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`
  }
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`
}

/** Valida dígitos verificadores do CNPJ (apenas formato numérico). */
export function isValidCnpj(raw: string): boolean {
  const cnpj = normalizeCnpj(raw)
  if (cnpj.length !== 14) return false
  if (/^(\d)\1{13}$/.test(cnpj)) return false

  let length = cnpj.length - 2
  let numbers = cnpj.substring(0, length)
  const digits = cnpj.substring(length)
  let sum = 0
  let pos = length - 7

  for (let i = length; i >= 1; i--) {
    sum += Number(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  if (result !== Number(digits.charAt(0))) return false

  length += 1
  numbers = cnpj.substring(0, length)
  sum = 0
  pos = length - 7
  for (let i = length; i >= 1; i--) {
    sum += Number(numbers.charAt(length - i)) * pos--
    if (pos < 2) pos = 9
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11)
  return result === Number(digits.charAt(1))
}
