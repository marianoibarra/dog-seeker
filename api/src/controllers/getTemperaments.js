const { API_KEY } = process.env
const axios = require('axios');
const { Temperament } = require('../db')

const getTemperaments = async () => {

    let response = []

    const temperaments = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
        .then(r => r.data)
        .then(dogs => {
            let temperaments = dogs.filter(dog => dog.temperament !== undefined).map(dog => dog.temperament.split(', ')).flat().sort() 
            return [...new Set(temperaments)]
        })

    for(let name of temperaments) {
        let load = await Temperament.create({ name })
        response.push(load)
    }

    return response
}

module.exports = getTemperaments