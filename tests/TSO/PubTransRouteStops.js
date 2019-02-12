const axios = require('axios')
const cleaner = require('../../api/clean/TSOMobile/PubTransRouteStops')
const WaylineConfig = require('@wayline/config')

const TransitXMLFeed = WaylineConfig.basefeeds.TSOMobile

axios.get(`${TransitXMLFeed}PubTrans/GetModuleInfoPublic`, {
  params: {
    Key: 'ROUTE_STOPS_AND_UNITS',
    id: 92089,
    lan: 'en'
  }
}).then(function (response) {
  const jsonData = JSON.parse(response.data)
  const routes = cleaner(jsonData)

  console.log(routes)
})
