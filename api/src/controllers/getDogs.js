const { API_KEY } = process.env
const axios = require('axios');
const { Dog, Temperament } = require('../db')
const { Op } = require("sequelize");

const getDogs = async (name = null, onlyAPI) => {

    const dogsFromAPI = await axios(`https://api.thedogapi.com/v1/breeds${name ? `/search?q=${name}&` : '?'}api_key=${API_KEY}`)
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
    
    const dogsFromDB = await Dog.findAll({
        where: 
            name && {name: {[Op.substring]: name}},
        include: [{
            model: Temperament,
            as: 'temperament',
            attributes:['name'],
            through: {
              attributes: []
            }
        }]}).then(results => results.map(result => result.toJSON()))

    dogsFromDB.forEach(dog => {dog.temperament = dog.temperament.map(t => t.name)})

    return onlyAPI
        ? dogsFromAPI
        : [...dogsFromAPI, ...dogsFromDB]
            .map(
                dog => { return {
                    id: dog.id,
                    name: dog.name,
                    temperament: dog.temperament,
                    image: dog.image,
                    weight: dog.weight
                }}
            ).sort(function(a, b) {
                let nameA = a.name.toLowerCase()
                let nameB = b.name.toLowerCase()
                if(nameA > nameB) return 1
                if(nameA < nameB) return -1
                return 0
            })
}

module.exports = getDogs