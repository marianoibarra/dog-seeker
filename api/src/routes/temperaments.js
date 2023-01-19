const router = require('express').Router();
const getTemperaments = require('../controllers/temperaments')

router.get('/', getTemperaments)

module.exports = router;