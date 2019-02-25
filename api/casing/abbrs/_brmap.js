const Reg = text => {
  text = text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  return RegExp(text)
}

/**
 * Finds words in string and cleans them
 * @param {string} str Single string
 * @param {object} map The casing map for words
 */
const brmap = (string, map) => {
  let phrase = string.replace(/_/gi, ' ')

  for (let key in map) {
    phrase = phrase.replace(Reg(key), map[key])
  }

  return phrase
}

module.exports = brmap
