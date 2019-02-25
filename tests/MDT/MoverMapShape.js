const axios = require('axios')
const xml2json = require('../../api/util/xml2json')
const cleaner = require('../../api/clean/MiamiDadeTransit/MoverShape')
const WaylineConfig = require('@wayline/config')

const TransitXMLFeed = WaylineConfig.basefeeds.MiamiDadeTransit

axios.get(`${TransitXMLFeed}MoverMapShape`, {
  params: {
    LoopID: ''
  }
}).then(function (response) {
  const jsonData = xml2json(response.data)
  const shapes = cleaner(jsonData)

  console.log(JSON.stringify(shapes))
})
