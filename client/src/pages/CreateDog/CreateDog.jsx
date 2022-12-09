import axios from 'axios'
import { useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TemperamentsSelect from '../../components/TemperamentsSelect/TemperamentsSelect'
import UploadImage from '../../components/UploadImage/UploadImage'
import { getTemperaments, newDog, orderDogs } from '../../redux/actions'

import {BE_LINK} from '../../services/constants'
import styles from './CreateDog.module.css'

const CreateDog = () => {
  
    const temperaments = useSelector(state => state.temperaments)
    const order = useSelector(state => state.order)
    const dispatch = useDispatch()

    const [temperamentsInput, setTemperamentsInput] = useState([])
    const [imageLink, setImageLink] = useState(null)

    const refSelect = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${BE_LINK}/dogs`,
            data: {...input, image: imageLink, temperament: temperamentsInput}
        }).then(res => {
            console.log(res.data)
            dispatch(newDog(res.data))
            dispatch(orderDogs(order))
        })
    }

    const [input, setInput] = useState({
        name: '',
        height: 0,
        weight: 0,
        life_span: 0,
    })

    
    const handleInputChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        temperaments.length === 0 && dispatch(getTemperaments())
    }, [])


    return (
        <main className={styles.main}>
            <div className={styles.formContainer}>
                <form onSubmit={handleSubmit} action={`${BE_LINK}/dogs`} method="post">
                    <UploadImage setImageLink={setImageLink} />
                    <div className={styles.dataWrapper}>
                        <input value={input.name} onChange={handleInputChange} autoFocus={true} autoComplete='none' placeholder='Name...' type="text" name="name" id='name' className={styles.name} />
                        <label htmlFor="height">Height: </label>
                        <input value={input.height} onChange={handleInputChange} type="text" name="height" id="height" />
                        <label htmlFor="weight">Weight: </label>
                        <input value={input.weight} onChange={handleInputChange} type="text" name="weight" id="weight" />
                        <label htmlFor="life_span">Life span: </label>
                        <input value={input.life_span} onChange={handleInputChange} type="text" name="life_span" id="life_span" />
                        <div className={styles.temperamentsWrapper}>
                            <TemperamentsSelect refSelect={refSelect} temperamentsOfNewDog={temperamentsInput} setTemperamentsOfNewDog={setTemperamentsInput} />
                        </div>
                        <input className={styles.submit} type="submit" value='Create' />
                    </div>                    
                </form>
            </div>
        </main>
    )
}

export default CreateDog