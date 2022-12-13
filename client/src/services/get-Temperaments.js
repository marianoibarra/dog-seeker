import axios from 'axios'
import { BE_LINK } from './constants'

const getTemperaments_API = async () => {
    const res = await axios(`${BE_LINK}/temperaments`)
    return res.data
}

export default getTemperaments_API