const axios = require('axios')
const cleaner = require('../../api/clean/ETATransit/Routes')

const ETATransitFeed = `http://trirailpublic.etaspot.net/service.php`

axios.get(ETATransitFeed, {
  params: {
    service: 'get_routes',
    token: 'TESTING'
  }
}).then(response => {
  const data = cleaner(response.data)
  console.log(data)
})
