const cleanProps = require('../../casing/tso')

/**
 * Cleans the PubTrans/GetModuleInfoPublic?Key=NEWS response
 * @param {{ID: string, Type: string, News: string}[]} jsonArr JSON array after converting the parsed response
 * @returns {{id: string, type: number, news: string}[]} An array of news objects
 */
const PubTransNews = (jsonArr) => {
  const arr = jsonArr
    .map(o => ({ ...o, Type: Number(o.Type) }))
    .map(o => cleanProps.object(o))

  return arr
}

module.exports = PubTransNews
