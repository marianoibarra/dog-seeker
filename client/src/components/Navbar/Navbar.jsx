import { Link, Outlet, useLocation } from "react-router-dom"
import style from './Navbar.module.css'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {

    let {pathname} = useLocation()
    console.log(pathname.split('/')[1])

    switch(pathname.split('/')[1]) {
        case 'create': {
            return (
                <div className={style.navBox}>
                    <nav className={style.nav}>
                        <Link to={-1}>Back</Link>
                    </nav>
                    <Outlet />
                </div>
            )
        }

        case 'details': {
            return (
                <div className={style.navBox}>
                    <nav className={style.nav}>
                        <Link to={-1}>Back</Link>
                        <SearchBar />
                        <Link to='/create'>Create dog</Link>
                    </nav>
                    <Outlet />
                </div>
            )            
        }

        default: {
            return (
                <div className={style.navBox}>
                    <nav className={style.nav}>
                        <div className={style.logo}>logo</div>
                        <SearchBar />
                        <Link to='/create'>Create dog</Link>
                    </nav>
                    <Outlet />
                </div>
            )
        }
    }
    
}

export default Navbar