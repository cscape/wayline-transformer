const axios = require('axios')
const xml2json = require('../api/util/xml2json')
const cleaner = require('../api/clean/MoverTracker')

const { TransitXMLFeed } = require('./config.json')

axios.get(`${TransitXMLFeed}MoverTracker`, {
  params: {
    StationID: 'BLK'
  }
}).then(function (response) {
  const jsonData = xml2json(response.data)
  const movers = cleaner(jsonData)

  const s = n => Array(n + 1).fill(' ').join('')

  console.log(movers)

  let ticker = ''

  movers.forEach(station => {
    ticker += `\n\n${s(0)}${station.name} Station:`
    station.loops.forEach(loop => {
      const Direction = loop.direction === '' ? '' : '(' + loop.direction
        .replace('N', 'North')
        .replace('S', 'South')
        .replace('B', 'bound') + ')'
      const LoopID = loop.id.replace(/\s\(.+$/g, '')
      ticker += `\n${s(2)}${LoopID} Loop ${Direction}`
      loop.times.forEach(car => {
        const arrivalMins = Math.floor(car.estimated_arrival / 60)
        const arrivalSecs = Math.round(((car.estimated_arrival / 60) - arrivalMins) * 60)
        ticker += `\n${s(4)}Car ${car.car}: Arriving in${arrivalMins > 0 ? ' ' + arrivalMins + 'min' : ''} ${arrivalSecs}sec`
      })
    })
  })
  console.log(ticker)
})
