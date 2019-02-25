const cleanProps = require('../../casing/mdt-gis')
const flatmap = require('../../util/flatmap')
const { encode } = require('../../util/polyline')

/**
 * Cleans the BusRoutes_gdb response from the MDT-GIS FeatureServer
 * @param {{}} jsonObj FeatureServer response
 * @returns {{}[]} An array of routes
 */
const FormatObj = jsonObj => {
  const obj = jsonObj
    .features
    .map(o => {
      const attr = cleanProps.object(o.attributes)
      const coordsFlatmap = flatmap(o.geometry.paths)
      const polyline = encode(coordsFlatmap)
      return { ...attr, polyline }
    })

  return obj
}

module.exports = FormatObj
