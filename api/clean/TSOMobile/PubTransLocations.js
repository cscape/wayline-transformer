const cleanProps = require('../../casing/tso')

/**
 * Cleans the PubTrans/GetModuleInfoPublic?Key=UNITS_LOCATION_ROUTE response
 * @param {{}[]} jsonArr JSON array after converting the parsed response
 * @returns {{}[]} An array of locations /bus objects
 */
const FormatArray = jsonArr => {
  const arr = jsonArr
    .map(o => ({
      ...o,
      timestamp: Number(o.Tim) * 1000,
      name: o.ShortName
    }))
    .map(o => {
      delete o.AntibunchingCmd; delete o.Occupation
      delete o.RealStopID; delete o.SquareID
      delete o.StopA; delete o.StopB
      delete o.Tim; delete o.ShortName
      return o
    })
    .map(o => cleanProps.object(o))

  return arr
}

module.exports = FormatArray
