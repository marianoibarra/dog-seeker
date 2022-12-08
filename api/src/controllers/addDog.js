const { Dog, Temperament } = require('../db')
const getTemperaments = require('./getTemperaments')

const addDog = async (dog) => {

    const {name, height, weight, life_span, temperament, image} = dog

    const valName = name && typeof name === 'string'
    const valHeight = height && typeof height === 'string'
    const valWeight = weight && typeof weight === 'string'
    const valLifeSpan = !life_span || life_span && typeof life_span === 'string'
    const valTemperament = Array.isArray(temperament) && temperament.length > 0

    if(valName && valHeight && valWeight && valLifeSpan) {

        await getTemperaments()

        const newDog = await Dog.create({ 
            name,
            height,
            weight,
            life_span,
            image
        })

        if(valTemperament) {
            for(let name of temperament) {
                const temperamentFromDB = await Temperament.findOne({where: { name }})
                newDog.addTemperament(temperamentFromDB)
            }
        }
         
        return newDog
    } else {
        throw new Error('Invalid values')
    }
}

module.exports = addDog