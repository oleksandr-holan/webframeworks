export function isValidDate(date: string): boolean {
  return !isNaN(Date.parse(date))
}

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export function isValidPhone(phone: string): boolean {
  const regex = /^\+?[\d\s-]{10,}$/
  return regex.test(phone)
}

export function isDateInPast(date: string): boolean {
  const inputDate = new Date(date)
  const currentDate = new Date()
  return inputDate <= currentDate
}

export function isNotEmpty(s: string): boolean {
  return s.trim() !== ''
}
