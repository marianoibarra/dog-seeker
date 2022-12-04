import { Link, Outlet, useLocation } from "react-router-dom"
import s from './Navbar.module.css'
import SearchBar from '../SearchBar/SearchBar'

const Navbar = () => {

    let {pathname} = useLocation()
    console.log(pathname.split('/')[1])

    switch(pathname.split('/')[1]) {
        case 'create': {
            return (
                <div className={s.navBox}>
                    <nav className={s.nav}>
                        <Link to={-1}>Back</Link>
                    </nav>
                    <Outlet />
                </div>
            )
        }

        case 'details': {
            return (
                <div className={s.navBox}>
                    <nav className={s.nav}>
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
                <div className={s.navBox}>
                    <nav className={s.nav}>
                        <div className={s.logo}>logo</div>
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