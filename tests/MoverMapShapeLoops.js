const axios = require('axios')
const xml2json = require('../api/util/xml2json')
const cleaner = require('../api/clean/MoverLoops')

const { TransitXMLFeed } = require('./config.json')

axios.get(`${TransitXMLFeed}MoverMapShapeLoops`).then(function (response) {
  const jsonData = xml2json(response.data)
  const loopIDs = cleaner(jsonData)

  console.log(loopIDs)
})
