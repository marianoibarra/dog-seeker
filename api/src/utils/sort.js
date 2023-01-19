const sortFn = function(a, b) {
  let nameA = a.toLowerCase()
  let nameB = b.toLowerCase()
  if(nameA > nameB) return 1
  if(nameA < nameB) return -1
  return 0
}

module.exports = sortFn