const { Dog, Temperament } = require('../db')
const { Op } = require("sequelize");

const dogsFromDB = async (name = null) => {
  
  const dogs = await Dog.findAll({
    where: 
      name && {name: {[Op.iLike]: `%${name}%`}},
    include: [{
      model: Temperament,
      as: 'temperament',
      attributes:['name'],
      through: {
        attributes: []
      }
    }]
  }).then(results => results.map(result => result.toJSON()))

  dogs.forEach(dog => {dog.temperament = dog.temperament.map(t => t.name)})

  return dogs;
}

module.exports = dogsFromDB