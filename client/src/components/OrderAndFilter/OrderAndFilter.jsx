import React, { useRef, useState } from 'react'
import styles from './OrderAndFilter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faArrowDown19, faArrowDownAZ, faArrowUp91, faArrowUpZA, faCheckSquare, faCircleCheck } from "@fortawesome/free-solid-svg-icons"
import { faSquare, faCircle} from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { originOp } from '../../redux/constants/index'
import { orderOp } from '../../redux/constants/index'
import {orderDogs, filterDogs, setPage} from '../../redux/actions/index'

const OrderAndFilter = () => {

    const temperaments = useSelector(state => state.temperaments)
    const order = useSelector(state => state.order)
    const dispatch = useDispatch()
    const [tempToSearch, setTempToSearch] = useState('')
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const [orderIsOpen, setOrderIsOpen] = useState(false)
    const [tempFilter, setTempFilter] = useState([])
    const [originFilter, setOriginFilter] = useState(originOp[0])
    const orderWrapperRef = useRef()
    const filterWrapperRef = useRef()

    const goToPageOne = () => dispatch(setPage(1))

    const orderHandler = (order) => {
        dispatch(orderDogs(order))
        setOrderIsOpen(false)
    }

    const tempToggleHandler = (e) => {
        let value = e.target.children[1].innerText    
        if(!tempFilter.some(t => t === value)) {
            setTempFilter([...tempFilter, value])
        } else {
            setTempFilter(tempFilter.filter(t => t !== value))
        }
        setTempToSearch('')
    }

    const originToggleHandler = (origin) => {
        if(originFilter.id !== origin.id) {
            setOriginFilter(origin)
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
        dispatch(filterDogs(tempFilter, originFilter))
        goToPageOne()
    }, [tempFilter, originFilter])

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
                    <button onClick={() => orderHandler(orderOp[0])} className={styles.option}>
                        <FontAwesomeIcon icon={faArrowDownAZ} size='lg' fixedWidth />
                        <span style={orderOp[0].id == order ? {fontWeight: '800'} : {}}>{orderOp[0].name}</span>
                    </button>
                    <button onClick={() => orderHandler(orderOp[1])} className={styles.option}>
                        <FontAwesomeIcon icon={faArrowUpZA} size='lg' fixedWidth />
                        <span style={orderOp[1].id == order ? {fontWeight: '800'} : {}}>{orderOp[1].name}</span>
                    </button>
                    <button onClick={() => orderHandler(orderOp[2])} className={styles.option}>
                        <FontAwesomeIcon icon={faArrowDown19} size='lg' fixedWidth />
                        <span style={orderOp[2].id == order ? {fontWeight: '800'} : {}}>{orderOp[2].name}</span>
                    </button>
                    <button onClick={() => orderHandler(orderOp[3])} className={styles.option}>
                        <FontAwesomeIcon icon={faArrowUp91} size='lg' fixedWidth />
                        <span style={orderOp[3].id == order ? {fontWeight: '800'} : {}}>{orderOp[3].name}</span>
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
                    <div className={styles.originFilterWrapper}>
                        <div className={styles.filterTitle}>
                            Origin
                        </div>
                        <div className={styles.originFilterBody}>
                            
                            {originOp.map(origin => (
                                <button className={styles.tempToggle} onClick={() => originToggleHandler(origin)}>
                                <div className={styles.checkbox}>
                                    <FontAwesomeIcon icon={originFilter.id === origin.id ? faCircleCheck : faCircle} size='lg' fixedWidth />
                                </div>
                                <div className={styles.toggleName}>{origin.name}</div>
                            </button>
                            ))
                            }       
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    </>
          
    
  )
}

export default OrderAndFilter