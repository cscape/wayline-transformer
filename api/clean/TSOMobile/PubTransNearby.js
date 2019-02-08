const cleanProps = require('../../casing/tso')

/**
 * Cleans the PubTrans/GetModuleInfoPublic?Key=WAI_NEAREST_STOPS response
 * @param {{ID: string, StopNumber: string, Description: string, Latitude: string, Longitude: string, RouteID: string, Icon: string, Distance: string}[]} jsonArr JSON array after converting the parsed response
 * @returns {{id: string, stop_number: string, description: string, lat: string, long: string, route_id: string, distance: string}[]} An array of stops nearby
 */
const PubTransNearby = (jsonArr) => {
  const arr = jsonArr
    .map(o => { delete o.Icon; return o })
    .map(o => cleanProps.object(o))

  return arr
}

module.exports = PubTransNearby
