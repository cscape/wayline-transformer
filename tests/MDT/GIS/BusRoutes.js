const axios = require('axios')
const cleaner = require('../../../api/clean/MiamiDadeGIS/BusRoutes')

const Feed = `https://services.arcgis.com/8Pc9XBTAsYuxx9Ny/arcgis/rest/services/BusRoutes_gdb/FeatureServer/0/query`

axios.get(Feed, {
  params: {
    'where': '1=1',
    'outFields': 'LINEABBR,LINENAME', // only return these fields
    'orderByFields': 'LINEABBR ASC', // ascending by route abbreviation (120: 120 Aventura/Beach Max)
    'f': 'json'
  }
}).then(response => {
  const data = cleaner(response.data)
  console.log(data)
})
