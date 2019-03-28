const axios = require('axios')
const xml2json = require('../../api/util/xml2json')
const cleaner = require('../../api/clean/MiamiDadeTransit/Buses')
const WaylineConfig = require('@wayline/config')

const TransitXMLFeed = WaylineConfig.basefeeds.MiamiDadeTransit

axios.get(`${TransitXMLFeed}Buses`, {
  params: {
    BusID: ''
  }
}).then(function (response) {
  const jsonData = xml2json(response.data)
  const buses = cleaner(jsonData)

  console.log(buses)
})
