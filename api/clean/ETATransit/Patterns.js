const cleanProps = require('../../casing/eta-transit')
const colors = require('../../util/colors')

const removeProps = [
  'decLine', 'extID', 'stations', 'type', 'routeNames'
]

/**
 * Cleans the service.get_patterns response
 * @param {{get_patterns: []}} jsonObj ETA Transit response JSON object
 * @returns {{}[]} An array of pattern objects
 */
const FormatObject = jsonObj => {
  const obj = jsonObj
    .get_patterns
    .map(o => {
      o.color = colors.hexToRgb(o.color)
      removeProps.forEach(a => delete o[a])
      return o
    })
    .map(o => cleanProps.object(o))

  return obj
}

module.exports = FormatObject
