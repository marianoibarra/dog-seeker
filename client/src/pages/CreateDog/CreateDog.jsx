import axios from 'axios'
import { useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RangeSlider from '../../components/RangeSlider/RangeSlider'
import TemperamentsSelect from '../../components/TemperamentsSelect/TemperamentsSelect'
import UploadImage from '../../components/UploadImage/UploadImage'
import { getTemperaments, postDog } from '../../redux/actions'


import {BE_LINK} from '../../services/constants'
import styles from './CreateDog.module.css'
import Modal from '../../components/Modal/Modal'

const CreateDog = () => {
  
    const temperaments = useSelector(state => state.temperaments)
    const postDogIsFetching = useSelector(state => state.postDogIsFetching)
    const dispatch = useDispatch()

    const initialValues = {
        name: '',
        height: undefined,
        weight: undefined,
        life_span: undefined,
        image: null,
        temperament: []
    }
    
    const [input, setInput] = useState(initialValues)
    const [imgIsFetching, setImgIsFetching] = useState(false)
    const [lifeSpanVisible, setLifeSpanVisible] = useState(false)

    const refSelect = useRef()
    const refSubmit = useRef()

    useEffect(() => {
        temperaments.length === 0 && dispatch(getTemperaments())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(input))
    }
    
    const handleInputChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    const resetForm = () => {
        setInput(initialValues)
        setLifeSpanVisible(false)
    }



    const Spinner = () => {
        return (
            <div className={styles.spinner}><div></div><div></div><div></div><div></div></div>
        )
    }

    return (
        <main className={styles.main}>
            <div className={`${styles.createWrapper} ${postDogIsFetching ? styles.fetching : ''}`}>
                <div className={styles.formContainer}>
                    <Modal reset={resetForm} submit={refSubmit.current} />
                    <form onSubmit={handleSubmit} action={`${BE_LINK}/dogs`} method="post">
                        <div className={styles.uploadImgWrapper}>
                            <UploadImage 
                            input={input} 
                            setInput={setInput} 
                            imgIsFetching={imgIsFetching} 
                            setImgIsFetching={setImgIsFetching} 
                        />
                        </div>
                        <div className={styles.dataWrapper}>
                                <input
                                    id='name'
                                    className={`${styles.name} ${postDogIsFetching ? styles.fetchingData : ''} `}
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    placeholder='Name...'
                                    autoComplete='none'
                                    onChange={handleInputChange}
                                />
                                
                                <div className={`${styles.statsWrapper} ${postDogIsFetching ? styles.fetchingData : ''} `}>
                                    <div className={styles.rangeWrapper}>
                                        <RangeSlider 
                                            key={'height'} 
                                            input={input} 
                                            setInput={setInput} 
                                            name={'height'} 
                                            label={'Height'} 
                                            min={1} 
                                            max={100} 
                                            gap={1} 
                                            um={'cm'} 
                                        />
                                            <RangeSlider  
                                            key={'weight'} 
                                            input={input} 
                                            setInput={setInput} 
                                            name={'weight'} 
                                            label={'Weight'} 
                                            min={1} 
                                            max={100} 
                                            gap={1} 
                                            um={'kg'} 
                                        />
                                        {lifeSpanVisible 
                                            ?   <RangeSlider
                                                    disable={postDogIsFetching}
                                                    close={setLifeSpanVisible} 
                                                    key={'life_span'} 
                                                    input={input} 
                                                    setInput={setInput} 
                                                    name={'life_span'} 
                                                    label={'Life span'} 
                                                    min={1} 
                                                    max={30} 
                                                    gap={1} 
                                                    um={'years'} 
                                                />
                                            :   <button 
                                                    className={styles.addLifespanBtn} 
                                                    type='button' 
                                                    onClick={() => setLifeSpanVisible(true)} 
                                                >Add life span</button>
                                        }
                                    </div>
                                    <div className={`${styles.temperamentsWrapper} ${postDogIsFetching ? styles.fetchingData : ''} `}>
                                        <TemperamentsSelect refSelect={refSelect} input={input} setInput={setInput} />
                                    </div>
                                </div>    
                                <button ref={refSubmit} disabled={imgIsFetching} className={styles.submit} type="submit">
                                    {postDogIsFetching ? <Spinner/> : 'Create'}
                                </button>
                        </div>                    
                    </form>
                </div>
            </div>
        </main>
    )
}

export default CreateDog