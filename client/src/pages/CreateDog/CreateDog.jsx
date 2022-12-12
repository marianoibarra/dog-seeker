import axios from 'axios'
import { useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RangeSlider from '../../components/RangeSlider/RangeSlider'
import TemperamentsSelect from '../../components/TemperamentsSelect/TemperamentsSelect'
import UploadImage from '../../components/UploadImage/UploadImage'
import { getTemperaments, newDog } from '../../redux/actions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import {Link} from 'react-router-dom'


import {BE_LINK} from '../../services/constants'
import styles from './CreateDog.module.css'

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
    const [isFetching, setIsFetching] = useState(false)

    const refSelect = useRef()
    const refModal = useRef()

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

    function handleClickOutside(event) {
        if (refModal.current && !refModal.current.contains(event.target)) {
            handleModalButton()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    return (
        <main className={styles.main}>
            <div className={styles.createWrapper}>
                <div className={styles.formContainer}>
                    {modalVisible &&
                        <div className={styles.darkBg}>
                            <div ref={refModal} className={styles.modalConfirm}>
                                <header>
                                    <FontAwesomeIcon icon={faCircleCheck} size='6x' />
                                </header>
                                <main>
                                    <h2>Great!</h2>
                                    <p>Your dog's breed has been created successfully</p>
                                    <div className={styles.modalButtons}>
                                        <Link to={'/home'}></Link>
                                        <button type='button' onClick={handleModalButton}></button>
                                    </div>
                                </main>
                            </div>
                        </div>
                    }5
                    <form style={isFetching ? {filter: "grayscale(20%)"} : {}} onSubmit={handleSubmit} action={`${BE_LINK}/dogs`} method="post">
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
                                <input disabled={imgIsFetching} className={styles.submit} type="submit" value={isFetching ? 'Loading..' : 'Create'} />

                        </div>                    
                    </form>
                </div>
            </div>
        </main>
    )
}

export default CreateDog