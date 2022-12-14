const router = require('express').Router();
const addDog = require('../controllers/addDog');
const getDogDetails = require('../controllers/getDogDetails');
const getDogs = require('../controllers/getDogs');


router.get('/', (req, res) => {

    try {
        const { name } = req.query
        getDogs(name).then(r => res.json(r))
    } catch (e) {
        res.status(401).send(e.message)
    }   

})

router.get('/:id', (req, res) => {

    const { id } = req.params
    getDogDetails(id)
        .then(r => res.json(r))
        .catch(e => res.status(401).send(e.message))

})

router.post('/', (req, res) => {

        const dog = req.body
        addDog(dog)
            .then(r => res.json(r))
            .catch(e => res.status(501).send(e.message))


})

module.exports = router;
