const router = require('express').Router();
const { Temperament } = require('../db')
const getTemperaments = require('../controllers/getTemperaments')

router.get('/', async (req, res) => {

    try {

        let temperamentDB = await Temperament.findAll()
        if(temperamentDB.length === 0) getTemperaments().then(r => res.json(r));
        else res.json(temperamentDB)

    } catch (e) {
        res.status(401).send(e.message)
    }

})

module.exports = router;
