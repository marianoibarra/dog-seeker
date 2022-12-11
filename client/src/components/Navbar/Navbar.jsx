import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  let { pathname } = useLocation();

  const positionHandle = (e) => {
    document.documentElement.style.setProperty('--pageX-details', `${e.pageX}px`)
    document.documentElement.style.setProperty('--pageY-details', `${e.pageY}px`)
}

  switch (pathname.split("/")[1]) {
    case "create": {
      return (
        <>
          <div className={styles.navBox}>
            <nav className={styles.nav}>
              <Link to='/home'>Back</Link>
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
              <Link to='/home'>Back</Link>
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
            <div className={styles.logo}>logo</div>
            <div className={styles.searchbarCont}>
              <SearchBar />
            </div>
            <Link onClick={positionHandle} className={styles.createBtn} to="/create">
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
