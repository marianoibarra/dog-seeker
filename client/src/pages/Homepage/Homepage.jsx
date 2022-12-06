import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getDogs, getTemperaments} from '../../redux/actions'
import styles from './Homepage.module.css'
import DogCard from "../../components/DogCard/DogCard"
import Paginate from "../../components/Paginate/Paginate"
import OrderAndFilter from "../../components/OrderAndFilter/OrderAndFilter"


const Homepage = () => {

    const dispatch = useDispatch()
    const dogs = useSelector(state => state.dogsToDisplay)
    const dogsIsFetching = useSelector(state => state.dogsIsFetching)
    const [page, setPage] = useState(1)
    const [pageLength, setPageLength] = useState(1)
    const dogsPerPage = 8

    useEffect(() => {
        setPageLength(Math.ceil(dogs.length / dogsPerPage))
    }, [dogs])

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [])


    return (
        <main className={styles.main}>
            <section className={styles.filters}>
                <OrderAndFilter />
            </section>
            <section className={styles.cardsContainer}>
                {dogs && dogs.slice(dogsPerPage * (page - 1), dogsPerPage * page).map((dog, key) => (
                    <DogCard loading={dogsIsFetching} dog={dog} key={key} />
                ))}
            </section>
            <section className={styles.paginate}>
                <Paginate page={page} setPage={setPage} pageLength={pageLength} />
            </section>
        </main>
    )
}

export default Homepage