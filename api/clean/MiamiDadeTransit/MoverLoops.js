const cleanProps = require('../../casing/movers')

/**
 * Cleans the MoverMapShapeLoops response
 * @param {{RecordSet}} jsonObj JSON object after converting the response from XML
 * @returns {string[]} An array of Loop IDs as strings
 */
const FormatObject = jsonObj => {
  const { RecordSet } = jsonObj
  const noRecords = RecordSet.Record == null ||
    RecordSet === '' ||
    typeof RecordSet === 'string' ||
    typeof RecordSet.Record !== 'object'

  // No records
  if (noRecords) return []

  let loopos = []
  if (Array.isArray(RecordSet.Record) === false) {
    // Record is a hashtable, not array
    loopos.push(RecordSet.Record)
  } else {
    // there's an array of records
    loopos = RecordSet.Record
  }

  const loopIDs = loopos.map(o => cleanProps.object(o).id)

  return loopIDs
}

module.exports = FormatObject
