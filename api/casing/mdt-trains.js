module.exports = require('./_fmap')({
  'LineID': 'route',
  'TrainID': 'id',
  'Direction': 'direction',
  'ServiceDirection': 'service_direction',
  'LocationUpdated': 'timestamp',
  'Latitude': 'lat',
  'Cars': 'cars',
  'Longitude': 'lng',
  'vehDirection': 'bearing',
  'vehSpeed': 'speed',
  'LocationUpdatedDiffBasic': 'timestamp_offset' // in seconds
})
