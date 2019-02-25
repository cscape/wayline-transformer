const cleanProps = require('../../casing/tso')

/**
 * Cleans the PubTrans/GetModuleInfoPublic?Key=ROUTE_STOPS_AND_UNITS response
 * @param {{}[]} jsonArr JSON array after converting the parsed response
 * @returns {{stop_id: string, stop_number: string, lat: string, long: string}[]} An array of stops
 */
const FormatArray = jsonArr => {
  const arr = jsonArr[0] // arr[1] contains realtime bus data, not needed
    .map(i => { delete i.Icon; i.stop_id = i.ID; delete i.ID; return i })
    .map(i => cleanProps.object(i))

  return arr
}

module.exports = FormatArray
