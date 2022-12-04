import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import fetchDogs from "../../services/fetchDogs"
import styles from './DetailsDog.module.css'

const DetailsDog = () => {

const [details, setDetails] = useState()
const { id } = useParams()

useEffect(() => {
    fetchDogs(id)
        .then(data => setDetails(data))
        .catch(e => console.log(e))
}, [])

useEffect(() => {
  console.log(details)

}, [details])


    return (
        details 
        ?   (<div>
                <img src={details.image} alt={details.name} />
                <h1>{details.name}</h1>
                <h2>{details.height}</h2>
                <h2>{details.weight}</h2>
                <div className={styles.temperaments}>
                    {details.temperament.map(temperament => (<h3>{temperament}</h3>))}
                </div>
            </div>)
        :   (<h1>Loading...</h1>)
    )
}

export default DetailsDog