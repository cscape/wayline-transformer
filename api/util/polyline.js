/**
 * Based off of [the offical Google document](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)
 *
 * Some parts from [this implementation](http://facstaff.unca.edu/mcmcclur/GoogleMaps/EncodePolyline/PolylineEncoder.js)
 * by [Mark McClure](http://facstaff.unca.edu/mcmcclur/)
 *
 * @module polyline
 */

const polyline = {}

function pyRound (value) {
  // Google's polyline algorithm uses the same rounding strategy as Python 2, which is different from JS for negative values
  return Math.floor(Math.abs(value) + 0.5) * (value >= 0 ? 1 : -1)
}

function encode (current, previous, factor) {
  current = pyRound(current * factor)
  previous = pyRound(previous * factor)
  var coordinate = current - previous
  coordinate <<= 1
  if (current - previous < 0) {
    coordinate = ~coordinate
  }
  var output = ''
  while (coordinate >= 0x20) {
    output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 63)
    coordinate >>= 5
  }
  output += String.fromCharCode(coordinate + 63)
  return output
}

/**
 * Decodes to a [latitude, longitude] coordinates array.
 *
 * This is adapted from the implementation in Project-OSRM.
 *
 * @param {String} str
 * @param {Number} precision
 * @returns {Array}
 *
 * @see https://github.com/Project-OSRM/osrm-frontend/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
 */
polyline.decode = function (str, precision) {
  let index = 0
  let lat = 0
  let lng = 0
  let coordinates = []
  let shift = 0
  let result = 0
  let byte = null
  let latChange
  let lngChange
  let factor = Math.pow(10, precision || 5)

  // Coordinates have variable length when encoded, so just keep
  // track of whether we've hit the end of the string. In each
  // loop iteration, a single coordinate is decoded.
  while (index < str.length) {
    // Reset shift, result, and byte
    byte = null
    shift = 0
    result = 0

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    latChange = ((result & 1) ? ~(result >> 1) : (result >> 1))

    shift = result = 0

    do {
      byte = str.charCodeAt(index++) - 63
      result |= (byte & 0x1f) << shift
      shift += 5
    } while (byte >= 0x20)

    lngChange = ((result & 1) ? ~(result >> 1) : (result >> 1))

    lat += latChange
    lng += lngChange

    coordinates.push([lat / factor, lng / factor])
  }

  return coordinates
}

/**
 * Encodes the given [latitude, longitude] coordinates array.
 *
 * @param {Array.<Array.<Number>>} coordinates
 * @param {Number} precision
 * @returns {String}
 */
polyline.encode = (coordinates, precision) => {
  if (!coordinates.length) return ''

  const factor = Math.pow(10, precision || 5)
  let output = encode(coordinates[0][0], 0, factor) + encode(coordinates[0][1], 0, factor)

  for (let i = 1; i < coordinates.length; i++) {
    const a = coordinates[i]; const b = coordinates[i - 1]
    output += encode(a[0], b[0], factor)
    output += encode(a[1], b[1], factor)
  }

  return output
}

module.exports = polyline
