const cleanProps = require('../../casing/mdt-trains.js')
const { toTimestamp } = require('../../util/time-reformat')
const toBearing = require('../../util/convert-direction')

/**
 * Cleans the Trains (realtime) response
 * @param {{RecordSet}} jsonObj JSON object after converting the response from XML
 * @returns {string[]} An array of Metrorail trains as objects
 */
const FormatObject = jsonObj => {
  const { RecordSet } = jsonObj
  const noRecords = RecordSet.Record == null ||
    RecordSet === '' ||
    typeof RecordSet === 'string' ||
    typeof RecordSet.Record !== 'object'

  // No records
  if (noRecords) return []

  let trains = []
  if (!Array.isArray(RecordSet.Record)) trains.push(RecordSet.Record)
  else trains = RecordSet.Record

  const trainArray = trains.map(o => {
    let train = o
    train = cleanProps.object(train)
    train.bearing = toBearing(train.direction)
    train.timestamp = toTimestamp(train.timestamp)
    train.cars = train.cars.split('-').map(a => Number(a))
    delete train.direction
    delete train.Service
    return train
  })

  return trainArray
}

module.exports = FormatObject
