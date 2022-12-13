import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import getDogs_API from "../../services/get-Dogs"
import styles from './DetailsDog.module.css'
import placeholderOnError from '../../img/dog-breed-placeholder-details.png'

const DetailsDog = () => {

const [details, setDetails] = useState()
const [fullsize, setFullsize] = useState()
const { id } = useParams()
const random = Math.floor(Math.random() * 5 + 3)
const arrayRandom = new Array(random).fill('').map(e => e = Math.floor(Math.random() * 30))

useEffect(() => {
    getDogs_API(id)
        .then(data => setDetails(data))
        .catch(e => console.log(e))
}, [])

const hiddenImgOnError = (e) => {
    e.target.onerror = null;
    e.target.style.display = 'none';
    console.log(document.getElementById('imagePlaceholder'))
    document.getElementById('imagePlaceholder').style.display= 'inline'
}

    return (
        details 
        ?   (
            <main className={styles.main}>
                <div className={styles.detailsWrapper}>
                    <div className={styles.detailsBody}>
                        <img onError={hiddenImgOnError} onClick={() => setFullsize(!fullsize)} className={fullsize ? styles.imageFullsize : styles.image} src={details.image} alt={details.name} />
                        <img id='imagePlaceholder' className={styles.imagePlaceholder} src={placeholderOnError} />
                        <div className={styles.dataWrapper}>
                            <h2 className={`${styles.dogName} ${fullsize ? styles.fullsize : ''}`}>{details.name}</h2>
                            <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Height: ${details.height} cm`}</div>
                            <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Weight: ${details.weight} kg`}</div>
                            <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Life span: ${details.life_span}`}</div>
                            <div className={styles.temperamentsWrapper}>
                                {details.temperament.map(temperament => (<div className={`${styles.temperament} ${fullsize ? styles.tfullsize : ''}`}>{temperament}</div>))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            )
        :   (
            <main className={styles.main}>
                <div className={styles.detailsWrapper}>
                    <div className={styles.detailsBody}>
                        <div className={styles.imageLoading}><div className={styles.activity}></div></div>
                        <div className={styles.dataWrapper}>
                            <h2  style={{width: `${285 + arrayRandom[0]}px`}} className={styles.dogNameLoading}><div className={styles.activity}></div></h2>
                            <div style={{width: `${175 + arrayRandom[1]}px`}} className={styles.dogStatsLoading}><div className={styles.activity}></div></div>
                            <div style={{width: `${175 + arrayRandom[2]}px`}} className={styles.dogStatsLoading}><div className={styles.activity}></div></div>
                            <div style={{width: `${175 + arrayRandom[3]}px`}} className={styles.dogStatsLoading}><div className={styles.activity}></div></div>
                            <div className={styles.temperamentsWrapper}>
                                {
                                    arrayRandom.map(e => (<div className={styles.temperamentLoading}><div className={styles.activity}></div></div>))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            )
    )
}

export default DetailsDog