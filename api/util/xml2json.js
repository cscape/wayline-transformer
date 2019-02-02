const XMLParser = require('fast-xml-parser')

/**
 * XML to JSON transformer
 * @param {string} xmlString Raw XML document/string in plaintext
 * @returns {{}} JSON object
 */
const transform = xmlString => {
  const xmlObj = XMLParser.getTraversalObj(xmlString)
  const jsonData = XMLParser.convertToJson(xmlObj)
  return jsonData
}

module.exports = transform
