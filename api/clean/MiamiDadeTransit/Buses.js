const cleanProps = require('../../casing/mdt-buses')
const { toTimestamp } = require('../../util/time-reformat')
const toBearing = require('../../util/convert-direction')

/**
 * Cleans the Buses (realtime) response
 * @param {{RecordSet}} jsonObj JSON object after converting the response from XML
 * @returns {string[]} An array of buses as objects
 */
const FormatObject = jsonObj => {
  const { RecordSet } = jsonObj
  const noRecords = RecordSet.Record == null ||
    RecordSet === '' ||
    typeof RecordSet === 'string' ||
    typeof RecordSet.Record !== 'object'

  // No records
  if (noRecords) return []

  let buses = []
  if (!Array.isArray(RecordSet.Record)) buses.push(RecordSet.Record)
  else buses = RecordSet.Record

  const busArray = buses.map(o => {
    delete o.Service
    delete o.ServiceName
    o.bearing = toBearing(o.Direction)
    delete o.Direction
    o = cleanProps.object(o)
    o.timestamp = toTimestamp(o.timestamp)
    return o
  })

  return busArray
}

module.exports = FormatObject
