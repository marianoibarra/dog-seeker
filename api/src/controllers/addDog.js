const { Dog, Temperament } = require('../db')
const getTemperaments = require('./getTemperaments')

const addDog = async (dog) => {

    const {name, height, weight, life_span, temperament} = dog

    const valName = name && typeof name === 'string'
    const valHeight = height && typeof height === 'string'
    const valWeight = weight && typeof weight === 'string'
    const valLifeSpan = !life_span || life_span && typeof life_span === 'string'
    const valTemperament = Array.isArray(temperament)

    if(valName && valHeight && valWeight && valLifeSpan && valTemperament) {

        await getTemperaments()

        const {id} = await Dog.create({ 
            name,
            height,
            weight,
            life_span,
            temperaments: temperament.map(t => {return {name: t}})
            
        },{
            include: [ Temperament ]
        })
        return id
    } else {
        throw new Error('Invalid values')
    }
}

module.exports = addDog