export const FETCH_DOGS_START = 'FETCH_DOGS_START'
export const FETCH_DOGS_SUCCESS = 'FETCH_DOGS_SUCCESS'
export const FETCH_DOGS_FAILED = 'FETCH_DOGS_FAILED'
export const FETCH_TEMPERAMENTS_START = 'FETCH_TEMPERAMENTS_START'
export const FETCH_TEMPERAMENTS_SUCCESS = 'FETCH_TEMPERAMENTS_SUCCESS'
export const FETCH_TEMPERAMENTS_FAILED = 'FETCH_TEMPERAMENTS_FAILED'
export const ORDER_DOGS = 'ORDER_DOGS'
export const FILTER_DOGS = 'FILTER_DOGS'
export const SET_PAGE = 'SET_PAGE'
export const SET_TOTAL_PAGE = 'SET_TOTAL_PAGE'
export const NEW_DOG = 'NEW_DOG'


export const dogsPerPage = 8

const regex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

const sortNameAsc = function(a, b) {
        let nameA = a.name.toLowerCase()
        let nameB = b.name.toLowerCase()
        if(nameA > nameB) return 1
        if(nameA < nameB) return -1
        return 0
    }
const sortNameDesc = function(a, b) {
        let nameA = a.name.toLowerCase()
        let nameB = b.name.toLowerCase()
        if(nameA < nameB) return 1
        if(nameA > nameB) return -1
        return 0
    }
const sortWeightAsc = function(a, b) {
        let weightA = a.weight.split(' - ')
        let weightB = b.weight.split(' - ')
        if(weightA[0] > weightB[0]) return 1
        if(weightA[0] < weightB[0]) return -1
        if(weightA[1] > weightB[1]) return 1
        if(weightA[1] < weightB[1]) return -1
        return 0
    }
const sortWeightDesc = function(a, b) {
        let weightA = a.weight.split(' - ').map(w => Number(w))
        let weightB = b.weight.split(' - ').map(w => Number(w))
        if(weightA[0] < weightB[0]) return 1
        if(weightA[0] > weightB[0]) return -1
        if(weightA[1] < weightB[1]) return 1
        if(weightA[1] > weightB[1]) return -1
        return 0
    }

const filterOriginAPI = (id) => {
    return regex.test(id)
}

const filterOriginUsers = (id) => {
    return !regex.test(id)
}


export const orderOp = [
    {
        id: 0,
        name: 'Name (A - Z)',
        sort: sortNameAsc
    },
    {
        id: 1,
        name: 'Name (Z - A)',
        sort: sortNameDesc
    },
    {
        id: 2,
        name: 'Weight (Low to high)',
        sort: sortWeightAsc
    },
    {
        id: 3,
        name: 'Weight (High to lw)',
        sort: sortWeightDesc
    }
]

export const originOp = [
    {
        id: 0,
        name: 'All dogs breed',
        filter: () => true
    },
    {
        id: 1,
        name: 'Created by API',
        filter: filterOriginAPI
    },
    {
        id: 2,
        name: 'Created by Users',
        filter: filterOriginUsers
    }
]