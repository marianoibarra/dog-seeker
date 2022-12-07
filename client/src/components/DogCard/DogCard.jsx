import React from 'react'
import styles from './DogCard.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DogCard = ({dog}) => {
    
    const temperamentFilter = useSelector(state => state.temperamentFilter)
    const dogsIsFetching = useSelector(state => state.dogsIsFetching)

    return (

        dog

        ?
        
        <Link to={`/details/${dog.id}`} className={styles.card}>
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
                        <div style={temperamentFilter.includes(t) ? {fontWeight:'900'} : {}} className={styles.temperament}>{t}</div>
                    ))}
                </div>
            </main>
        </Link>

        :

        <div className={styles.card}>
            <header className={styles.cardHeader}>
                <div className={styles.imageLoading}><div className={styles.activity}></div></div>
            </header>
            <main className={styles.cardMain}>
                <div className={styles.nameLoading}>
                <div className={styles.activity}></div>
                </div>
                <div className={styles.temperamentsCont}>
                    <div className={styles.weightLoading}><div className={styles.activity}></div></div>

                        <div className={styles.temperamentLoading}><div className={styles.activity}></div></div>
                        <div className={styles.temperamentLoading}><div className={styles.activity}></div></div>
                        <div className={styles.temperamentLoading}><div className={styles.activity}></div></div>
                    
                </div>
            </main>
        </div>

    )
}

export default DogCard