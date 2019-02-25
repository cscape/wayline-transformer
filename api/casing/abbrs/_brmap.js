const Reg = text => RegExp(text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'))

/**
 * Finds words in string and cleans them
 * @param {string} str Single string
 * @param {object} map The casing map for words
 */
const brmap = (string, map) => {
  const phrase = string.replace(/_/gi, ' ')

  for (let key in map) {
    phrase.replace(Reg(key), map[key])
  }

  return phrase
}

module.exports = brmap
