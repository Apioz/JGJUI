/**
 * Export SVG icons and generate tab bar PNGs for WeChat mini-program.
 * Run: node scripts/generate-icons.js
 */
const fs = require('fs')
const path = require('path')

const root = path.join(__dirname, '..')
const svgDir = path.join(root, 'assets/icons/svg')
const pngDir = path.join(root, 'assets/icons')

// Load icon definitions from prototype/js/icons.js
const iconsJs = fs.readFileSync(path.join(root, 'prototype/js/icons.js'), 'utf8')
const svgMatch = iconsJs.match(/const SVG = \{([\s\S]*?)\n  \}/)
if (!svgMatch) throw new Error('Could not parse SVG definitions')

const SVG = {}
const entryRe = /(\w+|'[\w-]+'):\s*`([\s\S]*?)`/g
let m
while ((m = entryRe.exec(svgMatch[1])) !== null) {
  const key = m[1].replace(/'/g, '')
  SVG[key] = m[2].trim()
}

fs.mkdirSync(svgDir, { recursive: true })
fs.mkdirSync(pngDir, { recursive: true })

Object.entries(SVG).forEach(([name, svg]) => {
  const colorMap = {
    repair: '#4A90E2', maintain: '#52C41A', inspect: '#FDD835', myorder: '#7E57C2',
    location: '#4A90E2', notify: '#333333', workorder: '#4A90E2', message: '#13C2C2',
    space: '#4A90E2', equipment: '#52C41A', water: '#13C2C2', electric: '#FA8C16',
    smartcard: '#4A90E2', 'canteen-ops': '#FA8C16', 'canteen-supervision': '#52C41A',
    building: '#4A90E2', user: '#666666', contacts: '#666666', edit: '#666666', lock: '#666666',
    search: '#999999', inventory: '#4A90E2', transfer: '#4A90E2', device: '#4A90E2',
    'tab-home': '#999999', 'tab-collab': '#999999', 'tab-data': '#999999', 'tab-mine': '#999999'
  }
  const colored = svg.replace(/CURRENT_COLOR/g, colorMap[name] || '#666666')
  const full = colored.startsWith('<svg') ? colored : `<svg>${colored}</svg>`
  fs.writeFileSync(path.join(svgDir, `${name}.svg`), full)
})

// Minimal PNG writer for 81x81 tab icons (RGBA)
function createPng(width, height, draw) {
  const pixels = Buffer.alloc(width * height * 4, 0)
  draw(pixels, width, height)

  const raw = []
  for (let y = 0; y < height; y++) {
    raw.push(0)
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      raw.push(pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3])
    }
  }
  const rawBuf = Buffer.from(raw)
  const zlib = require('zlib')
  const compressed = zlib.deflateSync(rawBuf, { level: 9 })

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8; ihdr[9] = 6; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0

  function chunk(type, data) {
    const len = Buffer.alloc(4); len.writeUInt32BE(data.length)
    const t = Buffer.from(type)
    const crc = Buffer.alloc(4)
    const crcVal = require('zlib').crc32 ? require('zlib').crc32(Buffer.concat([t, data])) : crc32(Buffer.concat([t, data]))
    crc.writeUInt32BE(crcVal >>> 0)
    return Buffer.concat([len, t, data, crc])
  }

  function crc32(buf) {
    let c = 0xffffffff
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i]
      for (let j = 0; j < 8; j++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1))
    }
    return (c ^ 0xffffffff) >>> 0
  }

  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ])
}

function hexToRgb(hex) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function setPx(pixels, w, x, y, r, g, b, a = 255) {
  if (x < 0 || y < 0 || x >= w) return
  const i = (y * w + x) * 4
  if (i < 0 || i >= pixels.length) return
  if (a === 255) {
    pixels[i] = r; pixels[i + 1] = g; pixels[i + 2] = b; pixels[i + 3] = 255
  } else {
    const alpha = a / 255
    pixels[i] = Math.round(r * alpha + pixels[i] * (1 - alpha))
    pixels[i + 1] = Math.round(g * alpha + pixels[i + 1] * (1 - alpha))
    pixels[i + 2] = Math.round(b * alpha + pixels[i + 2] * (1 - alpha))
    pixels[i + 3] = Math.max(pixels[i + 3], a)
  }
}

function fillRect(pixels, w, h, x0, y0, x1, y1, rgb) {
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) setPx(pixels, w, x, y, ...rgb)
}

function fillCircle(pixels, w, cx, cy, r, rgb) {
  for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
    if (x * x + y * y <= r * r) setPx(pixels, w, cx + x, cy + y, ...rgb)
  }
}

function drawTabIcon(type, color) {
  const S = 81
  const [r, g, b] = hexToRgb(color)
  return createPng(S, S, (px, w, h) => {
    const cx = 40, cy = 40
    if (type === 'home') {
      fillRect(px, w, h, 18, 38, 63, 68, [r, g, b])
      for (let y = 18; y <= 38; y++) {
        const half = Math.floor((y - 18) * 0.55)
        fillRect(px, w, h, cx - half, y, cx + half + 1, y + 1, [r, g, b])
      }
      fillRect(px, w, h, 32, 48, 49, 68, [255, 255, 255])
    } else if (type === 'collab') {
      fillCircle(px, w, 28, 30, 10, [r, g, b])
      fillCircle(px, w, 52, 32, 8, [r, g, b])
      for (let y = 48; y <= 68; y++) {
        const t = (y - 48) / 20
        fillRect(px, w, h, 14, y, 42 - Math.floor(t * 4), y + 1, [r, g, b])
        fillRect(px, w, h, 44, y, 68 - Math.floor(t * 2), y + 1, [r, g, b])
      }
    } else if (type === 'data') {
      const boxes = [[16, 16, 34, 34], [47, 16, 65, 34], [16, 47, 34, 65], [47, 47, 65, 65]]
      boxes.forEach(([x0, y0, x1, y1]) => fillRect(px, w, h, x0, y0, x1, y1, [r, g, b]))
    } else if (type === 'mine') {
      fillCircle(px, w, cx, cy, 22, [r, g, b])
      fillCircle(px, w, cx, 32, 8, [255, 255, 255])
      for (let y = 48; y <= 62; y++) {
        const half = 14 - Math.floor((y - 48) * 0.5)
        fillRect(px, w, h, cx - half, y, cx + half + 1, y + 1, [255, 255, 255])
      }
    }
  })
}

const tabs = [
  ['home', '#999999', '#4A90E2'],
  ['collab', '#999999', '#4A90E2'],
  ['data', '#999999', '#4A90E2'],
  ['mine', '#999999', '#4A90E2']
]

tabs.forEach(([name, gray, blue]) => {
  fs.writeFileSync(path.join(pngDir, `${name}.png`), drawTabIcon(name, gray))
  fs.writeFileSync(path.join(pngDir, `${name}-active.png`), drawTabIcon(name, blue))
})

console.log(`Exported ${Object.keys(SVG).length} SVG icons to assets/icons/svg/`)
console.log('Generated 8 tab bar PNG icons in assets/icons/')
