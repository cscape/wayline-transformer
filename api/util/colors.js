const rgbToHex = (r, g, b) => [r, g, b].map(x => {
  const hex = x.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}).join('')

const hexToRgb = hex => {
  hex = hex.replace(/[^A-Fa-f0-9]/g, '')

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }

  const num = parseInt(hex, 16)
  const red = num >> 16
  const green = (num >> 8) & 255
  const blue = num & 255

  return [red, green, blue]
}

module.exports = {
  rgbToHex, hexToRgb
}
