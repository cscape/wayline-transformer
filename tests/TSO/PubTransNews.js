const axios = require('axios')
const cleaner = require('../../api/clean/TSOMobile/PubTransNews')
const WaylineConfig = require('@wayline/config')

const TransitXMLFeed = WaylineConfig.basefeeds.TSOMobile

axios.get(`${TransitXMLFeed}PubTrans/GetModuleInfoPublic`, {
  params: {
    Key: 'NEWS',
    id: 22844,
    lan: 'en'
  }
}).then(function (response) {
  const jsonData = JSON.parse(response.data)
  const routes = cleaner(jsonData)

  console.log(routes)
})
