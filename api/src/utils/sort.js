const sortFn = function(a, b) {
  let nameA = typeof a === 'object' ? a.name.toLowerCase() : a.toLowerCase()
  let nameB = typeof b === 'object' ? b.name.toLowerCase() : b.toLowerCase()
  if(nameA > nameB) return 1
  if(nameA < nameB) return -1
  return 0
}

module.exports = sortFn