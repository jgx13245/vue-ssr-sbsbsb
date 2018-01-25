export function host (url) {
  const host = url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  const parts = host.split('.').slice(-3)
  if (parts[0] === 'www') parts.shift()
  return parts.join('.')
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}
import qr from 'qr.js'

/**
 * 批量注册 ElementUI 组件
 * @param components
 * @returns {{}}
 */
export const mapElementUI = components => {
  const result = {}
  components.forEach(component => {
    result[component.name] = component
  })
  return result
}

/**
 * 生成唯一标识符
 * @returns {string}
 */
export const guid = () => {
  let guid = ''
  for (let i = 1; i <= 32; i++) {
    let n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) guid += '-'
  }
  return guid
}

/**
 * 生成二维码
 * @param text
 * @returns {*}
 */
export const createQrcode = text => {
  const qrcode = qr(text)
  const cells = qrcode.modules
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const border = 10
  canvas.width = 200
  canvas.height = 200

  context.fillStyle = '#fff'
  context.fillRect(0, 0, canvas.width, canvas.height)

  const tileW = (canvas.width - border * 2) / cells.length
  const tileH = (canvas.height - border * 2) / cells.length

  for (let r = 0; r < cells.length; ++r) {
    const row = cells[r]
    for (let c = 0; c < row.length; ++c) {
      context.fillStyle = row[c] ? '#000' : '#fff'
      const w = (Math.ceil((c + 1) * tileW) - Math.floor(c * tileW))
      const h = (Math.ceil((r + 1) * tileH) - Math.floor(r * tileH))
      context.fillRect(Math.round(c * tileW) + border, Math.round(r * tileH) + border, w, h)
    }
  }
  return canvas
}
/*
 * 小数转换为百分数  number当前值  digits保留几位小数
 */
export const percentageFormat = (number, digits) => {
  let result
  if (digits === null || digits === undefined) {
    digits = 2
  }
  digits = parseInt(digits)
  if (number === null || number === '' || isNaN(number)) {
    result = '-'
  } else {
    result = Math.round(number * Math.pow(10, digits) * 100) / Math.pow(10, digits) + '%'
  }

  return result
}

/**
 * base64转换二进制
 * @param data
 * @returns {Blob}
 */
export const base64ToBlob = data => {
  const binary = window.atob(data.replace(/^.*?,/, ''))
  const type = /:(image\/\w+);/.exec(data)[1] || 'image/png'
  const array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new window.Uint8Array(array)], {
    type
  })
}
