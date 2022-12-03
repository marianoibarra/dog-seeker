const { API_KEY } = process.env
const axios = require('axios');
const { Dog } = require('../db')
const { Op } = require("sequelize");

const getDogs = async (name = null, onlyAPI) => {

    

    const dogsFromAPI = await axios(`https://api.thedogapi.com/v1/breeds${name ? `/search?q=${name}&` : '?'}api_key=${API_KEY}`)
        .then(r => r.data)
        .then(dogs => dogs.map(dog => {return {
            id: dog.id,
            name: dog.name,
            weight: dog.weight.metric,
            height: dog.height.metric,
            temperament: dog.temperament ? dog.temperament.split(', ').flat() : undefined,
            life_span: dog.life_span,
            image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
        }}))
    
    const dogsFromDB = await Dog.findAll({where: name && {name: {[Op.substring]: name}}})

    return onlyAPI
        ? dogsFromAPI
        : [...dogsFromAPI, ...dogsFromDB]
            .map(
                dog => { return {
                    id: dog.id,
                    name: dog.name,
                    temperament: dog.temperament,
                    image: dog.image
                }}
            )
}

module.exports = getDogs