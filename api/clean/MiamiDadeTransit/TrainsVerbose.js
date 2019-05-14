const cleanProps = require('../../casing/mdt-trains')
const { elapsedNow } = require('../../util/time-reformat')
const toBearing = require('../../util/convert-direction')

/**
 * VERBOSE - Cleans the Trains (realtime) response
 * @param {{Trains}} jsonObj JSON object after converting the response from XML
 * @returns {string[]} An array of trains as objects
 */
const FormatObject = jsonObj => {
  const { Trains } = jsonObj
  const noRecords = Trains.Train == null ||
    Trains === '' ||
    typeof Trains === 'string' ||
    typeof Trains.Train !== 'object'

  // No records
  if (noRecords) return []

  let trains = []
  if (!Array.isArray(Trains.Train)) trains.push(Trains.Train)
  else trains = Trains.Train

  const p2Delete = [
    'Color', 'ServiceDirection', 'Service', 'LocationUpdatedDiff',
    'LineName'
  ]

  const trainArray = trains.filter(o => o.LineID !== 'OUT').map(o => {
    p2Delete.forEach(i => delete o[i])
    o = cleanProps.object(o)
    o.name = String(o.name)
    o.bearing = toBearing(o.bearing)
    o.timestamp = elapsedNow(o.timestamp_offset)
    o.cars = o.cars.split('-').map(a => Number(a))
    return o
  })

  return trainArray
}

module.exports = FormatObject
