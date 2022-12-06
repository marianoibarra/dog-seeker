import React, { useRef, useState } from 'react'
import styles from './OrderAndFilter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faArrowDown19, faArrowDownAZ, faArrowUp91, faArrowUpZA, faCheckSquare } from "@fortawesome/free-solid-svg-icons"
import {faSquare} from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const OrderAndFilter = () => {

    const temperaments = useSelector(state => state.temperaments)
    const [tempToSearch, setTempToSearch] = useState('')
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const [orderIsOpen, setOrderIsOpen] = useState(false)
    const [tempFilter, setTempFilter] = useState([])
    const orderWrapperRef = useRef()
    const filterWrapperRef = useRef()

    const tempToggleHandler = (e) => {
        let value = e.target.children[1].innerText    
        if(!tempFilter.some(t => t === value)) {
            setTempFilter([...tempFilter, value])
        } else {
            setTempFilter(tempFilter.filter(t => t !== value))
        }
    }

    function handleClickOutside(event) {
        if (filterWrapperRef.current && !filterWrapperRef.current.contains(event.target)) {
            setFilterIsOpen(false)
        }
        if (orderWrapperRef.current && !orderWrapperRef.current.contains(event.target)) {
            setOrderIsOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    });



  return (
    <>
        <div ref={orderWrapperRef} className={styles.toggles}>

            <button onClick={() => setOrderIsOpen(!orderIsOpen)} className={`${orderIsOpen ? `${styles.button} ${styles.open}` : `${styles.button} ${styles.closed}`}`}>
                <span>ORDER BY</span>
                <FontAwesomeIcon icon={faAngleDown} size='sm' />
            </button>
            
            <div className={orderIsOpen ? styles.orderDropdownOpen : styles.orderDropdownClosed}>
                <div className={styles.orderDropdownBody}>
                    <button onClick={() => setOrderIsOpen(false)} className={styles.option}>
                        <FontAwesomeIcon icon={faArrowDownAZ} size='lg' fixedWidth />
                        <span>Name (A - Z)</span>
                    </button>
                    <button onClick={() => setOrderIsOpen(false)} className={styles.option}>
                        <FontAwesomeIcon icon={faArrowUpZA} size='lg' fixedWidth />
                        <span>Name (Z - A)</span>
                    </button>
                    <button onClick={() => setOrderIsOpen(false)} className={styles.option}>
                        <FontAwesomeIcon icon={faArrowDown19} size='lg' fixedWidth />
                        <span>Weight (Low to high)</span>
                    </button>
                    <button onClick={() => setOrderIsOpen(false)} className={styles.option}>
                        <FontAwesomeIcon icon={faArrowUp91} size='lg' fixedWidth />
                        <span>Weight (High to low)</span>
                    </button>
                </div>
            </div>

        </div>

        <div ref={filterWrapperRef} className={styles.toggles}>

            <button onClick={() => setFilterIsOpen(!filterIsOpen)} className={`${filterIsOpen ? `${styles.button} ${styles.open}` : `${styles.button} ${styles.closed}`}`}>                
                <span>FILTER BY</span>
                <FontAwesomeIcon icon={faAngleDown} size='sm' />
            </button> 

            <div className={filterIsOpen ? styles.filterDropdownOpen : styles.filterDropdownClosed}>
                <div className={styles.filterDropdownBody}>
                    <div className={styles.filterHeader}>
                        <div className={styles.filterTitle}>
                            Temperaments
                            {tempFilter.length > 0 && <div>{tempFilter.length}</div>}
                        </div>
                        <div className={styles.searchFilter}>
                            <input placeholder='Search...' type="text" name="tempFilter" id="inputTempFilter" onChange={e => setTempToSearch(e.target.value.toLowerCase())} value={tempToSearch} />
                        </div>
                    </div>
                    <div className={styles.tempCont} >
                        {temperaments && temperaments.filter(t => t.name.toLowerCase().startsWith(tempToSearch)).length > 0 ?
                        
                        temperaments.filter(t => t.name.toLowerCase().startsWith(tempToSearch)).map(t => (
                            <button value={t.name} className={styles.tempToggle} onClick={tempToggleHandler}>
                                <div className={styles.checkbox}>
                                    <FontAwesomeIcon icon={tempFilter.some(f => f == t.name) ? faCheckSquare : faSquare} size='lg' fixedWidth />
                                </div>
                                <div className={styles.toggleName}>{t.name}</div>
                            </button>
                            ))
                        :
                        <span className={styles.nothing}>No temperaments found :(</span>
                        }
                    </div>
                    <div className={styles.originSelector}>

                    </div>
                </div>
            </div>        
        </div>
    </>
          
    
  )
}

export default OrderAndFilter