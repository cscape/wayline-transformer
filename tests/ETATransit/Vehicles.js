const axios = require('axios')
const cleaner = require('../../api/clean/ETATransit/Vehicles')
const WaylineConfig = require('@wayline/config')

const TriRailETATransit = WaylineConfig.basefeeds.CoralGablesETA

axios.get(TriRailETATransit, {
  params: {
    service: 'get_vehicles',
    token: 'TESTING'
  }
}).then(response => {
  const data = cleaner(response.data)
  console.log(data)
})
