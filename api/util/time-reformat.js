// Gets dumb timestamps like '4:00:07 PM' and converts it to a
// number of seconds.
// Number is then processed to trueStamp and outputs
// best-estimated real timestamp.

/**
 * Converts time strings to seconds since 0
 * @param {string} hourTime A string of time formatted as `HH:MM:SS AM`
 * @returns {number} Seconds elapsed since start of day
 */
const reformat = hourTime => {
  const cleanString = (hourTime).split(/\s/)
  const HMSarray = cleanString[0].split(':').map(a => Number(a))
  const isPM = cleanString[1] === 'PM'
  if (HMSarray[0] === 12 && !isPM) HMSarray[0] = 0 // for 12AM, set to 0
  if (HMSarray[0] === 12 && isPM) HMSarray[0] = 12 // for 12PM, set to 12
  if (HMSarray[0] < 12 && isPM) HMSarray[0] += 12 // for 1+ PM, add 12 hrs
  const totalSeconds = (HMSarray[0] * 60 * 60) + (HMSarray[1] * 60) + HMSarray[2]
  return totalSeconds
}

/**
 * Converts seconds to real Unix timestamp
 * @param {number} secs Number of seconds elapsed since start of day
 * @returns {number} Numerical Unix timestamp
 */
const trueStamp = secs => {
  const d = Date.now() / 1000
  // there's only precision up to the second, not millisecond
  const interval = 60 * 60 * 24 // 24 hours in seconds
  const startOfDay = Number((Math.floor(d / interval) * interval).toFixed(0))
  const endOfDay = startOfDay + interval // Hour 00:00:00 next day
  const elapsedDaySeconds = Number(d.toFixed(0)) - startOfDay
  const quarterMorn = 21600
  const quarterNoon = 64800
  let realTime = 0
  if (elapsedDaySeconds > quarterNoon && secs < quarterMorn) { // it's afternoon & time overlaps to next morning
    realTime = endOfDay + secs
  } else if (elapsedDaySeconds < quarterMorn && secs > quarterNoon) { // it's morning & time overlaps from previous day
    realTime = startOfDay - secs
  } else {
    // default behavior: add time to start of day
    realTime = secs + startOfDay
  }
  return realTime * 1000
}

module.exports = { reformat, trueStamp }
