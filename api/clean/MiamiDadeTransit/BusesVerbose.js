const cleanProps = require('../../casing/mdt-buses')
const { elapsedNow } = require('../../util/time-reformat')
const toBearing = require('../../util/convert-direction')

/**
 * VERBOSE - Cleans the Buses (realtime) response
 * @param {{Buses}} jsonObj JSON object after converting the response from XML
 * @returns {string[]} An array of buses as objects
 */
const FormatObject = jsonObj => {
  const { Buses } = jsonObj
  const noRecords = Buses.Bus == null ||
    Buses === '' ||
    typeof Buses === 'string' ||
    typeof Buses.Bus !== 'object'

  // No records
  if (noRecords) return []

  let buses = []
  if (!Array.isArray(Buses.Bus)) buses.push(Buses.Bus)
  else buses = Buses.Bus

  const p2Delete = [
    'ServiceName', 'RouteAlias', 'RouteColor', 'ShapeID',
    'ServiceDirection', 'Service', 'ServiceName', 'NextTripID', 'NextTripShapeID',
    'NextTripRoute', 'NextTripRouteAlias', 'NextTripRouteColor', 'NextTripServiceDirection',
    'NextTripService', 'NextTripHeadsign', 'LocationUpdatedDiff'
  ]

  const busArray = buses.map(o => {
    p2Delete.forEach(i => delete o[i])
    o = cleanProps.object(o)
    o.name = String(o.name)
    o.bearing = toBearing(o.bearing)
    o.timestamp = elapsedNow(o.timestamp_offset)
    return o
  })

  return busArray
}

module.exports = FormatObject
