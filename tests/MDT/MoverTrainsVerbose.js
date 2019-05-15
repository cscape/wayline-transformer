const axios = require('axios')
const xml2json = require('../../api/util/xml2json')
const cleaner = require('../../api/clean/MiamiDadeTransit/MoverTrainsVerbose')
const WaylineConfig = require('@wayline/config')

const TransitXMLFeed = WaylineConfig.basefeeds.MiamiDadeTransitVerbose // VERBOSE

axios.get(`${TransitXMLFeed}MoverTrains/`, {
  params: {}
}).then(function (response) {
  const jsonData = xml2json(response.data)
  const vehicles = cleaner(jsonData)

  console.log(vehicles)
})
