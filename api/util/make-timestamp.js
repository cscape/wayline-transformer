const Long = require('long')

/**
 * Convert JavaScript timestamp to 10 digits, and return string
 * @param {number} dateObj A unix timestamp, can be generated with `Date.now()`
 */
const fromTime = (dateObj = Date.now()) => {
  return dateObj
    .toString()
    .substring(0, 10) // MBTA has a 10-character timestamp
}

const toLong = (dateString) => {
  if (typeof dateString !== 'string') dateString = fromTime(dateString)
  // The MBTA uses an unsigned Long
  const timestamp = new Long(dateString, Long.UZERO, true)
  return timestamp
}

module.exports = {
  fromTime, toLong
}
