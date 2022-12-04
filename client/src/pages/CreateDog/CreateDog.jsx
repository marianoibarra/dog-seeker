import { useState } from 'react'
import { useSelector } from 'react-redux'
import {BE_LINK} from '../../services/constants'

const CreateDog = () => {

    const temperaments = useSelector(state => state.temperaments)
    const temperamentsSelects = useState([])

    return (
        <main className="main">
            <div className="formContainer">
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
                    <input type="submit" value='Create' />
                </form>
            </div>
        </main>
    )
}

export default CreateDog