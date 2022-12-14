import React, {useEffect, useRef} from 'react'
import styles from './Paginate.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { setPage as dispatchPage, setTotalPages as dispatchSetTotalPage } from '../../redux/actions'


const Paginate = () => {

    const dispatch = useDispatch()
    const page = useSelector(state => state.page)
    const totalPages = useSelector(state => state.totalPages)
    const dogs = useSelector(state => state.dogs)

    const numbersRef = useRef([])
    const prevRef = useRef()
    const nextRef = useRef()

    const setPage = (page) => dispatch(dispatchPage(page))
    const setTotalPage = (page) => dispatch(dispatchSetTotalPage(page))

    useEffect(() => {
        setTotalPage()
    }, [dogs])

    useEffect(() => {

        if(dogs.length > 0 && totalPages > 1) {

            numbersRef.current[1].innerHTML = 2
            numbersRef.current[5].innerHTML = 6

            if(totalPages > 7) {
                
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

                if(page <= totalPages - 4) {
                    numbersRef.current[5].className = styles.dots
                    numbersRef.current[5].innerHTML = '•••'
                } else {
                    numbersRef.current[5].className = styles.number
                    numbersRef.current[5].innerHTML = totalPages - 1
                }

                if(page >= 5 && page <= totalPages - 4) {
                    numbersRef.current[2].innerHTML = page - 1
                    numbersRef.current[3].innerHTML = page
                    numbersRef.current[4].innerHTML = page + 1
                } else if(page >= 5) {
                    numbersRef.current[2].innerHTML = totalPages - 4
                    numbersRef.current[3].innerHTML = totalPages - 3
                    numbersRef.current[4].innerHTML = totalPages - 2
                } else if(page <= totalPages - 4){
                    numbersRef.current[2].innerHTML = 3
                    numbersRef.current[3].innerHTML = 4
                    numbersRef.current[4].innerHTML = 5
                } 
            } else if(totalPages > 0) {
                numbersRef.current.forEach(ref => {
                    if(ref.innerHTML > totalPages) ref.style.display = 'none';
                    else ref.style.display = 'inline';
                })
            }

            if(page == 1) {
                prevRef.current.className = styles.navbtnDisable
            } else {
                prevRef.current.className = styles.navbtn
            }

            if(page == totalPages) {
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
    }, [totalPages, page])

    const handleClickOnNumber = (e) => {
        if(e.target.innerHTML !== '•••' && e.target.innerHTML !== page) {
            setPage(Number(e.target.innerHTML))
        }
    }

    const handleClickPrev = () => {
        page !== 1 && setPage(Number(page - 1))
    }

    const handleClickNext = () => {
        page !== totalPages && setPage(Number(page + 1))
    }

    return (
        totalPages > 1
            ? 
                    <ul className={styles.list}>
                        <li key={0} ref={prevRef} className={styles.navbtn} onClick={handleClickPrev}>prev</li>
                        <li key={1} ref={el => numbersRef.current[0] = el} onClick={handleClickOnNumber} className={styles.active}>1</li>
                        <li key={2} ref={el => numbersRef.current[1] = el} onClick={handleClickOnNumber}>2</li>
                        <li key={3} ref={el => numbersRef.current[2] = el} onClick={handleClickOnNumber}>3</li>
                        <li key={4} ref={el => numbersRef.current[3] = el} onClick={handleClickOnNumber}>4</li>
                        <li key={5} ref={el => numbersRef.current[4] = el} onClick={handleClickOnNumber}>5</li>
                        <li key={6} ref={el => numbersRef.current[5] = el} onClick={handleClickOnNumber}>6</li>
                        <li key={7} ref={el => numbersRef.current[6] = el} onClick={handleClickOnNumber}>{totalPages > 7 ? totalPages : 7}</li>
                        <li key={8} ref={nextRef} className={styles.navbtn} onClick={handleClickNext}>next</li>
                    </ul>
            :
                    <ul className={styles.list}>
                        <li key={0} className={styles.navbtnDisable}>prev</li>
                        <li key={1} className={styles.active} style={{cursor: 'default'}}>1</li>
                        <li key={2} className={styles.navbtnDisable}>next</li>
                    </ul>
    )
}

export default Paginate