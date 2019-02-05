const fs = require('fs')
const path = require('path')

const getDirectories = path => fs
  .readdirSync(path)
  .filter(file => fs
    .statSync(`${path}/${file}`)
    .isDirectory()
  )

const listing = getDirectories(path.resolve(__dirname, '../api/clean'))

console.log(listing)
