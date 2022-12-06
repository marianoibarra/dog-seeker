import { Link, Outlet, useLocation } from "react-router-dom"
import styles from './Navbar.module.css'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {

    let {pathname} = useLocation()
    console.log(pathname.split('/')[1])

    switch(pathname.split('/')[1]) {
        case 'create': {
            return (
                <div className={styles.navBox}>
                    <nav className={styles.nav}>
                        <Link to={-1}>Back</Link>
                    </nav>
                    <Outlet />
                </div>
            )
        }

        case 'details': {
            return (
                <div className={styles.navBox}>
                    <nav className={styles.nav}>
                        <Link to={-1}>Back</Link>
                        <Link className={styles.createBtn} to='/create'>
                            Create breed
                        </Link>
                    </nav>
                    <Outlet />
                </div>
            )            
        }

        default: {
            return (
                <div className={styles.navBox}>
                    <nav className={styles.nav}>
                        <div className={styles.logo}>logo</div>
                        <div className={styles.searchbarCont}>
                           <SearchBar />
                        </div>
                        <Link className={styles.createBtn} to='/create'>
                            Create breed
                        </Link>
                    </nav>
                    <Outlet />
                </div>
            )
        }
    }
    
}

export default Navbar