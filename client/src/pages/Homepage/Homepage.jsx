import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {endLoading, getDogs, getTemperaments, setTotalPages} from '../../redux/actions'
import styles from './Homepage.module.css'
import DogCard from "../../components/DogCard/DogCard"
import Paginate from "../../components/Paginate/Paginate"
import OrderAndFilter from "../../components/OrderAndFilter/OrderAndFilter"
import { dogsPerPage } from '../../redux/constants/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons"
import { useLocation } from "react-router-dom"
import { useRef } from "react"
import DocumentTitle from 'react-document-title'

const Homepage = () => {

    const dispatch = useDispatch()
    const dogs = useSelector(state => state.dogs)
    const dogsToDisplay = useSelector(state => state.dogsToDisplay)
    const dogsIsFetching = useSelector(state => state.dogsIsFetching)
    const page = useSelector(state => state.page)
    const location = useLocation()
    const backFromRoutes = location.state && location.state.backFromRoutes === true ? true : false
    const refCardsContainer = useRef()
    const [imgLoaded, setImgLoaded] = useState([])
 
    useEffect(() => {
        if(dogsToDisplay.length === 0) {
            dispatch(getDogs())
            dispatch(getTemperaments())
        }
    }, [])

    useEffect(() => {
        dispatch(setTotalPages())
    }, [dogsToDisplay])

    useEffect(() => {
        let amount = dogsToDisplay.slice(dogsPerPage * (page - 1), dogsPerPage * page).length
        setImgLoaded(new Array(amount).fill(false))
        refCardsContainer.current.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
    }, [page])

    useEffect(() => {
        if(imgLoaded.every(e => e===true)) dispatch(endLoading());
    }, [imgLoaded])

    const imgLoadComplete = (index) => {
        const nextImgLoaded = imgLoaded.map((e,i) => {
            if(i === index) return true;
            else return e
        })
        setImgLoaded(nextImgLoaded)
    }


    return (
        <DocumentTitle title={`PI-Dogs`} >
            <main className={styles.main}>
                <section className={styles.filters}>
                    <OrderAndFilter />
                </section>
                <section ref={refCardsContainer} className={styles.cardsContainer}>
                    {dogs.length > 0
                        ?   dogsToDisplay.length > 0
                                ?   dogsToDisplay.slice(dogsPerPage * (page - 1), dogsPerPage * page)
                                        .map((dog, i) => {
                                            return (
                                            <DogCard dog={dog} imgLoadComplete={imgLoadComplete} index={i} key={dog.id} />
                                        )})
                                :   <div className={styles.notFoundWrapper}>
                                        <FontAwesomeIcon icon={faHeartBroken} size='6x' />
                                        <h4>No results found</h4>
                                        <p>Please try with anothers keywords or filters</p>
                                    </div>
                        : new Array(8).fill('').map((e, key) => <DogCard key={key} />)
                    }
                </section>
                <section style={backFromRoutes ? {animation: 'none'} : {}} className={styles.paginate}>
                    <Paginate />
                </section>
            </main>
        </DocumentTitle>
    )
}

export default Homepage