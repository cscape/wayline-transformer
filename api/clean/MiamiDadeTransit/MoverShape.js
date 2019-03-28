const cleanProps = require('../../casing/mdt-movers')
const { encode } = require('../../util/polyline')

/**
 * Cleans the MoverMapShape response
 * @param {{RecordSet}} jsonObj JSON object after converting the response from XML
 */
const FormatObject = jsonObj => {
  const { RecordSet } = jsonObj
  const noRecords = RecordSet.Record == null ||
    RecordSet === '' ||
    typeof RecordSet === 'string' ||
    typeof RecordSet.Record !== 'object'

  // No records
  if (noRecords) return []

  const records = RecordSet.Record
  // map reduce all records to return unique loop IDs
  const loopIDs = records.map(o => o.LoopID).filter((nm, i, arr) => arr.indexOf(nm) === i)

  // Creates an array of { id: 'BKL', points: [] } for each loop ID
  // and stores it in the `loops` variable
  const loops = loopIDs.map(id => ({
    id, points: [], polyline: ''
  }))

  records.forEach(record => {
    const rc = cleanProps.object(record)
    const { id } = rc
    delete rc.id; delete rc.OrderNum
    loops[loopIDs.indexOf(id)].points.push(Object.values(rc))
  })

  loops.forEach(loop => {
    loop.polyline = encode(loop.points)
    delete loop.points
    return loop
  })

  return loops
}

module.exports = FormatObject
