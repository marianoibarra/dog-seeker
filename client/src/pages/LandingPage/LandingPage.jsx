import { Link } from "react-router-dom"
import styles from './LandingPage.module.css'
import footprint from '../../img/footprint.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { faGithub, faLinkedinIn } from "@fortawesome/free-brands-svg-icons"

const LandingPage = () => {
    return (
        <div>
            {/*<nav className={styles.navLanding}>
                <div className={styles.logo}> logo</div>
                <ul>
                    <li className={styles.github}> GH</li>
                    <li className={styles.linkedin}>LK</li>
                </ul>
            </nav>
             <main className={styles.mainLanding}>
                <section className={styles.boxOne}>
                    <h1>Dog Seeker</h1>
                    <p>Discover and create breeds of dogs, know their main characteristics such as weight, height and temperament. Search, sort and filter results.</p>
                    <p>An individual project made by <a target={'_blank'} href="http://www.marianoibarra.com/">Mariano Ibarra</a></p>
                </section>
                <section className={styles.boxTwo}>
                    <Link to='/home' >home</Link>
                </section>
            </main>            */}
            <main className={styles.grid}>
                <div className={styles.cardWelcome}>
                    <h4>Welcome, doglover! 🐶</h4>
                    <p>Here you will discover and create dog breeds. You can search, filter and sort them</p>
                </div>
                <div className={styles.cardLink}>
                    <img className={styles.footprint} src={footprint} alt="" />
                    <div className={styles.leftLink}>
                        <h1>Dog Seeker</h1>
                        <p>An individual project for Henry 💛</p>
                    </div>
                    <div className={styles.rightLink}>
                        <Link className={styles.linkBtn} to='/home' >
                            <div className={styles.innerBtn}>
                                Check it out
                                <FontAwesomeIcon icon={faAngleRight} />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className={styles.cardFooter}>
                    <ul>
                        <li className={styles.in}>
                            <a href="https://www.linkedin.com/in/marianoibarra/" target={'_blank'}>
                                <FontAwesomeIcon icon={faLinkedinIn} size='2xl'/>
                            </a>
                        </li>
                        <li className={styles.gh}>
                            <a href="https://www.github.com/MarianoIT1" target={'_blank'}>
                                <FontAwesomeIcon icon={faGithub} size='2xl'/>
                            </a>
                        </li>
                        <li className={styles.mail}>
                            <a href="mailto:marianoibarratesta@outlook.com" target={'_blank'}>
                                <FontAwesomeIcon icon={faEnvelope} size='2xl'/>
                            </a>
                        </li>
                    </ul>
                    <div className={styles.copy}>Designed and built by <span>Mariano Ibarra</span></div>
                </div>
            </main>
        </div>
    )
}

export default LandingPage