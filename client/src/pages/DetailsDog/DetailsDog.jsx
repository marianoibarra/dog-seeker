import { useEffect, useLayoutEffect, useState } from "react"
import { useParams } from "react-router-dom"
import getDogs_API from "../../services/get-Dogs"
import styles from './DetailsDog.module.css'
import placeholderOnError from '../../img/dog-breed-placeholder-details.png'
import { useDispatch, useSelector } from "react-redux"
import { setPage } from "../../redux/actions"
import {Helmet} from "react-helmet";

const DetailsDog = () => {

  const [details, setDetails] = useState()
  const [fullsize, setFullsize] = useState()
  const { id } = useParams()
  const page = useSelector(state => state.page)
  const random = Math.floor(Math.random() * 5 + 3)
  const arrayRandom = new Array(random).fill('').map(e => e = Math.floor(Math.random() * 30))
  const dispatch = useDispatch()
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    dispatch(setPage(page))
    getDogs_API(id)
      .then(data => setDetails(data))
      .catch(e => console.log(e))
  }, [])

  useLayoutEffect(() => {
    if(details && details.image === null) setImgError(true)
  }, [details])

  const handleImgError = (e) => {
    e.target.onerror = null;
    setImgError(true)
  }


  return (
  details 
    ? <main className={styles.main}>
        <Helmet>
          <title>{`Dog Seeker | ${details.name}`}</title>
        </Helmet>
        <div className={styles.detailsBody}>
          {imgError 
            ? <img id='imagePlaceholder' className={styles.imagePlaceholder} src={placeholderOnError} />
            : <img onError={handleImgError} onClick={() => setFullsize(!fullsize)} className={fullsize ? styles.imageFullsize : styles.image} src={details.image} alt={details.name} />
          }
          <div className={styles.dataWrapper}>
            <h2 className={`${styles.dogName} ${fullsize ? styles.fullsize : ''}`}>{details.name}</h2>
            <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Height: ${details.height} cm`}</div>
            <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Weight: ${details.weight} kg`}</div>
            {details.life_span && <div className={`${styles.dogStats} ${fullsize ? styles.fullsize : ''}`}>{`Life span: ${details.life_span}`}</div>}
            <div className={styles.temperamentsWrapper}>
              {details.temperament && details.temperament.map(temperament => (<div key={temperament} className={`${styles.temperament} ${fullsize ? styles.tfullsize : ''}`}>{temperament}</div>))}
            </div>
          </div>
        </div>
      </main> 
    : <main className={styles.main}>
        <Helmet>
          <title>Dog Seeker | Loading..</title>
        </Helmet>
        <div className={styles.detailsBody}>
          <div className={styles.imageLoading}><div className={styles.activity}></div></div>
          <div className={styles.dataWrapper}>
            <h2 style={{width: `${285 + arrayRandom[0]}px`}} className={styles.dogNameLoading}><div className={styles.activity}/></h2>
            <div style={{width: `${175 + arrayRandom[1]}px`}} className={styles.dogStatsLoading}><div className={styles.activity}/></div>
            <div style={{width: `${175 + arrayRandom[2]}px`}} className={styles.dogStatsLoading}><div className={styles.activity}/></div>
            <div style={{width: `${175 + arrayRandom[3]}px`}} className={styles.dogStatsLoading}><div className={styles.activity}/></div>
            <div className={styles.temperamentsWrapper}>
              { arrayRandom.map((e, i) => (<div key={i} className={styles.temperamentLoading}><div className={styles.activity}/></div>))}
            </div>
          </div>
        </div>
      </main>
    )
}

export default DetailsDog