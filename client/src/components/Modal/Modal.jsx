import React, {useEffect, useRef} from 'react'
import styles from './Modal.module.css'
import Portal from '../Portal/Portal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearModal } from '../../redux/actions'
import { faRotateRight } from '@fortawesome/free-solid-svg-icons'

const Modal = ({reset, submit}) => {

    const refModal = useRef()

    const dispatch = useDispatch()
    const modalDogCreatedSuccess = useSelector(state => state.modalDogCreatedSuccess)
    const modalDogCreatedFailed = useSelector(state => state.modalDogCreatedFailed)

    function handleClickOutside(event) {
        if (refModal.current && !refModal.current.contains(event.target)) {
            !modalDogCreatedFailed && reset()
            dispatch(clearModal())
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    });

    if(modalDogCreatedSuccess){
        return (
        <Portal>
                <div className={styles.darkBg}>
                    <div ref={refModal} className={styles.modalSuccess}>
                        <header className={styles.modalHeader}>
                            <FontAwesomeIcon icon={faCircleCheck} size='6x' />
                        </header>
                        <main className={styles.modalMain}>
                            <h2>Great!</h2>
                            <p>Your dog's breed has been created successfully</p>
                            <div className={styles.modalButtons}>
                                <Link className={styles.secondaryButton} onClick={() => dispatch(clearModal())} to={'/home'}>Back to home</Link>
                                <button className={styles.accentButton} type='button' onClick={() => {reset(); dispatch(clearModal())}}>Create new</button>
                            </div>
                        </main>
                    </div>
                </div>
        </Portal>
        )
    } else if(modalDogCreatedFailed) {
        return (
            <Portal>
                <div className={styles.darkBg}>
                    <div ref={refModal} className={styles.modalFailed}>
                        <header className={styles.modalHeader}>
                            <FontAwesomeIcon icon={faCircleXmark} size='6x' />
                        </header>
                        <main className={styles.modalMain}>
                            <h2>Ooops!</h2>
                            <p>{modalDogCreatedFailed}</p>
                            <div className={styles.modalButtons}>
                                <button type='button' className={styles.yellowButton} onClick={(e) => {dispatch(clearModal())}}>
                                <FontAwesomeIcon icon={faRotateRight} size='sm' />
                                    Modify values
                                </button>
                            </div>
                        </main>
                    </div>
                </div>
            </Portal>
        )
    }
    
}

export default Modal