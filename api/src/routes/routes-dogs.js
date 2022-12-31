const router = require('express').Router();
const addDog = require('../controllers/addDog');
const getDogDetails = require('../controllers/getDogDetails');
const getDogs = require('../controllers/getDogs');


router.get('/', (req, res) => {

  const { name } = req.query
  getDogs(name)
    .then(r => res.json(r))
    .catch(e => res.status(401).send(e.message))

})

router.get('/:id', (req, res) => {

  const { id } = req.params
  getDogDetails(id)
      .then(r => res.json(r))
      .catch(e => res.status(400).send({error: e.message}))

})

router.post('/', (req, res) => {

  const dog = req.body

  if(!dog.name) return res.status(400).send({error: 'Dog name is required'})
  if(!dog.height) return res.status(400).send({error: 'Dog height is required'})
  if(!dog.weight) return res.status(400).send({error: 'Dog weight is required'})


    addDog(dog)
    .then(r => res.json(r))
    .catch(e => {
      res.status(400).send({error: e.errors[0].message})
    })


})

module.exports = router;
