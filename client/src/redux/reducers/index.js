import {
    FETCH_DOGS_START,
    FETCH_DOGS_SUCCESS,
    FETCH_DOGS_FAILED,
    FETCH_TEMPERAMENTS_START,
    FETCH_TEMPERAMENTS_SUCCESS,
    FETCH_TEMPERAMENTS_FAILED
 } from "../constants";

const initialState = {
    dogs: [],
    temperaments: [],
    dogsIsFetching: false,
    temperamentsIsFetching: false,
    dogsFetchError: false,
    temperamentsFetchError: false
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
                dogsIsFetching: false
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
        default: return state
    }
}

    