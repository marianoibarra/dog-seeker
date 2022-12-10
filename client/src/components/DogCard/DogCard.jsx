import React from 'react'
import styles from './DogCard.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'

const DogCard = ({dog}) => {
    
    const filterByTemperament = useSelector(state => state.filterByTemperament)
    const dogsIsFetching = useSelector(state => state.dogsIsFetching)

    const positionHandle = (e) => {
        console.log(e)
        document.documentElement.style.setProperty('--pageX-details', `${e.pageX}px`)
        document.documentElement.style.setProperty('--pageY-details', `${e.pageY}px`)
    }

    const [refresh, setRefresh] = useState(false)

    useEffect(() => {   
        setRefresh(true)
        setTimeout(() => {
            setRefresh(false)
        }, 250);
    }, [dog])

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
            :   <Link onClick={positionHandle} to={`/details/${dog.id}`} className={styles.card}>
                    <header className={styles.cardHeader}>
                        <img className={styles.image} src={dog.image} alt={dog.name} />
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