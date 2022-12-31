const router = require('express').Router();
const getTemperaments = require('../controllers/getTemperaments')

router.get('/', async (req, res) => {

  getTemperaments()
    .then(r => res.json(r))
    .catch(e => res.status(401).send(e.message))

})

module.exports = router;
