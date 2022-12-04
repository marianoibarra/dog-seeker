import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {getDogs, getTemperaments} from '../../redux/actions'


const Homepage = () => {

    const dispatch = useDispatch()
    const dogs = useSelector(state => state.dogs)
    const temperaments = useSelector(state => state.temperaments)
    const [page, setPage] = useState(1)
    const dogsPerPage = 8

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {dogs && dogs.slice(dogsPerPage * (page - 1), dogsPerPage * page).map(dog => (<Link to={`/details/${dog.id}`} key={dog.id}>{dog.name}</Link>))}
            <div>
                <button onClick={() => setPage(page - 1)}>&lt;</button>
                <div>{page}</div>
                <button onClick={() => setPage(page + 1)}>&gt;</button>
            </div>
        </div>
    )
}

export default Homepage