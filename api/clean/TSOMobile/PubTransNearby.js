const cleanProps = require('../../casing/tso')

/**
 * Cleans the PubTrans/GetModuleInfoPublic?Key=WAI_NEAREST_STOPS response
 * @param {{ID: string, StopNumber: string, Description: string, Latitude: string, Longitude: string, RouteID: string, Icon: string, Distance: string}[]} jsonArr JSON array after converting the parsed response
 * @returns {{stop_id: string, stop_number: string, description: string, lat: string, long: string, route_id: string, distance: string}[]} An array of stops nearby
 */
const PubTransNearby = (jsonArr) => {
  const arr = jsonArr
    // get rid of icon + clarify "ID" prop by naming it stop_id since that
    // value is only used to identify the stop internally
    .map(o => { delete o.Icon; o.stop_id = o.ID; delete o.ID; return o })
    .map(o => cleanProps.object(o))

  return arr
}

module.exports = PubTransNearby
