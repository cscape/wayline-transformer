const axios = require('axios')
const cleaner = require('../../api/clean/ETATransit/Alerts')
// const WaylineConfig = require('@wayline/config')

const ETATransitFeed = `http://citylink.etaspot.net/service.php`

axios.get(ETATransitFeed, {
  params: {
    service: 'get_service_announcements',
    token: 'TESTING'
  }
}).then(response => {
  const data = cleaner(response.data)
  console.log(JSON.stringify(data))
})
