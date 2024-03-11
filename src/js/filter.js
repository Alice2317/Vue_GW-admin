export function currency (num) {
  const n = parseInt(num, 10)
  return `${n
    .toFixed(0)
    .replace(/./g, (c, i, a) =>
      i && c !== '.' && (a.length - i) % 3 === 0
        ? `, ${c}`.replace(/\s/g, '')
        : c
    )}`
}

// 從Unix Timestamp轉回YY-MM-DD
export function date (time) {
  const day = new Date(time * 1000).toLocaleDateString(
    'en-US',
    { day: '2-digit' }
  )
  const month = new Date(time * 1000).toLocaleDateString(
    'en-US',
    { month: '2-digit' }
  )
  const year = new Date(time * 1000).getFullYear()
  return `${year}-${month}-${day}`
}

// 從YY-MM-DD轉回Unix Timestamp
export function dateUnix (time) {
  const date = new Date(time)
  return Math.floor(date.getTime() / 1000)
}
