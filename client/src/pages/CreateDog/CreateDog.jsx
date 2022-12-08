import axios from 'axios'
import { useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TemperamentsSelect from '../../components/TemperamentsSelect/TemperamentsSelect'
import { getTemperaments, newDog, orderDogs } from '../../redux/actions'

import {BE_LINK} from '../../services/constants'
import styles from './CreateDog.module.css'

const CreateDog = () => {
  
    const temperaments = useSelector(state => state.temperaments)
    const order = useSelector(state => state.order)
    const dispatch = useDispatch()
    
    function guardarArchivo(e) {
        var file = e.target.files[0] //the file
        var reader = new FileReader() //this for convert to Base64 
        reader.readAsDataURL(e.target.files[0]) //start conversion...
        reader.onload = function (e) { //.. once finished..
        var rawLog = reader.result.split(',')[1]; //extract only thee file data part
        var dataSend = { dataReq: { data: rawLog, name: file.name, type: file.type }, fname: "uploadFilesToGoogleDrive" }; //preapre info to send to API
        fetch('https://script.google.com/macros/s/AKfycbyWX3EdWONKc_LefdFUP2aGTRx82xEBE0kiaCMb-Tmos8kUHuNs1vcpzKioYpXOQuDV/exec', //your AppsScript URL
            { method: "POST", body: JSON.stringify(dataSend) }) //send to Api
            .then(res => res.json()).then(res => {
            setInput({...input, image: res.url})
            }).catch(e => console.log(e))
        }
    }

    const refSelect = useRef()

    function handleSubmit(e) {
        e.preventDefault();
        axios({
            method: 'POST',
            url: `${BE_LINK}/dogs`,
            data: {...input, temperament: temperamentsInput}
        }).then(res => {
            console.log(res)
            dispatch(newDog(res))
            dispatch(orderDogs(order))
        })
    }

    const [input, setInput] = useState({
        name: '',
        height: 0,
        weight: 0,
        life_span: 0,
        image: '',
    })

    const [temperamentsInput, setTemperamentsInput] = useState([])

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

                    <div className={styles.imageWrapper}>
                    {
                        <div className={styles.imgWrapper}>
                           { input.image ? 
                            <img src={input.image} />
                            :
                            <div className={styles.imgPlaceholder}></div>
                            }
                        </div>
                    }
                        <input hidden type="text" name="image" id="image" value={input.image && input.image} />
                        <input type="file" accept="image/*" id="customFile" onChange={(e) => guardarArchivo(e)} />
                    </div>
                    <div className={styles.dataWrapper}>
                        <input value={input.name} onChange={handleInputChange} autoFocus={true} autoComplete='none' placeholder='Name...' type="text" name="name" id='name' className={styles.name} />
                        <label htmlFor="height">Height: </label>
                        <input value={input.height} onChange={handleInputChange} type="text" name="height" id="height" />
                        <label htmlFor="weight">Weight: </label>
                        <input value={input.weight} onChange={handleInputChange} type="text" name="weight" id="weight" />
                        <label htmlFor="life_span">Life span: </label>
                        <input value={input.life_span} onChange={handleInputChange} type="text" name="life_span" id="life_span" />
                        {/* <select hidden ref={refSelect} multiple name="temperaments" id="temperaments">
                            {
                                temperaments.map(t => (<option key={t.name} value={t.name}>{t.name}</option>))
                            }
                        </select> */}
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