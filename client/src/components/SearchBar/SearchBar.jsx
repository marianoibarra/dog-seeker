import styles from './SearchBar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"


const SearchBar = () => {
    return (
        <div className={styles.searchBar}>
            <input placeholder='Search...' type="text" name="search" className={styles.searchInput} />
            <button className={styles.searchButton} type="submit">
                <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} fixedWidth />
            </button>
        </div>
    )
}

export default SearchBar