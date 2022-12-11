import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {getDogs, getTemperaments, setTotalPages} from '../../redux/actions'
import styles from './Homepage.module.css'
import DogCard from "../../components/DogCard/DogCard"
import Paginate from "../../components/Paginate/Paginate"
import OrderAndFilter from "../../components/OrderAndFilter/OrderAndFilter"
import { dogsPerPage } from '../../redux/constants/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons"


const Homepage = () => {

    const dispatch = useDispatch()
    const dogs = useSelector(state => state.dogsToDisplay)
    const dogsIsFetching = useSelector(state => state.dogsIsFetching)
    const page = useSelector(state => state.page)
 
    useEffect(() => {
        if(dogs.length === 0) {
            dispatch(getDogs())
            dispatch(getTemperaments())
        }
    }, [])

    useEffect(() => {
        dispatch(setTotalPages())
    }, [dogs])


    return (
        <main className={styles.main}>
            <section className={styles.filters}>
                <OrderAndFilter />
            </section>
            <section className={styles.cardsContainer}>
                {!dogsIsFetching
                    ?   dogs.length > 0
                            ?   dogs.slice(dogsPerPage * (page - 1), dogsPerPage * page)
                                    .map((dog, key) => (
                                        <DogCard dog={dog} key={key} />
                                    ))
                            :   <div className={styles.notFoundWrapper}>
                                    <FontAwesomeIcon icon={faHeartBroken} size='6x' />
                                    <h4>No results found</h4>
                                    <p>Please try with anothers keywords or filters</p>
                                </div>
                    : new Array(8).fill('').map((e, key) => <DogCard key={key} />)
                }
            </section>
            <section className={styles.paginate}>
                <Paginate />
            </section>
        </main>
    )
}

export default Homepage