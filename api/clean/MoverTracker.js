const cleanProps = require('../casing/movers')

const removeBadProps = (jsonObj) => {
  const bad = ['Arrival', 'Time', 'time', 'LoopName', 'loopName']
  const nj = {}
  for (let prop in jsonObj) {
    if (bad.indexOf(prop) !== -1) continue
    nj[prop] = jsonObj[prop]
  }
  return nj
}

const MoverTrackerTimes = (moverStop) => {
  const loopKeys = [
    '', 'Est', 'Arrival', 'Train', 'ServiceTypeID'
  ]

  const delim = 'Time'

  const singleKeys = ['Direction', 'LoopID', 'LoopName']

  const Times = []
  const keys = Object.keys(moverStop)
    .filter(a => singleKeys.indexOf(a) === -1)
  const l = loopKeys.length
  const loopCount = keys.length / l
  // loop 4 times
  for (let i = 0; i < loopCount; i += 1) {
    let currentTimes = {}
    for (let k = 0; k < l; k += 1) {
      const originalKey = keys[(i * l) + k]
      // loop through all defined keys to find the best match
      let cleanedKey
      for (let j = 0; j < l; j += 1) {
        const lk = loopKeys[j]
        const pos = originalKey.indexOf(lk)
        const nums = originalKey.replace(/[^0-9]/gm, '')
        if (originalKey.indexOf(delim) === 0 && delim.length + nums.length === originalKey.length) {
          cleanedKey = delim
        }
        if (pos === -1) continue
        if (pos + lk.length !== originalKey.length) continue
        cleanedKey = originalKey.slice(pos)
        break
      }
      if (cleanedKey === 'ServiceTypeID') {
        // if ServiceTypeID is 0, it's available
        // 1 = out of service
        currentTimes['Running'] = !moverStop[originalKey]
      } else {
        currentTimes[cleanedKey] = moverStop[originalKey]
      }
    }
    currentTimes = removeBadProps(currentTimes)
    currentTimes = cleanProps.object(currentTimes)
    if (currentTimes.LoopID === '') continue
    else Times.push(currentTimes)
  }

  return {
    direction: moverStop.Direction,
    id: moverStop.LoopID,
    times: Times
  }
}

/**
 * Cleans the MoverTracker response
 * @param {{RecordSet}} jsonObj JSON object after converting the response from XML
 */
const MoverTracker = (jsonObj) => {
  const { RecordSet } = jsonObj
  const noMovers = RecordSet.Record == null ||
    RecordSet === '' ||
    typeof RecordSet === 'string' ||
    typeof RecordSet.Record !== 'object'

  // No trains scheduled at the station, return empty array
  if (noMovers) return []

  const loopKeys = [
    'LoopID', 'LoopName', 'Direction', 'Time1',
    'Time1_Est', 'Time1_Arrival', 'Time1_Train',
    'Time1_ServiceTypeID', 'Time2',
    'Time2_Est', 'Time2_Arrival', 'Time2_Train',
    'Time2_ServiceTypeID'
  ]

  const singleKeys = ['StationID', 'StationName']

  let movers = []
  if (Array.isArray(RecordSet.Record) === false) {
    // Record is a hashtable, not array
    movers.push(RecordSet.Record)
  } else {
    movers = RecordSet.Record
  }

  const moverLoops = movers.map(stationObj => {
    const loops = []
    const keys = Object.keys(stationObj)
      .filter(a => singleKeys.indexOf(a) === -1)
    const l = loopKeys.length
    const loopCount = keys.length / l
    // loop 4 times
    for (let i = 0; i < loopCount; i += 1) {
      let currentLoop = {}
      for (let k = 0; k < l; k += 1) {
        const originalKey = keys[(i * l) + k]
        // loop through all defined keys to find the best match
        let cleanedKey
        for (let j = 0; j < l; j += 1) {
          const lk = loopKeys[j]
          const pos = originalKey.indexOf(lk)
          if (pos === -1) continue
          if (pos + lk.length !== originalKey.length) continue
          cleanedKey = originalKey.slice(pos)
          break
        }
        // cleanedKey = cleanProps.single(cleanedKey)
        currentLoop[cleanedKey] = stationObj[originalKey]
      }
      currentLoop = removeBadProps(currentLoop)
      if (currentLoop.LoopID === '') continue
      else loops.push(MoverTrackerTimes(currentLoop))
    }
    return {
      name: stationObj.StationName,
      id: stationObj.StationID,
      loops
    }
  })

  return moverLoops
}

module.exports = MoverTracker
