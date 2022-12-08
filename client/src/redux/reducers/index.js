import {
    FETCH_DOGS_START,
    FETCH_DOGS_SUCCESS,
    FETCH_DOGS_FAILED,
    FETCH_TEMPERAMENTS_START,
    FETCH_TEMPERAMENTS_SUCCESS,
    FETCH_TEMPERAMENTS_FAILED,
    orderOp,
    originOp,
    ORDER_DOGS,
    FILTER_DOGS,
    SET_PAGE,
    SET_TOTAL_PAGE,
    dogsPerPage,
    NEW_DOG
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
    filterByTemperament: [],
    filterByOrigin: originOp[0],
    page: 1,
    totalPages: 1    
}

export default function reducer(state = initialState, action) {

    action.temperament === undefined && (action.temperament = state.filterByTemperament)
    action.origin === undefined && (action.origin = state.filterByOrigin)

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
        case NEW_DOG: {
            return {
                ...state,
                dogs: state.dogs.push(action.payload),
                dogsToDisplay: state.dogsToDisplay.push(action.payload)
            }
        }

        case SET_PAGE: {
            return {
                ...state,
                page: action.payload
            }
        }

        case SET_TOTAL_PAGE: {
            const newTotalPages = Math.ceil(state.dogsToDisplay.length / dogsPerPage)
            return {
                ...state,
                totalPages: newTotalPages,
                page: newTotalPages > 0 && state.page > newTotalPages ? newTotalPages : state.page
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
            
            return {
                ...state,
                filterByTemperament: action.temperament,
                origin: action.origin,
                dogsToDisplay: action.temperament.length === 0 ? state.dogs.filter(dog => action.origin.filter(dog.id)) : state.dogs.filter(dog => {return action.origin.filter(dog.id) && dog.temperament && dog.temperament.some(temp => action.temperament.includes(temp))}),
                page: action.temperament.length > 0 ? 1 : state.page
                
            }
        }
        default: return state
    }
}

    