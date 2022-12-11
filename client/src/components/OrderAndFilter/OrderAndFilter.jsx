import React, { useRef, useState } from 'react'
import styles from './OrderAndFilter.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faArrowDown19, faArrowDownAZ, faArrowUp91, faArrowUpZA, faCircleCheck, faFilter } from "@fortawesome/free-solid-svg-icons"
import { faCircle } from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { originOp } from '../../redux/constants/index'
import { orderOp } from '../../redux/constants/index'
import {orderDogs, filterDogs} from '../../redux/actions/index'
import TemperamentsSelect from '../TemperamentsSelect/TemperamentsSelect'

const OrderAndFilter = () => {

    const order = useSelector(state => state.order)
    const filterByTemperament = useSelector(state => state.filterByTemperament)
    const filterByOrigin = useSelector(state => state.filterByOrigin)
    const dispatch = useDispatch()
    const [filterIsOpen, setFilterIsOpen] = useState(false)
    const [orderIsOpen, setOrderIsOpen] = useState(false)
    const orderWrapperRef = useRef()
    const filterWrapperRef = useRef()

    const orderIcon = [faArrowDownAZ, faArrowUpZA, faArrowDown19, faArrowUp91]

    const orderHandler = (order) => {
        dispatch(orderDogs(order))
        setOrderIsOpen(false)
    }

    const originToggleHandler = (origin) => {
        if(filterByOrigin.id !== origin.id) {
            dispatch(filterDogs(undefined, origin))
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
                <span className={styles.orderIcon}><FontAwesomeIcon icon={orderIcon[order.id]} size='lg' fixedWidth /></span>
                <span>ORDER BY</span>
                <FontAwesomeIcon icon={faAngleDown} size='1x' fixedWidth />
            </button>
            
            <div className={orderIsOpen ? styles.orderDropdownOpen : styles.orderDropdownClosed}>
                <div className={styles.orderDropdownBody}>
                    {orderOp.map((o, i) => (
                        <button className={styles.option} key={i} onClick={() => orderHandler(o)}>
                            <FontAwesomeIcon icon={orderIcon[i]} size='lg' fixedWidth />
                            <span className={styles.orderName} style={o.id == order.id ? {fontWeight: '800'} : {}}>{o.name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        <div ref={filterWrapperRef} className={styles.toggles}>

            <button onClick={() => setFilterIsOpen(!filterIsOpen)} className={`${filterIsOpen ? `${styles.button} ${styles.open}` : `${styles.button} ${styles.closed}`}`}>                
                {
                    filterByTemperament.length > 0 || filterByOrigin.id !== 0
                        ?   <div className={styles.filterCount}>{filterByTemperament.length + (filterByOrigin.id !== 0 && 1)}</div>
                        :   <span className={styles.filterIcon}><FontAwesomeIcon icon={faFilter} size='lg' fixedWidth /></span>
                }
                <span>FILTER BY</span>
                <FontAwesomeIcon icon={faAngleDown} size='1x' fixedWidth/>
            </button> 

            <div className={filterIsOpen ? styles.filterDropdownOpen : styles.filterDropdownClosed}>
                <div className={styles.filterDropdownBody}>
                    <div className={styles.temperamentsWrapper}>
                        <TemperamentsSelect filtering={true}/>
                    </div>
                    <div className={styles.filterByOriginWrapper}>
                        <div className={styles.filterTitle}>
                            Origin
                        </div>
                        <div className={styles.filterByOriginBody}>
                            {originOp.map(origin => (
                                <button className={styles.originToggle} onClick={() => originToggleHandler(origin)}>
                                    <div className={styles.checkbox}>
                                        <FontAwesomeIcon icon={filterByOrigin.id === origin.id ? faCircleCheck : faCircle} size='lg' fixedWidth />
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