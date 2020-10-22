function parseNumber (num) {
  return num < 10 ? '0' + num : num
}
export function formatFullDate (time) {
  if (!time) {
    return ''
  } else {
    const date = new Date(time)

    const Y = date.getFullYear()
    const M = parseNumber(date.getMonth() + 1)
    const D = parseNumber(date.getDate())
    const h = parseNumber(date.getHours())
    const m = parseNumber(date.getMinutes())
    const s = parseNumber(date.getSeconds())
    return `${Y}-${M}-${D} ${h}:${m}:${s}`
  }
}

export function formatDate (time) {
  if (!time) {
    return ''
  } else {
    const date = new Date(time)
    const Y = date.getFullYear()
    const M = parseNumber(date.getMonth() + 1)
    const D = parseNumber(date.getDate())
    return `${Y}-${M}-${D}`
  }
}

export function formatYearAndMonth (time) {
  if (!time) {
    return ''
  } else {
    const date = new Date(time)
    const Y = date.getFullYear()
    const M = parseNumber(date.getMonth() + 1)
    return `${Y}.${M}`
  }
}

export function formatDay (time) {
  if (!time) {
    return ''
  } else {
    const date = new Date(time)
    const D = parseNumber(date.getDate())
    return D
  }
}
