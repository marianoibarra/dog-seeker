const storeTemperaments = require('../utils/storeTemperaments');

const getTemperaments = async (req, res) => {

  try {

    const response = await storeTemperaments()
    res.json(response)
    
  } catch (e) {
    res.status(401).send(e.message)
  }
}

module.exports = getTemperaments