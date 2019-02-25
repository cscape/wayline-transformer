const axios = require('axios')
const xml2json = require('../../api/util/xml2json')
const cleaner = require('../../api/clean/MiamiDadeTransit/MoverLoops')
const WaylineConfig = require('@wayline/config')

const TransitXMLFeed = WaylineConfig.basefeeds.MiamiDadeTransit

axios.get(`${TransitXMLFeed}MoverMapShapeLoops`).then(function (response) {
  const jsonData = xml2json(response.data)
  const loopIDs = cleaner(jsonData)

  console.log(loopIDs)
})
