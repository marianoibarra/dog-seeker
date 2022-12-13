import axios from 'axios'
import { BE_LINK } from './constants'

const postDog_API = (data) => {
    return axios({
        method: 'POST',
        url: `${BE_LINK}/dogs`,
        data
    })
}

export default postDog_API