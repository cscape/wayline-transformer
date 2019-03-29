const axios = require('axios')
const xml2json = require('../../api/util/xml2json')
const cleaner = require('../../api/clean/MiamiDadeTransit/Trains')
const WaylineConfig = require('@wayline/config')

const TransitXMLFeed = WaylineConfig.basefeeds.MiamiDadeTransit

axios.get(`${TransitXMLFeed}Trains`, {
  params: {
    TrainID: ''
  }
}).then(function (response) {
  const jsonData = xml2json(response.data)
  const trains = cleaner(jsonData)

  console.log(trains)
})
