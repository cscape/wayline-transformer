const cleanProps = require('../../casing/tso')

/**
 * Cleans the PubTrans/GetModuleInfoPublic?Key=ROUTES response
 * @param {{ID: string, LineColor: string, Name: string, RoutePath: string, StopIcon: string, UnitIcon: string}[]} jsonArr JSON array after converting the parsed response
 * @returns {{}[]} An array of route objects
 */
const PubTransRoutes = (jsonArr) => {
  let arr = jsonArr
    .map(o => (o.UnitIcon = `https://publictransportation.tsomobile.com/images/mapIcons/${o.UnitIcon}`))
    .map(o => cleanProps.object(o))

  return arr
}

module.exports = PubTransRoutes
