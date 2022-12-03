const { Router } = require('express');

const dogsRouter = require('./routes-dogs')
const temperamentsRouter = require('./routes-temperaments')

const router = Router();

router.use('/dogs', dogsRouter)
router.use('/temperaments', temperamentsRouter)

module.exports = router;
