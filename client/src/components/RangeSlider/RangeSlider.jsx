import React, {useRef} from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './RangeSlider.module.css'

function RangeSlider({min, max, gap, label, um, setInput, input, name, option, disable}) {

  const progressRef = useRef()
  const rangeMinRef = useRef()
  const rangeMaxRef = useRef()

  const [rangeMin, setRangeMin] = useState(Math.floor(max / 4))
  const [rangeMax, setRangeMax] = useState(Math.floor(max / 4 * 3))
  const [lastHandle, setLastHandle] = useState(undefined)

  const handleRange = (e) => {
    if(e.target.id === 'rangeMin' || e.target.id === 'inputMin') {setRangeMin(Number(e.target.value)); setLastHandle('min')}
    if(e.target.id === 'rangeMax' || e.target.id === 'inputMax') {setRangeMax(Number(e.target.value)); setLastHandle('max')}

    progressRef.current.style.left = `${(rangeMin / max) * 100}%`
    progressRef.current.style.right = `${100 - (rangeMax / max) * 100}%`
  }

  const handleCloseButton = (e) => {
    setInput({
      ...input,
      [name]: undefined
    })
    option(false)
  }

  useEffect(() => {
    if(rangeMax - rangeMin < gap)  {
      if(lastHandle === 'min') {
        setRangeMin(rangeMax - gap)
      } else if(lastHandle === 'max'){
        setRangeMax(rangeMin + gap)
      }
    }
  })

  useEffect(() => {
    if(input[name] === undefined) {
      setRangeMin(Math.floor(max / 4))
      setRangeMax(Math.floor(max / 4 * 3))
      setLastHandle(undefined)
      progressRef.current.style.left = `25%`
      progressRef.current.style.right = `25%`
    }
  }, [input])

  useEffect(() => {
    lastHandle &&
    setInput({
      ...input,
      [name]: `${rangeMin} - ${rangeMax}`
    })
  },[rangeMin, rangeMax])

  return (
    <div className={styles.rangeWrapper}>
      <div className={styles.inputValues}>
        <label className={styles.labelWrapper}>
          <div className={styles.label}>
            <span>{label}</span>
            {option && <div className={styles.closeBtn} onClick={handleCloseButton}>✖</div>}
          </div>
          
        </label>
          {lastHandle
            ?   <div className={styles.values}>{`${rangeMin} - ${rangeMax} ${um}`}</div>
            :   <div className={`${styles.values} ${styles.noset}` }>NO SET</div>
          }
        
      </div>
      <div className={styles.slider}>
        <div ref={progressRef} className={styles.progress}>
      </div>
      <div className={styles.inputRange}>
        <input
          disabled={disable}
          id='rangeMin'
          className={styles.rangeMin}
          type="range"
          min={min}
          max={max}
          onChange={handleRange}
          value={rangeMin}
          ref={rangeMaxRef}
        />
        <input
          disabled={disable}
          id='rangeMax'
          className={styles.rangeMax}
          type="range"
          min={min}
          max={max}
          onChange={handleRange}
          value={rangeMax}
          ref={rangeMinRef}
        />
      </div>
      </div>
    </div>
    
  )
}

export default RangeSlider