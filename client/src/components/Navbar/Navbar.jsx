import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import logoImg from '../../img/prueba logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faArrowLeft, faSquarePlus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

const Navbar = () => {
  
  let { pathname } = useLocation();

  const positionHandle = (e) => {
    if(e.target.id === 'createOnMobile') {
      document.documentElement.style.setProperty('--pageX-details', `50vw`)
      document.documentElement.style.setProperty('--pageY-details', `50vh`)
    } else {
      document.documentElement.style.setProperty('--pageX-details', `${e.pageX}px`)
      document.documentElement.style.setProperty('--pageY-details', `${e.pageY}px`)
    }   
  }

  const [searchOpen, setSearchOpen] = useState(false)

  switch (pathname.split("/")[1]) {
    case "create": {
      return (
        <>
          <div className={styles.navBox}>
            <nav className={styles.nav}>
              <Link to={'/home'} style={{right:'6px'}} className={`${styles.searchButton} ${styles.visible}`}>
                  <FontAwesomeIcon icon={faArrowLeft} size='lg' />
              </Link>
            </nav>
          </div>
          <Outlet />
        </>
      );
    }

    case "details": {
      return (
        <>
          <div className={styles.navBox}>
            <nav className={styles.nav}>
              <Link to={'/home'} style={{right:'6px'}} className={`${styles.searchButton} ${styles.visible}`}>
                  <FontAwesomeIcon icon={faArrowLeft} size='lg' />
              </Link>
              <Link onClick={positionHandle} className={styles.createBtn} to="/create">
                Create breed
              </Link>
            </nav>
          </div>
          <Outlet />
        </>
      );
    }

    default: {
      return (
        <><div className={styles.navBox}>
          <nav className={styles.nav}>
            <div className={searchOpen ? styles.hidden : styles.logo}>
              <img src={logoImg} />
              <span>PI-Dogs</span>
            </div>
            <div className={styles.buttons}>
              <Link to="/create" onClick={positionHandle} className={`${styles.searchButton} ${searchOpen ? styles.hidden : styles.visible}`}>
                  <FontAwesomeIcon icon={faPlus} size='lg' />
              </Link>
              <button onClick={() => setSearchOpen(!searchOpen)} style={searchOpen ? {right:'6px'} : {}} className={styles.searchButton}>
                  <FontAwesomeIcon className={searchOpen ? styles.visible : styles.hidden} icon={faArrowLeft} size='xl' />
                  <FontAwesomeIcon className={searchOpen ? styles.hidden : styles.visible} icon={faMagnifyingGlass} size='lg' fixedWidth />
              </button>
            </div>
            <div className={searchOpen ? styles.searchbarOpen : styles.searchbarClose}>
              <SearchBar searchOpen={searchOpen} />
            </div>
            <Link onClick={positionHandle} id="createOnMobile" className={styles.createBtn} to="/create">
              Create breed
            </Link>
          </nav>
        </div>
          <Outlet /></>
      );
    }
  }
};

export default Navbar;
