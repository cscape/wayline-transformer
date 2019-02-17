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
let modjs = fs.createWriteStream('./module.js')

modjs.on('open', () => {
  modjs.write(`// THIS IS AN AUTO-GENERATED FILE, DO NOT MANUALLY MODIFY\n\n`)
  modjs.write(`module.exports = {`)
  listing.forEach((apiType, i) => {
    modjs.write(`${i === 0 ? '\n' : ',\n'}  '${apiType}': {`)
    fs.readdirSync(path.resolve(__dirname, `./api/clean/${apiType}`), 'utf8')
      .filter(f => f.indexOf('.js') === f.length - 3) // only files with .js extension
      .map(f => f.slice(0, f.length - 3))
      .forEach((f, k) => {
        modjs.write(`${k === 0 ? '\n' : ',\n'}    '${f}': require('./api/clean/${apiType}/${f}.js')`)
      })
    modjs.write('\n  }')
  })

  modjs.write(`,\n  'utils': {`)
  fs.readdirSync(path.resolve(__dirname, `./api/util/`), 'utf8')
    .filter(f => f.indexOf('.js') === f.length - 3) // only files with .js extension
    .map(f => f.slice(0, f.length - 3))
    .forEach((f, k) => {
      modjs.write(`${k === 0 ? '\n' : ',\n'}    '${f}': require('./api/util/${f}.js')`)
    })
  modjs.write('\n  }')
  modjs.write('\n}\n')
})
