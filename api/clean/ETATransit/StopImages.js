const cleanProps = require('../../casing/eta-transit')

const removeProps = [
  'amenities', 'comments', 'stoplocdesc'
]

/**
 * Cleans the service.get_stopimages response
 * @param {{get_stopimages: []}} jsonObj ETA Transit response JSON object
 * @returns {{}[]} An array of stop objects
 */
const FormatObject = jsonObj => {
  const obj = jsonObj
    .get_stopimages
    .map(o => {
      o.images = o.images.filter(a => a !== '')
      removeProps.forEach(a => delete o[a])
      return o
    })
    .map(o => cleanProps.object(o))

  return obj
}

module.exports = FormatObject
