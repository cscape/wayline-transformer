const apprepositions = ['at', 'but', 'by', 'for', 'in', 'of', 'off', 'on', 'out', 'per', 'to', 'up', 'via']
const articles = ['a', 'an', 'the']
const conjunctions = ['and', 'but', 'or', 'nor', 'for', 'yet', 'so']
const other = ['en', 'as', 'vs.', 'v[.]?']
const apsmall = '(' + (apprepositions.concat(articles).concat(conjunctions).concat(other)).join('|') + ')'
const punct = "([!\"#$%&'()*+,./:;<=>?@[\\\\\\]^_`{|}~-]*)"

const lower = word => word.length > 3 ? word.toLowerCase() : word

const upper = word => {
  const padFront = word.search(/\S|$/)
  return word.substring(0, padFront) + word.substr(padFront, 1).toUpperCase() + word.substring(padFront + 1).toLowerCase()
}

const AP = title => {
  const parts = []
  const split = /[.,/#!$%?^&*;:{}=\-_`~()]/g
  let index = 0

  while (true) {
    const m = split.exec(title)
    parts.push(title.substring(index, m ? m.index : title.length)
      .replace(/\b([A-Za-zÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿß][a-zàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿß.’Õ]*)\b/g, (all) => {
        return /[A-Za-zÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿß]\.[A-Za-zÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿß]/.test(all) && index === 0 && all.length > 4 ? all : upper(all)
      })
      .replace(/\b([A-Za-zÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿß][a-zàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüýþÿß.'Õ]*)\b/g, (all) => {
        return /[A-Za-zÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿß]\.[A-Za-zÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿß]/.test(all) && all.length > 4 ? all : upper(all)
      })
      .replace(RegExp('\\b' + apsmall + '\\b', 'ig'), lower)
      .replace(RegExp('^' + punct + apsmall + '\\b', 'ig'), (a, punct, word) => punct + upper(word))
      .replace(RegExp('\\b' + apsmall + punct + '$', 'ig'), upper))
    index = split.lastIndex
    if (m) { parts.push(m[0]) } else { break }
  }
  return parts
    .join('')
    .replace(/ V(s?)\. /ig, ' v$1. ')
    .replace(/(['�])N\b/ig, '$1n')
    .replace(/(['�])D\b/ig, '$1d')
    .replace(/(['�])D\b/ig, '$1d')
    .replace(/([’�])D\b/ig, '$1d')
    .replace(/([’�])N\b/ig, '$1n')
    .replace(/(['�])S\b/ig, '$1s')
    .replace(/([’�])S\b/ig, '$1s')
    .replace(/(['�])N\b/ig, '$1n')
    .replace(/([’�])N\b/ig, '$1n')
    .replace(/(['�])Ll\b/ig, '$1ll')
    .replace(/(['�])Ll\b/ig, '$1ll')
    .replace(/([’�])Ll\b/ig, '$1ll')
    .replace(/(['�])L\b/ig, '$1l')
    .replace(/(['�])L\b/ig, '$1l')
    .replace(/([’�])L\b/ig, '$1l')
    .replace(/(['�])T\b/ig, '$1t')
    .replace(/(['�])T\b/ig, '$1t')
    .replace(/([’�])T\b/ig, '$1t')
    .replace(/(['�])Re\b/ig, '$1re')
    .replace(/([’�])Re\b/ig, '$1re')
    .replace(/(['�])R\b/ig, '$1r')
    .replace(/([’�])R\b/ig, '$1r')
    .replace(/(['�])Ve\b/ig, '$1ve')
    .replace(/(['�])M\b/ig, '$1m')
    .replace(/([’�])Ve\b/ig, '$1ve')
    .replace(/([’�])M\b/ig, '$1m')
    .replace(/\(s\)/ig, '(s)')
    .replace(/\(S\)/ig, '(s)')
    .replace(/\(Es\)/ig, '(es)')
    .replace(/\(ES\)/ig, '(es)')
    .replace(/([’�])M\b/ig, '$1m')
    .replace(/\b(AT&T|Q&A)\b/ig, all => all.toUpperCase())
}

module.exports = AP
