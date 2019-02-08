const axios = require('axios')
const cleaner = require('../../api/clean/TSOMobile/PubTransNearby')
const WaylineConfig = require('@wayline/config')

const TransitXMLFeed = WaylineConfig.basefeeds.TSOMobile

axios.get(`${TransitXMLFeed}PubTrans/GetModuleInfoPublic`, {
  params: {
    Key: 'WAI_NEAREST_STOPS',
    id: 26082,
    f1: '25.732710400000002',
    f2: '-80.2594816',
    lan: 'en'
  }
}).then(function (response) {
  const jsonData = JSON.parse(response.data)
  const routes = cleaner(jsonData)

  console.log(routes)
})
