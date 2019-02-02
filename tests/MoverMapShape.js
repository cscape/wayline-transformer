const axios = require('axios')
const xml2json = require('../api/util/xml2json')
const cleaner = require('../api/clean/MoverShape')

const { TransitXMLFeed } = require('./config.json')

axios.get(`${TransitXMLFeed}MoverMapShape`, {
  params: {
    LoopID: 'OMN'
  }
}).then(function (response) {
  const jsonData = xml2json(response.data)
  const shapes = cleaner(jsonData)

  console.log(shapes)
})
