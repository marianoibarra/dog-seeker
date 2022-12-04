import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getDogs, getTemperaments} from '../../redux/actions'
import styles from './Homepage.module.css'
import DogCard from "../../components/DogCard/DogCard"


const Homepage = () => {

    const dispatch = useDispatch()
    const dogs = useSelector(state => state.dogs)
    const temperaments = useSelector(state => state.temperaments)
    const dogsIsFetching = useSelector(state => state.dogsIsFetching)
    const [page, setPage] = useState(1)
    const dogsPerPage = 8

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [])

    return (
        <main className={styles.main}>
            <section className={styles.filters}>

            </section>
            <section className={styles.cardsContainer}>
                {dogs && dogs.slice(dogsPerPage * (page - 1), dogsPerPage * page).map((dog, key) => (
                    <DogCard loading={dogsIsFetching} dog={dog} key={key} />
                ))}

            </section>
            <section className={styles.paginator}>
                    <button onClick={() => setPage(page - 1)}>&lt;</button>
                    <div className={styles.page}>{page}</div>
                    <button onClick={() => setPage(page + 1)}>&gt;</button>
            </section>
        </main>
    )
}

export default Homepage