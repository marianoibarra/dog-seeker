const axios = require('axios')
const { Temperament } = require('../db')
const { API_KEY } = process.env
const sortFn = require('./sort')

const storeTemperaments = async () => {
  
  const temperamentsFromAPI = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    .then(r => r.data)
    .then(dogs => {
      let temperaments = dogs
        .filter(dog => dog.temperament !== undefined)
        .map(dog => dog.temperament.split(', '))
        .flat()
        .sort(sortFn) 
      return [...new Set(temperaments)]
    })

  const response = []

  for(let name of temperamentsFromAPI) {
    let [temp] = await Temperament.findOrCreate({
      where: {
        name: name
      }
    })
    response.push(temp)
  }

  return response
} 

module.exports = storeTemperaments