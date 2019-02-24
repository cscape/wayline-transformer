const fmap = mapName => {
  const map = require(`./maps/${mapName}.json`)

  /**
   * Converts single strings
   * @param {string} str Single property value
   */
  const single = (str) => {
    const ss = str.toString()
    const ns = map[ss]
    if (ns != null) return ns
    return ss
  }

  /**
   * Converts JSON object properties
   * @param {{}} jsonObj JSON object containing enumerable properties
   */
  const object = (jsonObj) => {
    const nj = {}
    for (let prop in jsonObj) {
      nj[single(prop)] = jsonObj[prop]
    }
    return nj
  }

  return { object, single }
}

module.exports = fmap
