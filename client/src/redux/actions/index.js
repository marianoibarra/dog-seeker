import fetchDogs from "../../services/fetchDogs";
import fetchTemperaments from "../../services/fetchTemperaments";
import {
    FETCH_DOGS_START,
    FETCH_DOGS_SUCCESS,
    FETCH_DOGS_FAILED,
    FETCH_TEMPERAMENTS_START,
    FETCH_TEMPERAMENTS_SUCCESS,
    FETCH_TEMPERAMENTS_FAILED,
    ORDER_DOGS,
    FILTER_DOGS,
    SET_PAGE,
    SET_TOTAL_PAGE,
    NEW_DOG,
    SEARCH_DOGS
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

const fetchFailed = (type) => {
    return {
        type
    }
}

export const getDogs = () => {
    return (dispatch) => {
        dispatch(fetchStart(FETCH_DOGS_START))
        fetchDogs()
            .then(dogs => dispatch(fetchSuccess(FETCH_DOGS_SUCCESS, dogs)))
            .catch(e => dispatch(fetchFailed(FETCH_DOGS_FAILED)))
    }
}

export const getTemperaments = () => {
    return (dispatch) => {
        dispatch(fetchStart(FETCH_TEMPERAMENTS_START))
        fetchTemperaments()
            .then(temperaments => dispatch(fetchSuccess(FETCH_TEMPERAMENTS_SUCCESS, temperaments)))
            .catch(e => dispatch(fetchFailed(FETCH_TEMPERAMENTS_FAILED)))
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

export const newDog = (payload) => {
    return {
        type: NEW_DOG,
        payload
    }
}
