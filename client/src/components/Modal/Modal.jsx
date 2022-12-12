import React, {useEffect, useRef} from 'react'
import styles from './Modal.module.css'
import Portal from '../Portal/Portal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

const Modal = ({visible, handle}) => {

    const refModal = useRef()

    function handleClickOutside(event) {
        if (refModal.current && !refModal.current.contains(event.target)) {
            handle()
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    return (
    <Portal>
        {visible && 
            <div className={styles.darkBg}>
                <div ref={refModal} className={styles.modalConfirm}>
                    <header>
                        <FontAwesomeIcon icon={faCircleCheck} size='6x' />
                    </header>
                    <main>
                        <h2>Great!</h2>
                        <p>Your dog's breed has been created successfully</p>
                        <div className={styles.modalButtons}>
                            <Link to={'/home'}></Link>
                            <button type='button' onClick={handle}></button>
                        </div>
                    </main>
                </div>
            </div>
        }
    </Portal>
    )
}

export default Modal