const cleanProps = require('../../casing/eta-transit')

/**
 * Cleans the service.get_service_announcements response
 * @param {{get_vehicles: []}} jsonObj ETA Transit response JSON object
 * @returns {{}[]} An array of service alert objects
 */
const FormatAlerts = jsonObj => {
  const obj = jsonObj
    .get_service_announcements
    .map(o => {
      o[cleanProps.single('announcements')] = o.announcements.map(a => ({
        ...a,
        start: new Date(a.start).getTime(),
        end: new Date(a.end).getTime()
      }))
      delete o.announcements
      return o
    })

  return obj
}

module.exports = FormatAlerts
