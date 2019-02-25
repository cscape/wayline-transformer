const cleanProps = require('../../casing/eta-transit')

const removeProps = [
  'extID', 'shortName'
]

/**
 * Cleans the service.get_stops response
 * @param {{get_stops: []}} jsonObj ETA Transit response JSON object
 * @returns {{}[]} An array of stop objects
 */
const FormatObject = jsonObj => {
  const obj = jsonObj
    .get_stops
    .map(o => {
      removeProps.forEach(a => delete o[a])
      return o
    })
    .map(o => cleanProps.object(o))

  return obj
}

module.exports = FormatObject
