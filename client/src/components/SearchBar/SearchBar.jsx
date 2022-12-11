import styles from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass, faXmark} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { filterDogs } from '../../redux/actions'
import { useEffect } from 'react'
import { useRef } from 'react'


const SearchBar = () => {

    const [input, setInput] = useState('')
    const inputRef = useRef()
    const dispatch = useDispatch()
    const [showSearchClear, setShowSearchClear] = useState(false)

    const handleSearch = (e) => {
        e.preventDefault()
        dispatch(filterDogs(undefined, undefined, input))
        inputRef.current.blur()
        setShowSearchClear(true)
    }

    const handleClear = () => {
        dispatch(filterDogs(undefined, undefined, ''))
        setShowSearchClear(false)
        setInput('')
    }

    useEffect(() => {
        console.log(showSearchClear)
    }, [showSearchClear])

    return (
        <form className={styles.searchBar} onSubmit={handleSearch}>
            <input onFocus={() => setShowSearchClear(false)} ref={inputRef} placeholder='Search...' type="text" name="search" className={styles.searchInput} value={input} onChange={e => setInput(e.target.value)}/>
            {   showSearchClear
                    ?   <><button className={styles.searchButton} type="reset" onClick={handleClear}>
                            <FontAwesomeIcon className={styles.searchIcon} icon={faXmark} fixedWidth />
                        </button>
                        <button hidden type='submit'></button></>
                    :   <button className={styles.searchButton} type="submit">
                            <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} fixedWidth />
                        </button>
            }
        </form>
    )
}

export default SearchBar