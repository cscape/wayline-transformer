const cleanProps = require('../../casing/mdt-movertrains')
const { elapsedNow } = require('../../util/time-reformat')
const toBearing = require('../../util/convert-direction')
const cleanifyJSON = require('../../util/mdt-clean-response')

/**
 * VERBOSE - Cleans the MoverTrains (realtime) response
 * @param {{MoverTrains}} jsonObj JSON object after converting the response from XML
 * @returns {string[]} An array of MoverTrains as objects
 */
const FormatObject = jsonObj => {
  const movers = cleanifyJSON('MoverTrains', 'Train', jsonObj)

  const p2Delete = [
    'Color', 'ServiceDirection', 'Service', 'LocationUpdatedDiff',
    'LocationUpdated', 'LoopName'
  ]

  const moversArray = movers.map(o => {
    p2Delete.forEach(i => delete o[i])
    o = cleanProps.object(o)
    o.bearing = toBearing(o.bearing)
    o.timestamp = elapsedNow(o.timestamp_offset)
    o.cars = String(o.cars).split('-').map(a => Number(a))
    return o
  })

  return moversArray
}

module.exports = FormatObject
