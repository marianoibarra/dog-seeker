import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import fetchDogs from "../../services/fetchDogs"

const DetailsDog = () => {

const [details, setDetails] = useState()
const { id } = useParams()

useEffect(() => {
    fetchDogs(id)
        .then(data => setDetails(data))
        .catch(e => console.log(e))
}, [])

    return (
        details 
        ?   (<div>
                <img src={details.image} alt={details.name} />
                <h1>{details.name}</h1>
                <h2>{details.height}</h2>
                <h2>{details.weight}</h2>
            </div>)
        :   (<h1>Loading...</h1>)
    )
}

export default DetailsDog