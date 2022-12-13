import React, {useEffect, useRef, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styles from './DogCard.module.css'
import placeholderOnError from '../../img/dog-breed-placeholder.png'


const DogCard = ({dog}) => {
    
    const filterByTemperament = useSelector(state => state.filterByTemperament)
    const dogsIsFetching = useSelector(state => state.dogsIsFetching)

    const positionHandle = (e) => {
        document.documentElement.style.setProperty('--pageX-details', `${e.pageX}px`)
        document.documentElement.style.setProperty('--pageY-details', `${e.pageY}px`)
    }

    const imgRef = useRef()
    const [refresh, setRefresh] = useState(false)
    const location = useLocation()
    const [backFromRoutes, setBackFromRoutes] = useState(location.state && location.state.backFromRoutes === true ? true : false)

    useEffect(() => { 
        if(!backFromRoutes) {
            setRefresh(true)
            setTimeout(() => {
                setRefresh(false)

            }, 400);
        } else {
            setBackFromRoutes(false)
        }
    }, [dog])

    const hiddenImgOnError = () => {
        imgRef.current.onerror = null;
        imgRef.current.style.display = 'none'
        console.log(imgRef.current)
    }

    return (
        
        dogsIsFetching || refresh
            ?   <div className={styles.card}>
                    <header className={styles.cardHeader}>
                        <div className={styles.imageLoading}><div className={styles.activity}></div></div>
                    </header>
                    <main className={styles.cardMain}>
                        <div style={{width: `${Math.ceil(Math.random()*50+30)}%`}} className={styles.nameLoading}>
                        <div className={styles.activity}></div>
                        </div>
                        <div className={styles.temperamentsCont}>
                            <div className={styles.weightLoading}><div className={styles.activity}></div></div>
                                {
                                    new Array(Math.ceil(Math.random()*4+2)).fill(' ').map((e, k) => 
                                    (<div key={k} style={{width: `${Math.ceil(Math.random()*50+50)}px`}} className={styles.temperamentLoading}><div className={styles.activity}></div></div>)
                                    )
                                }                    
                        </div>
                    </main>
                </div>
            :   
                <Link onClick={positionHandle} to={`/details/${dog.id}`} className={styles.card}>
                    <header className={styles.cardHeader}>
                        <img ref={imgRef} onError={hiddenImgOnError} className={styles.image} src={dog.image} alt={dog.name} />
                        <img className={styles.imagePlaceholder} src={placeholderOnError} />
                    </header>
                    <main className={styles.cardMain}>
                        <div className={styles.nameCont}>
                            <h3 className={styles.dogName}>{dog.name}</h3>
                        </div>
                        <div className={styles.temperamentsCont}>
                            <div className={styles.weight}>{`Weight: \n${dog.weight} kg`}</div>
                            {dog.temperament && dog.temperament.map(t => (
                                <div style={filterByTemperament.includes(t) ? {fontWeight:'900'} : {}} className={styles.temperament}>{t}</div>
                            ))}
                        </div>
                    </main>
                </Link>
    )
}

export default DogCard