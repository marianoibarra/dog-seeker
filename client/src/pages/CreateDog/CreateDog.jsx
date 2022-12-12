import axios from 'axios'
import { useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RangeSlider from '../../components/RangeSlider/RangeSlider'
import TemperamentsSelect from '../../components/TemperamentsSelect/TemperamentsSelect'
import UploadImage from '../../components/UploadImage/UploadImage'
import { getTemperaments, newDog } from '../../redux/actions'


import {BE_LINK} from '../../services/constants'
import styles from './CreateDog.module.css'
import Modal from '../../components/Modal/Modal'

const CreateDog = () => {
  
    const temperaments = useSelector(state => state.temperaments)
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
    const [modalVisible, setModalVisible] = useState(false)
    const [isFetching, setIsFetching] = useState(true)

    const refSelect = useRef()

    useEffect(() => {
        temperaments.length === 0 && dispatch(getTemperaments())
    }, [])

    function handleSubmit(e) {
        e.preventDefault();
        setIsFetching(true)
        axios({
            method: 'POST',
            url: `${BE_LINK}/dogs`,
            data: input
        }).then(res => {
            setIsFetching(false)
            dispatch(newDog(res.data))
            setModalVisible(true)
        })
        .catch(e => {
            setIsFetching(false)
            console.log(e)
        })
    }
    
    const handleInputChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }
    
    const handleModalButton = () => {
        setInput(initialValues)
        setModalVisible(false)
        setLifeSpanVisible(false)
    }

    const Spinner = () => {
        return (
            <div className={styles.spinner}><div></div><div></div><div></div><div></div></div>
        )
    }

    return (
        <main className={styles.main}>
            <div className={`${styles.createWrapper} ${isFetching ? styles.fetching : ''}`}>
                <div className={styles.formContainer}>
                    <Modal handle={handleModalButton} visible={modalVisible} />
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
                                    className={`${styles.name} ${isFetching ? styles.fetchingData : ''} `}
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    placeholder='Name...'
                                    autoFocus={true}
                                    autoComplete='none'
                                    onChange={handleInputChange}
                                />
                                
                                <div className={`${styles.statsWrapper} ${isFetching ? styles.fetchingData : ''} `}>
                                    <div className={styles.rangeWrapper}>
                                        <RangeSlider 
                                        disable={isFetching} 
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
                                        disable={isFetching} 
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
                                                    disable={isFetching}
                                                    option={setLifeSpanVisible} 
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
                                    <div className={`${styles.temperamentsWrapper} ${isFetching ? styles.fetchingData : ''} `}>
                                        <TemperamentsSelect refSelect={refSelect} input={input} setInput={setInput} />
                                    </div>
                                </div>    
                                <button disabled={imgIsFetching} className={styles.submit} type="submit">
                                    {isFetching ? <Spinner/> : 'Create'}
                                </button>
                        </div>                    
                    </form>
                </div>
            </div>
        </main>
    )
}

export default CreateDog