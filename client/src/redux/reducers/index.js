import {
    FETCH_DOGS_START,
    FETCH_DOGS_SUCCESS,
    FETCH_DOGS_FAILED,
    FETCH_TEMPERAMENTS_START,
    FETCH_TEMPERAMENTS_SUCCESS,
    FETCH_TEMPERAMENTS_FAILED,
    orderOp,
    ORDER_DOGS,
    FILTER_DOGS,
    SET_PAGE,
    SET_TOTAL_PAGE,
    dogsPerPage
 } from "../constants";

const initialState = {
    dogs: [],
    dogsToDisplay: [],
    temperaments: [],
    dogsIsFetching: false,
    temperamentsIsFetching: false,
    dogsFetchError: false,
    temperamentsFetchError: false,
    order: 0,
    temperamentFilter: [],
    page: 1,
    totalPages: 1    
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case FETCH_DOGS_START: {
            return {
                ...state,
                dogsFetchError: false,
                dogsIsFetching: true
            }
        }
        case FETCH_DOGS_SUCCESS: {
            return {
                ...state,
                dogs: action.payload,
                dogsToDisplay: action.payload,
                dogsIsFetching: false,
                totalPages: Math.ceil(action.payload.length / dogsPerPage)
            }
        }
        case FETCH_DOGS_FAILED: {
            return {
                ...state,
                dogsFetchError: true,
                dogsIsFetching: false
            }
        }
        case FETCH_TEMPERAMENTS_START: {
            return {
                ...state,
                temperamentsFetchError: false,
                temperamentsIsFetching: true
            }
        }
        case FETCH_TEMPERAMENTS_SUCCESS: {
            return {
                ...state,
                temperaments: action.payload,
                temperamentsIsFetching: false
            }
        }
        case FETCH_TEMPERAMENTS_FAILED: {
            return {
                ...state,
                temperamentsFetchError: true,
                temperamentsIsFetching: false
            }
        }

        case SET_PAGE: {
            return {
                ...state,
                page: action.payload
            }
        }

        case SET_TOTAL_PAGE: {
            return {
                ...state,
                totalPages: Math.ceil(state.dogsToDisplay.length / dogsPerPage)
            }
        }

        case ORDER_DOGS: {
            return {
                ...state,
                dogsToDisplay: state.dogsToDisplay.slice().sort(action.payload.sort),
                dogs: state.dogsToDisplay.slice().sort(action.payload.sort),
                order: orderOp[action.payload.id].id
            }
        }
        case FILTER_DOGS: {
            console.log(action)
            return {
                ...state,
                temperamentFilter: action.temperament,
                dogsToDisplay: action.temperament.length === 0 ? state.dogs.filter(dog => action.origin.filter(dog.id)) : state.dogs.filter(dog => {return action.origin.filter(dog.id) && dog.temperament && dog.temperament.some(temp => action.temperament.includes(temp))})
            }
        }
        default: return state
    }
}

    