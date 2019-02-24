const cleanProps = require('../../casing/eta-transit')

const removeProps = [
  'tripID', 'load', 'capacity', 'blockID', 'nextStopID',
  'nextStopETA', 'nextStopETA', 'nextPatternStopID',
  'minutesToNextStops', 'deadHead', 'inService', 'aID',
  'onSchedule'
]

/**
 * Cleans the service.get_vehicles response
 * @param {{get_vehicles: []}} jsonObj ETA Transit response JSON object
 * @returns {{}[]} An array of vehicle objects
 */
const FormatVehicles = (jsonObj) => {
  const obj = jsonObj
    .get_vehicles
    .map(o => {
      o.running = Boolean(o.inService)
      removeProps.forEach(a => delete o[a])
      return o
    })
    .map(o => cleanProps.object(o))

  return obj
}

module.exports = FormatVehicles
