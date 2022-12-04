import axios from 'axios'
import { BE_LINK } from './constants'

const fetchTemperaments = async () => {
    const res = await axios(`${BE_LINK}/temperaments`)
    return res.data
}

export default fetchTemperaments