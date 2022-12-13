import axios from 'axios'
import { BE_LINK } from './constants'

const getDogs_API = async (id = '') => {
    const res = await axios(`${BE_LINK}/dogs/${id}`)
    return res.data
}

export default getDogs_API