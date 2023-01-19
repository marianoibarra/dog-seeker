const router = require('express').Router();
const { getDogs, getDogDetails, createDog } = require('../controllers/dogs')


router.get('/', getDogs)

router.get('/:id', getDogDetails)

router.post('/', createDog)


module.exports = router;
