const fs = require('fs')
const path = require('path')
const cleaners = fs
  .readdirSync(path.resolve(__dirname, './api/clean'), 'utf8')
  .filter(f => f.indexOf('.js') === f.length - 3) // only files with .js extension
  .map(f => f.slice(0, f.length - 3))

let mapped = {}
cleaners.forEach(f => (mapped[f] = require(`./api/clean/${f}.js`)))

module.exports = mapped
