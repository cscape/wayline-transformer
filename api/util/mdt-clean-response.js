const cleanifyJSON = (parentName, siblingName, jsonObj) => {
  const parent = jsonObj[parentName]
  const noRecords = parent[siblingName] == null ||
    parent === '' ||
    typeof parent === 'string' ||
    typeof parent[siblingName] !== 'object'

  // No records
  if (noRecords) return []

  let arr = []
  if (!Array.isArray(parent[siblingName])) arr.push(parent[siblingName])
  else arr = parent[siblingName]

  return arr
}

module.exports = cleanifyJSON
