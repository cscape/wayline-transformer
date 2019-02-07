const fs = require('fs')
const path = require('path')

// Gets array of all directories within a specified path
const getDirectories = path => fs
  .readdirSync(path)
  .filter(file => fs
    .statSync(`${path}/${file}`)
    .isDirectory()
  )

const listing = getDirectories(path.resolve(__dirname, './api/clean'))

let mapped = {}
listing.forEach(apiType => {
  mapped[apiType] = {}
  const cleaners = fs
    .readdirSync(path.resolve(__dirname, `./api/clean/${apiType}`), 'utf8')
    .filter(f => f.indexOf('.js') === f.length - 3) // only files with .js extension
    .map(f => f.slice(0, f.length - 3))

  cleaners.forEach(f => (mapped[apiType][f] = require(`./api/clean/${apiType}/${f}.js`)))
})

let utils = {}
const _utils = fs
  .readdirSync(path.resolve(__dirname, `./api/util/`), 'utf8')
  .filter(f => f.indexOf('.js') === f.length - 3) // only files with .js extension
  .map(f => f.slice(0, f.length - 3))

_utils.forEach(f => (utils[f] = require(`./api/util/${f}.js`)))

/**
 * Mapped prototype of cleaner APIs, named and structured
 * according to the /api folder structure
 */
module.exports = {
  ...mapped,
  utils
}
