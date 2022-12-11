import axios from 'axios'
import { useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RangeSlider from '../../components/RangeSlider/RangeSlider'
import TemperamentsSelect from '../../components/TemperamentsSelect/TemperamentsSelect'
import UploadImage from '../../components/UploadImage/UploadImage'
import { getTemperaments, newDog, orderDogs } from '../../redux/actions'

import {BE_LINK} from '../../services/constants'
import styles from './CreateDog.module.css'

const CreateDog = () => {
  
    const temperaments = useSelector(state => state.temperaments)
    const order = useSelector(state => state.order)
    const dispatch = useDispatch()

    const [imgIsFetching, setImgIsFetching] = useState(false)
    const [lifeSpanVisible, setLifeSpanVisible] = useState(false)
    const [input, setInput] = useState({
        name: '',
        height: undefined,
        weight: undefined,
        life_span: undefined,
        image: null,
        temperament: []
    })

    const refSelect = useRef()

    useEffect(() => {
        temperaments.length === 0 && dispatch(getTemperaments())
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${BE_LINK}/dogs`,
            data: input
        }).then(res => {
            dispatch(newDog(res.data))
        })
    }

    const handleInputChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (
        <main className={styles.main}>
            <div className={styles.createWrapper}>
                <div className={styles.formContainer}>
                    <form onSubmit={handleSubmit} action={`${BE_LINK}/dogs`} method="post">
                        <div className={styles.uploadImgWrapper}>
                            <UploadImage input={input} setInput={setInput} imgIsFetching={imgIsFetching} setImgIsFetching={setImgIsFetching} />
                        </div>
                        <div className={styles.dataWrapper}>
                                <input
                                    id='name'
                                    className={styles.name}
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    placeholder='Name...'
                                    autoFocus={true}
                                    autoComplete='none'
                                    onChange={handleInputChange}
                                />
                                
                                <div className={styles.statsWrapper}>
                                    <div className={styles.rangeWrapper}>
                                        <RangeSlider key={'height'} input={input} setInput={setInput} name={'height'} label={'Height'} min={1} max={100} gap={1} um={'cm'} />
                                        <RangeSlider key={'weight'} input={input} setInput={setInput} name={'weight'} label={'Weight'} min={1} max={100} gap={1} um={'kg'} />
                                        {
                                            lifeSpanVisible 
                                                ?   <RangeSlider option={setLifeSpanVisible} key={'life_span'} input={input} setInput={setInput} name={'life_span'} label={'Life span'} min={1} max={30} gap={1} um={'years'} />
                                                :   <button className={styles.addLifespanBtn} type='button' onClick={() => setLifeSpanVisible(true)} >Add life span</button>
                                        }
                                    </div>
                                    <div className={styles.temperamentsWrapper}>
                                        <TemperamentsSelect refSelect={refSelect} input={input} setInput={setInput} />
                                    </div>
                                </div>    
                                <input disabled={imgIsFetching} className={styles.submit} type="submit" value='Create' />

                        </div>                    
                    </form>
                </div>
            </div>
        </main>
    )
}

export default CreateDog