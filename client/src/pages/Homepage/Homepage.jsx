import { useState, useEffect, useRef } from "react"
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
    const [pageLength, setPageLength] = useState(1)
    const dogsPerPage = 8
    
    const numbersRef = useRef([])
    const prevRef = useRef()
    const nextRef = useRef()

    useEffect(() => {

        if(dogs.length > 0 && pageLength > 1) {

            if(pageLength > 7) {
                
                numbersRef.current.forEach(ref => {
                    ref.style.display = 'inline'
                })

                if(page >= 5) {
                    numbersRef.current[1].className = styles.dots
                    numbersRef.current[1].innerHTML = '•••'
                } else {
                    numbersRef.current[1].className = styles.number
                    numbersRef.current[1].innerHTML = 2
                }

                if(page <= pageLength - 4) {
                    numbersRef.current[5].className = styles.dots
                    numbersRef.current[5].innerHTML = '•••'
                } else {
                    numbersRef.current[5].className = styles.number
                    numbersRef.current[5].innerHTML = pageLength - 1
                }

                if(page >= 5 && page <= pageLength - 4) {
                    numbersRef.current[2].innerHTML = page - 1
                    numbersRef.current[3].innerHTML = page
                    numbersRef.current[4].innerHTML = page + 1
                } else if(page >= 5) {
                    numbersRef.current[2].innerHTML = pageLength - 4
                    numbersRef.current[3].innerHTML = pageLength - 3
                    numbersRef.current[4].innerHTML = pageLength - 2
                } else if(page <= pageLength - 4){
                    numbersRef.current[2].innerHTML = 3
                    numbersRef.current[3].innerHTML = 4
                    numbersRef.current[4].innerHTML = 5
                } 
            } else if(pageLength > 0) {
                numbersRef.current.forEach(ref => {
                    if(ref.innerHTML > pageLength) ref.style.display = 'none';
                    else ref.style.display = 'inline';
                })
            }

            if(page == 1) {
                prevRef.current.className = styles.navbtnDisable
            } else {
                prevRef.current.className = styles.navbtn
            }

            if(page == pageLength) {
                nextRef.current.className = styles.navbtnDisable
            } else {
                nextRef.current.className = styles.navbtn
            }

            numbersRef.current.forEach(ref => {
                if(ref.className !== styles.dots) {
                    if(ref.innerHTML == page) {
                        ref.className = styles.active
                    } else {
                        ref.className = styles.number
                    }
                }
            })

        }
    }, [dogs, page])
   

    useEffect(() => {
        dispatch(getDogs())
        dispatch(getTemperaments())
    }, [])

    useEffect(() => {
        setPageLength(Math.ceil(dogs.length / dogsPerPage))
    }, [dogs])


    return (
        <main className={styles.main}>
            <section className={styles.filters}>

            </section>
            <section className={styles.cardsContainer}>
                {dogs && dogs.slice(dogsPerPage * (page - 1), dogsPerPage * page).map((dog, key) => (
                    <DogCard loading={dogsIsFetching} dog={dog} key={key} />
                ))}
            </section>
            {pageLength > 1 ? <section className={styles.paginate}>
                <ul>
                    <li key={0} ref={prevRef} className={styles.navbtn} onClick={() => page !== 1 && setPage(Number(page - 1))}>prev</li>
                    <li key={1} ref={el => numbersRef.current[0] = el} onClick={(e) => e.target.innerHTML !== '•••' && setPage(Number(e.target.innerHTML))} className={styles.active}>1</li>
                    <li key={2} ref={el => numbersRef.current[1] = el} onClick={(e) => e.target.innerHTML !== '•••' && setPage(Number(e.target.innerHTML))}>2</li>
                    <li key={3} ref={el => numbersRef.current[2] = el} onClick={(e) => e.target.innerHTML !== '•••' && setPage(Number(e.target.innerHTML))}>3</li>
                    <li key={4} ref={el => numbersRef.current[3] = el} onClick={(e) => e.target.innerHTML !== '•••' && setPage(Number(e.target.innerHTML))}>4</li>
                    <li key={5} ref={el => numbersRef.current[4] = el} onClick={(e) => e.target.innerHTML !== '•••' && setPage(Number(e.target.innerHTML))}>5</li>
                    <li key={6} ref={el => numbersRef.current[5] = el} onClick={(e) => e.target.innerHTML !== '•••' && setPage(Number(e.target.innerHTML))}>6</li>
                    <li key={7} ref={el => numbersRef.current[6] = el} onClick={(e) => e.target.innerHTML !== '•••' && setPage(Number(e.target.innerHTML))}>{pageLength > 7 ? pageLength : 7}</li>
                    <li key={8} ref={nextRef} className={styles.navbtn} onClick={() => page !== pageLength && setPage(Number(page + 1))}>next</li>
                </ul>
            </section>
            :
            <section className={styles.paginate}>
                <ul>
                    <li key={0} className={styles.navbtnDisable}>prev</li>
                    <li key={1} className={styles.active} style={{cursor: 'default'}}>1</li>
                    <li key={2} className={styles.navbtnDisable}>next</li>
                </ul>
            </section>}
        </main>
    )
}

export default Homepage