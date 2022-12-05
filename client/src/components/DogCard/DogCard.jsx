import React from 'react'
import styles from './DogCard.module.css'
import { Link } from 'react-router-dom'

const DogCard = ({dog}) => {
  return (
    <Link to={`/details/${dog.id}`} className={styles.card}>
        <header className={styles.cardHeader}>
            <img className={styles.image} src={dog.image} alt={dog.name} />
        </header>
        <main className={styles.cardMain}>
            <div className={styles.nameCont}>
                <h3 className={styles.dogName}>{dog.name}</h3>
            </div>
            <div className={styles.temperamentsCont}>
                <div className={styles.weight}>{`Height: \n${dog.weight} kg`}</div>
                {dog.temperament && dog.temperament.map(t => (
                    <div className={styles.temperament}>{t}</div>
                ))}
            </div>
        </main>
    </Link>
  )
}

export default DogCard