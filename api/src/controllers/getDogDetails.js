const { Dog, Temperament } = require('../db')
const getDogs = require('./getDogs');

const getDogDetails = async (id) => {

    const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

    if(regex.test(id)) {
        console.log(id)
        const dogFromDB = await Dog.findByPk(id, {include: {
            model: Temperament,
            as: 'temperament',
            attributes:['name'],
            through: {
              attributes: []
            }
          }}).then(result => result.toJSON())
          
        dogFromDB.temperament = dogFromDB.temperament.map(t => t.name)

        return dogFromDB;
    } else {
        const dogFromAPI = await getDogs(null, true).then(dogs => dogs.find(dog => dog.id == id))
        if(dogFromAPI) return dogFromAPI
    }

    throw new Error('no dog breeds found with that id')
}

module.exports = getDogDetails