const cleanProps = require('../../casing/eta-transit')

/**
 * Cleans the service.get_vehicles response
 * @param {{get_vehicles: []}} jsonObj ETA Transit response JSON object
 * @returns {{}[]} An array of route objects
 */
const FormatVehicles = (jsonObj) => {
  const obj = jsonObj
  return obj
}

module.exports = FormatVehicles
