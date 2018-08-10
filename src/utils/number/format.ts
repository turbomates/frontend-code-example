export function format(
  numOrStr: number | string,
  decimalSize = 0,
  decPoint = '.',
  thousandsSep = ','
): string {
  if (numOrStr === 0 || numOrStr === '0') return '0'

  const num = typeof numOrStr === 'string' ? parseFloat(numOrStr) : numOrStr
  const negative = num < 0 ? '-' : ''
  const decimalPoint = decimalSize !== 0 ? decPoint : ''
  const absNum = Math.abs(num)
  const intNum = Math.floor(absNum)
  const decimal = (absNum - intNum).toFixed(decimalSize).slice(2)
  const formattedNum = intNum
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/...(?!$)/g, '$&' + thousandsSep.replace(/\$/g, '$$$$'))
    .split('')
    .reverse()
    .join('')

  return `${negative}${formattedNum}${decimalPoint}${decimal}`
}

export function formatMoney(money: Money, decimalSize = 0, decPoint = '.', thousandsSep = ' ') {
  return `${format(money.amount, decimalSize, decPoint, thousandsSep)} ${money.currency}`
}
