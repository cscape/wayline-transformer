const cleanProps = require('../../casing/tso')
const colors = require('../../util/colors')

const removeProps = [
  'ETAResult', 'ETASeconds', 'ID', 'RouteColor'
]

/**
 * Cleans the PubTrans/GetModuleInfoPublic?Key=STOPINFO_WITHOVERLAPS response
 * @param {{}[]} jsonArr JSON array after converting the parsed response
 * @returns {{}[]} Stop object
 */
const FormatArray = jsonArr => {
  const arr = jsonArr[0]
    .map(o => {
      o.stop_id = o.ID
      o.color = colors.hexToRgb(o.RouteColor)
      o.Latitude = Number(o.Latitude)
      o.Longitude = Number(o.Longitude)
      removeProps.forEach(a => delete o[a])
      return o
    })
    .map(o => cleanProps.object(o))[0]

  return arr
}

module.exports = FormatArray
