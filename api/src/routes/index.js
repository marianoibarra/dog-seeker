const { Router } = require('express');

const dogs_route = require('./dogs')
const temperaments_route = require('./temperaments')

const router = Router();

router.use('/dogs', dogs_route)
router.use('/temperaments', temperaments_route)

module.exports = router;
