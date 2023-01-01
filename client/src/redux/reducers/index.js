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
    orderOp,
    originOp,
    ORDER_DOGS,
    FILTER_DOGS,
    SET_PAGE,
    SET_TOTAL_PAGE,
    dogsPerPage,
    CLEAR_MODAL,
    IMG_LOADED,
    IMG_TO_LOAD
 } from "../constants";

const initialState = {
    dogs: [],
    dogsToDisplay: new Array(8).fill(''),
    temperaments: [],
    dogsIsFetching: false,
    temperamentsIsFetching: false,
    modalDogCreatedSuccess: false,
    modalDogCreatedFailed: false,
    postDogIsFetching: false,
    dogsFetchError: false,
    temperamentsFetchError: false,
    postDogError: false,
    order: orderOp[0],
    filterByTemperament: [],
    filterByOrigin: originOp[0],
    filterBySearch: '',
    page: 1,
    prevPage: 1,
    totalPages: 1,
    imgsStack: false    
}

export default function reducer(state = initialState, action) {

    action.temperament === undefined && (action.temperament = state.filterByTemperament)
    action.origin === undefined && (action.origin = state.filterByOrigin)
    action.search === undefined && (action.search = state.filterBySearch)

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
                dogsToDisplay: action.payload,
                dogs: action.payload,
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
        case POST_DOG_START: {
            return {
                ...state,
                postDogError: false,
                postDogIsFetching: true,
            }
        }
        case POST_DOG_SUCCESS: {
            return {
                ...state,
                dogs: [...state.dogs, action.payload].sort(state.order.sort),
                dogsToDisplay: [...state.dogsToDisplay, action.payload].sort(state.order.sort),
                postDogIsFetching: false,
                modalDogCreatedSuccess: true
            }
        }
        case POST_DOG_FAILED: {
            return {
                ...state,
                postDogError: true,
                postDogIsFetching: false,
                modalDogCreatedFailed: action.error
            }
        }
        case SET_PAGE: {
            return {
                ...state,
                imgsStack: action.payload !== state.page ? false : state.imgsStack,
                prevPage: state.page,
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
                prevPage: state.page,
                imgsStack: 0,
                dogsToDisplay: state.dogsToDisplay.slice().sort(action.payload.sort),
                dogs: state.dogs.slice().sort(action.payload.sort),
                order: orderOp[action.payload.id]
            }
        }
        case FILTER_DOGS: {
            return {
                ...state,
                prevPage: state.page,
                imgsStack: 0,
                filterByTemperament: action.temperament,
                filterByOrigin: action.origin,
                filterBySearch: action.search,
                page: action.temperament.length > 0 ? 1 : state.page, 
                dogsToDisplay: action.temperament.length === 0 
                                    ? state.dogs
                                        .filter(dog => 
                                            action.origin.filter(dog.id) 
                                            && dog.name.toLowerCase().split(' ').some(word => word.startsWith(action.search)))
                                    : state.dogs
                                        .filter(dog => 
                                            action.origin.filter(dog.id) 
                                            && dog.name.toLowerCase().split(' ').some(word => word.startsWith(action.search))
                                            && dog.temperament 
                                            && dog.temperament.some(tempOfDog => action.temperament.includes(tempOfDog)))
            }
        }
        case CLEAR_MODAL: {
            return {
                ...state,
                modalDogCreatedFailed: false,
                modalDogCreatedSuccess: false
            }
        }
        case IMG_TO_LOAD: {
            return {
                ...state,
                imgsStack: state.imgsStack + 1
            }
        }
        case IMG_LOADED: {
            return {
                ...state,
                imgsStack: state.imgsStack -1
            }
        }
        default: return state
    }
}

    