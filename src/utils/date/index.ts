import * as fecha from 'fecha'

export const FORMAT = {
  UTC: 'YYYY-MM-DDTHH:mm:ss.ZZ',
  DATESECONDS: 'YYYY-MM-DD HH:mm:ss',
  FULL: 'DD.MM.YYYY HH:mm A',
  DATETIME: 'DD.MM.YYYY HH:mm',
  DATE: 'DD.MM.YYYY',
  TIME: 'HH:mm',
  WEEKDAY: 'dddd',
}

export function parse(date: string, format = FORMAT.UTC): Date {
  if (!date) return new Date()
  const normalizedDate = date.replace(/000(Z|0)/, '-0000')
  return fecha.parse(normalizedDate, format) as Date
}

export function format(date: Date, format: string): string {
  return date ? fecha.format(date, format) : ''
}

export function parseAndFormat(date: string, formatFrom: string, formatTo: string) {
  const parsedDate = parse(date, formatFrom)
  return parsedDate === null ? '' : format(parsedDate, formatTo)
}

export function getTimezone(): string {
  const MINUTES_PER_HOUR = 60

  const offset = new Date().getTimezoneOffset()
  const offsetAbs = Math.abs(offset)
  const isPositive = offset < 0

  const hours = Math.floor(offsetAbs / MINUTES_PER_HOUR)
  const h1 = Math.floor(hours / 10)
  const h2 = Math.floor(hours % 10)
  const minutes = offsetAbs - hours * MINUTES_PER_HOUR
  const m1 = Math.floor(minutes / 10)
  const m2 = Math.floor(minutes % 10)

  return `${isPositive ? '+' : '-'}${h1}${h2}${m1}${m2}`
}

export function endOfToday() {
  return endOfDayFromNow(1)
}

export function endOfTomorrow() {
  return endOfDayFromNow(2)
}

function endOfDayFromNow(days: number) {
  let date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(0, 0, 0, 0)
  return date
}
