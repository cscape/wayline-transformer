// THIS IS AN AUTO-GENERATED FILE, DO NOT MANUALLY MODIFY

module.exports = {
  'Brightline': {
  },
  'ETATransit': {
    'Alerts': require('./api/clean/ETATransit/Alerts.js'),
    'Patterns': require('./api/clean/ETATransit/Patterns.js'),
    'Routes': require('./api/clean/ETATransit/Routes.js'),
    'StopImages': require('./api/clean/ETATransit/StopImages.js'),
    'Stops': require('./api/clean/ETATransit/Stops.js'),
    'Vehicles': require('./api/clean/ETATransit/Vehicles.js')
  },
  'MiamiDadeTransit': {
    'MoverLoops': require('./api/clean/MiamiDadeTransit/MoverLoops.js'),
    'MoverShape': require('./api/clean/MiamiDadeTransit/MoverShape.js'),
    'MoverTracker': require('./api/clean/MiamiDadeTransit/MoverTracker.js')
  },
  'TSOMobile': {
    'PubTransLocations': require('./api/clean/TSOMobile/PubTransLocations.js'),
    'PubTransNearby': require('./api/clean/TSOMobile/PubTransNearby.js'),
    'PubTransNews': require('./api/clean/TSOMobile/PubTransNews.js'),
    'PubTransRoutes': require('./api/clean/TSOMobile/PubTransRoutes.js'),
    'PubTransRouteStops': require('./api/clean/TSOMobile/PubTransRouteStops.js'),
    'PubTransStopInfo': require('./api/clean/TSOMobile/PubTransStopInfo.js')
  },
  'utils': {
    'colors': require('./api/util/colors.js'),
    'polyline': require('./api/util/polyline.js'),
    'xml2json': require('./api/util/xml2json.js')
  }
}
