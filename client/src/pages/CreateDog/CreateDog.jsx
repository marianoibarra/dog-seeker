import { useState } from 'react'
import { useSelector } from 'react-redux'
import {BE_LINK} from '../../services/constants'
import styles from './CreateDog.module.css'

const CreateDog = () => {

    const temperaments = useSelector(state => state.temperaments)
    const temperamentsSelects = useState([])
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
                console.log(res)
                setImgLoaded(res.url)
              }).catch(e => console.log(e))
          }
        }

        const [imgLoaded, setImgLoaded] = useState(false)

              



    return (
        <main className={styles.main}>
            <div className={styles.formContainer}>
            {
                        <div className={styles.imgWrapper}>
                           { imgLoaded ? 
                            <img src={imgLoaded} />
                            :
                            <div className={styles.imgPlaceholder}></div>
                            }
                        </div>
                    }
                <form action={`${BE_LINK}/dogs`} method="post">
                    
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" id="name" />
                    <label htmlFor="height">Height: </label>
                    <input type="text" name="height" id="height" />
                    <label htmlFor="weight">Weight: </label>
                    <input type="text" name="weight" id="weight" />
                    <label htmlFor="name">Temperaments: </label>
                    <select multiple name="temperament" id="temperament">
                        {temperaments && temperaments.map(t => (<option>{t.name}</option>))}
                    </select>
                    <label htmlFor="life_span">Life span: </label>
                    <input type="text" name="life_span" id="life_span" />
                    <input style={{display: 'none'}} type="text" name="image" id="image" value={imgLoaded && imgLoaded.url} />
                    <input type="file" accept="image/*" id="customFile" onChange={(e) => guardarArchivo(e)} />
                    <input type="submit" value='Create' />
                </form>
            </div>
        </main>
    )
}

export default CreateDog