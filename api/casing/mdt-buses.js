module.exports = require('./_fmap')({
  'BusName': 'name', // STRING that identifies bus "serial number", see [1]
  'BusID': 'id', // unique ID for this bus
  'Direction': 'direction', // Only these: N, NE, E, SE, S, SW, W, NW
  'vehDirection': 'direction',
  'RouteID': 'route_id',
  'TripID': 'trip_id',
  'ServiceDirection': 'service_direction',
  'TripHeadsign': 'headsign',
  'LocationUpdated': 'timestamp',
  'Latitude': 'lat',
  'Longitude': 'lng',
  'OnTime': 'delay', // pos = arriving late, neg(-) = ahead of schedule, arriving early
  'LocationUpdatedDiffBasic': 'timestamp_offset', // in seconds
  'vehSpeed': 'speed',
  'ShapeID': 'shape_id',
  'Route': 'route_id',
  'RouteAlias': 'route_name'
})

/* [1] Each bus has a serial ID, which represents when the bus
 * was purchased and which physical vehicle it is. The first 1 or 2
 * digits represents the year: "19021" (2019), "04174" (2004), "15508" (2015),
 * "18176" (2018), "06106" (2006), and so on.
 *
 * EXCEPTION: Some buses may have a non-numerical ID like "LSF463", I don't
 * know what these mean so be sure to account for this
 */
