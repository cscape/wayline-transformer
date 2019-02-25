const axios = require('axios')
const cleaner = require('../../api/clean/TSOMobile/PubTransStopInfo')
const WaylineConfig = require('@wayline/config')

const TransitXMLFeed = WaylineConfig.basefeeds.TSOMobile

axios.get(`${TransitXMLFeed}PubTrans/GetModuleInfoPublic`, {
  params: {
    Key: 'STOPINFO_WITHOVERLAPS',
    id: 1067128,
    f1: 30109,
    lan: 'en'
  }
}).then(function (response) {
  const jsonData = JSON.parse(response.data)
  const routes = cleaner(jsonData)

  console.log(routes)
})
