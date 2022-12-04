import React from 'react'
import styles from './DogCard.module.css'

const DogCard = ({dog}) => {
    console.log(dog)
  return (
    <div className={styles.card}>
        <header className={styles.cardHeader}>
            <img className={styles.image} src={dog.image} alt={dog.name} />
        </header>
        <main className={styles.cardMain}>
            <div className={styles.nameCont}>
                <h3 className={styles.dogName}>{dog.name}</h3>
                <div className={styles.weight}>{dog.weight}</div>
            </div>
            
            <div className={styles.temperamentsCont}>
                {dog.temperament && dog.temperament.map(t => (
                    <div className={styles.temperament}>{t}</div>
                ))}
            </div>
        </main>
    </div>
  )
}

export default DogCard