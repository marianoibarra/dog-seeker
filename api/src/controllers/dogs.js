const { Dog, Temperament } = require('../db')
const dogsFromDB = require('../utils/dogsFromDB');
const dogsFromAPI = require('../utils/dogsFromAPI');
const storeTemperaments = require('../utils/storeTemperaments');
const sortFn = require('../utils/sort');

const getDogs = async (req, res) => {

  try {
    
    const { name } = req.query

    const dogsAPI = await dogsFromAPI(name)    
    const dogsDB = await dogsFromDB(name)
    await storeTemperaments()

    const response = 
      [...dogsAPI, ...dogsDB]
        .map(
          dog => { return {
            id: dog.id,
            name: dog.name,
            temperament: dog.temperament,
            image: dog.image,
            weight: dog.weight
        }})
        .sort(sortFn)

    res.json(response)

  } catch (error) {
    res.status(401).send(error.message)
  }
}

const getDogDetails = async (req, res) => {

  try {
    
    let response
    const { id } = req.params
    const regexp_id = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

    if(regexp_id.test(id)) {

      response = await Dog.findByPk(id, {include: {
        model: Temperament,
        as: 'temperament',
        attributes:['name'],
        through: {
          attributes: []
        }
      }}).then(result => result.toJSON())
      
      response.temperament = response.temperament.map(t => t.name)

    } else {
      response = await dogsFromAPI().then(dogs => dogs.find(dog => dog.id == id))
    }

    if(response) {
      res.json(response)
    } else {
      res.status(500).send('not exist a dog with that ID')
    }

  } catch (error) {
    res.status(400).send(error.message)
  }
}

const createDog = async (req, res) => {

  try {
    
    const dog = req.body

    await storeTemperaments()

    if(!dog.name) return res.status(400).send({error: 'Dog name is required'})
    if(!dog.height) return res.status(400).send({error: 'Dog height is required'})
    if(!dog.weight) return res.status(400).send({error: 'Dog weight is required'})

    const newDog = await Dog.create(dog)

    if(Array.isArray(dog.temperament) && dog.temperament.length > 0){
      for(let name of dog.temperament) {
        const temperamentFromDB = await Temperament.findOne({where: { name }})
        await newDog.addTemperament(temperamentFromDB)
      }
    }

    const newDogFromDB = await Dog.findOne({
      where: { id: newDog.id }, 
      include: [{
        model: Temperament,
        as: 'temperament',
        attributes:['name'],
        through: {
            attributes: []
        }
    }]}).then(results => results.toJSON())

    newDogFromDB.temperament = newDogFromDB.temperament.map(t => t.name)

    res.json(newDogFromDB)

  } catch (error) {
    res.status(400).send({error: e.errors[0].message})
  }
}

module.exports = {
  getDogs,
  getDogDetails,
  createDog
}
