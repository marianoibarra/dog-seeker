import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './DogCard.module.css'
import placeholderOnError from '../../img/dog-breed-placeholder.png'
import { imgLoaded } from '../../redux/actions'

const Placeholder = ({seed}) => {

    return (
    <div className={`${styles.card} ${styles.front}`}>
        <header className={styles.cardHeader}>
            <div className={styles.imageLoading}><div className={styles.activity}></div></div>
        </header>
        <main className={styles.cardMain}>
            <div style={{width: `${Math.ceil(seed*50+30)}%`}} className={styles.nameLoading}>
            <div className={styles.activity}></div>
            </div>
            <div className={styles.temperamentsCont}>
                <div className={styles.weightLoading}><div className={styles.activity}></div></div>
                    {
                        new Array(Math.ceil(seed*4+2)).fill(' ').map((e, k) => 
                        (<div key={k} style={{width: `${Math.ceil(seed.toString()[k+4]*5+50)}px`}} className={styles.temperamentLoading}><div className={styles.activity}></div></div>)
                        )
                    }                    
            </div>
        </main>
    </div>
    )
}


const DogCard = ({dog, amountCards}) => {
    
    const filterByTemperament = useSelector(state => state.filterByTemperament)
    const dogsIsFetching = useSelector(state => state.dogsIsFetching)
    const imgsLoaded = useSelector(state => state.imgsLoaded)
    const page = useSelector(state => state.page)
    const prevPage = useSelector(state => state.prevPage)
    const [random, setRandom] = useState(Math.random())
    
    
    const dispatch = useDispatch()

    const positionHandle = (e) => {
        document.documentElement.style.setProperty('--pageX-details', `${e.pageX}px`)
        document.documentElement.style.setProperty('--pageY-details', `${e.pageY}px`)
    }

    const imgRef = useRef()

    const hiddenImgOnError = () => {
        imgRef.current.onerror = null;
        imgRef.current.style.display = 'none'
        dispatch(imgLoaded())
    }

    const handleImgOnLoad = () => {
        dispatch(imgLoaded())
    }

    // useEffect(() => {
    //     if(direction === 'prev') imgRef.current.style.animation = "prevPage .5s forwards";
    //     else if(direction === 'next') imgRef.current.style.animation = "nextPage .5s forwards";
    // }, [])

    return (
        
        <div className={styles.cardWrapper}>
            {/* {(imgsLoaded !== amountCards) && <Placeholder seed={random} />} */}
            {dog === undefined && imgsLoaded!==amountCards && <Placeholder seed={random} />}

            {dog && <Link onClick={positionHandle} to={`/details/${dog.id}`} style={{animation: `${page < prevPage ? 'prevPage' : page > prevPage ? 'nextPage' : ''} .5s forwards`}} className={styles.card}>
                <header className={styles.cardHeader}>
                    <img onLoad={handleImgOnLoad} ref={imgRef} onError={hiddenImgOnError} className={styles.image} src={dog.image} alt={dog.name} />
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
            </Link>}
        </div>
    )
}

export default DogCard