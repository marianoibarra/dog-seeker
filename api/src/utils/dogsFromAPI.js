const axios = require('axios')
const { API_KEY } = process.env

const dogsFromAPI = async (name = null) => {
  
  const dogs = await axios(`https://api.thedogapi.com/v1/breeds${name ? `/search?q=${name}&` : '?'}api_key=${API_KEY}`)
  .then(response => response.data)
  .then(dogs => dogs.map(dog => {return {
      id: dog.id,
      name: dog.name,
      weight: dog.weight.metric,
      height: dog.height.metric,
      temperament: dog.temperament ? dog.temperament.split(', ').flat().sort() : undefined,
      life_span: dog.life_span,
      image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
  }}))

  return dogs
}

module.exports = dogsFromAPI