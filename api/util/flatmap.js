const flatten = arr => arr.reduce((flat, next) => flat.concat(next), [])

module.exports = flatten
