/**
 * Convert JavaScript timestamp to 10 digits, and return string
 * @param {number} dateObj A unix timestamp, can be generated with `Date.now()`
 */
const fromTime = (dateObj = Date.now()) => {
  return dateObj
    .toString()
    .substring(0, 10) // MBTA has a 10-character timestamp
}

module.exports = {
  fromTime
}
