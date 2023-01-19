import getDogs_API from "../../services/get-Dogs";
import getTemperaments_API from "../../services/get-Temperaments";
import postDog_API from '../../services/post-Dogs'
import {
    FETCH_DOGS_START,
    FETCH_DOGS_SUCCESS,
    FETCH_DOGS_FAILED,
    FETCH_TEMPERAMENTS_START,
    FETCH_TEMPERAMENTS_SUCCESS,
    FETCH_TEMPERAMENTS_FAILED,
    POST_DOG_START,
    POST_DOG_SUCCESS,
    POST_DOG_FAILED,
    ORDER_DOGS,
    FILTER_DOGS,
    SET_PAGE,
    SET_TOTAL_PAGE,
    CLEAR_MODAL,
    IMG_LOADED,
    IMG_TO_LOAD
 } from "../constants";

const fetchStart = (type) => {
    return {
        type
    }
}

const fetchSuccess = (type, payload) => {
    return {
        type,
        payload
    }
}

const fetchFailed = (type, error) => {
    return {
        type,
        error
    }
}

export const getDogs = () => {
    return (dispatch) => {
        dispatch(fetchStart(FETCH_DOGS_START))
        getDogs_API()
            .then(dogs => dispatch(fetchSuccess(FETCH_DOGS_SUCCESS, dogs)))
            .catch(e => dispatch(fetchFailed(FETCH_DOGS_FAILED, e)))
    }
}

export const getTemperaments = () => {
    return (dispatch) => {
        dispatch(fetchStart(FETCH_TEMPERAMENTS_START))
        getTemperaments_API()
            .then(temperaments => dispatch(fetchSuccess(FETCH_TEMPERAMENTS_SUCCESS, temperaments)))
            .catch(e => dispatch(fetchFailed(FETCH_TEMPERAMENTS_FAILED, e)))
    }
}

export const orderDogs = (payload) => {
    return {
        type: ORDER_DOGS,
        payload
    }
}

export const setPage = (payload) => {
    return {
        type: SET_PAGE,
        payload
    }
}

export const setTotalPages = () => {
    return {
        type: SET_TOTAL_PAGE,
    }
}

export const filterDogs = (temperament, origin, search) => {
    return {
        type: FILTER_DOGS,
        temperament,
        origin,
        search
    }
}

export const clearModal = () => {
    return {
        type: CLEAR_MODAL,
    }
}

export const imgToLoad = () => {
    return {
        type: IMG_TO_LOAD,
    }
}

export const imgLoaded = () => {
    return {
        type: IMG_LOADED,
    }
}

export const postDog = (data) => {
    return (dispatch) => {
        dispatch(fetchStart(POST_DOG_START))
        postDog_API(data)
            .then(res => {
                dispatch(fetchSuccess(POST_DOG_SUCCESS, res.data)); 
                dispatch(filterDogs())
            })
            .catch(e => {console.log(e);dispatch(fetchFailed(POST_DOG_FAILED, e.response.data.error))})
    }
}