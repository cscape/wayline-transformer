const cleanProps = require('../../casing/eta-transit')
const colors = require('../../util/colors')

const removeProps = [
  'abbr', 'order', 'showDirection', 'showPlatform', 'showScheduleNumber',
  'showVehicleCapacity', 'type'
]

/**
 * Cleans the service.get_service_announcements response
 * @param {{get_vehicles: []}} jsonObj ETA Transit response JSON object
 * @returns {{}[]} An array of service alert objects
 */
const FormatAlerts = jsonObj => {
  const obj = jsonObj
    .get_routes
    .map(o => {
      o.color = colors.hexToRgb(o.color)
      removeProps.forEach(a => delete o[a])
      return o
    })
    .map(o => cleanProps.object(o))

  return obj
}

module.exports = FormatAlerts
