import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./TemperamentsSelect.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { getTemperaments } from "../../redux/actions";
import { filterDogs } from "../../redux/actions";

const TemperamentsSelect = ({ filtering, input, setInput }) => {
  const dispatch = useDispatch();
  const temperaments = useSelector(state => state.temperaments);
  const temperamentsIsFetching = useSelector(state => state.temperamentsIsFetching);
  const [tempToSearch, setTempToSearch] = useState("");

  const filterByTemperament = useSelector((state) => state.filterByTemperament);
  const setFilterByTemperament = (filter) => dispatch(filterDogs(filter));

  const tempToggleHandler = (e) => {
    e.stopPropagation();
    let value = e.target.children[1].innerText;
    if (filtering) {
      if (!filterByTemperament.some((t) => t === value)) {
        setFilterByTemperament([...filterByTemperament, value]);
      } else {
        setFilterByTemperament(filterByTemperament.filter((t) => t !== value));
      }
    } else {
      if (!input.temperament.some((t) => t === value)) {
        setInput({ ...input, temperament: [...input.temperament, value] });
      } else {
        setInput({
          ...input,
          temperament: input.temperament.filter((t) => t !== value),
        });
      }
    }
    setTempToSearch("");
  };

  useEffect(() => {
    !temperaments && dispatch(getTemperaments());
  });

  return (
    <>
      <div
        className={styles.filterHeader}
      >
        <div className={styles.filterTitle}>
          Temperaments
          {filtering
            ? filterByTemperament.length > 0 && (
                <div>{filterByTemperament.length}</div>
              )
            : input.temperament.length > 0 && (
                <div>{input.temperament.length}</div>
              )}
        </div>
        {temperaments.length > 0 && <div className={filtering ? styles.searchFilter : styles.searchFilter2}>
          <input
            className={styles.searchFilterInput}
            placeholder="Search..."
            type="text"
            name="filterByTemperament"
            id="inputfilterByTemperament"
            onChange={(e) => setTempToSearch(e.target.value.toLowerCase())}
            value={tempToSearch}
          />
        </div>}
      </div>
      <div className={styles.tempCont}>
        {temperamentsIsFetching ? (
          <span className={styles.nothing}>Loading temperaments...</span>
        ) : temperaments &&
          temperaments.filter((t) =>
            t.name.toLowerCase().startsWith(tempToSearch)
          ).length > 0 ? (
          temperaments
            .filter((t) => t.name.toLowerCase().startsWith(tempToSearch))
            .map((t) => (
              <button
                type="button"
                key={t.id}
                value={t.name}
                className={styles.tempToggle}
                onClick={tempToggleHandler}
              >
                <div className={styles.checkbox}>
                  {filtering ? (
                    <FontAwesomeIcon
                      icon={
                        filterByTemperament.some((f) => f == t.name)
                          ? faCheckSquare
                          : faSquare
                      }
                      size="lg"
                      fixedWidth
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={
                        input.temperament.some((f) => f == t.name)
                          ? faCheckSquare
                          : faSquare
                      }
                      size="lg"
                      fixedWidth
                    />
                  )}
                </div>
                <div className={styles.toggleName}>{t.name}</div>
              </button>
            ))
        ) : (
          <span className={styles.nothing}>No temperaments found :(</span>
        )}
      </div>
    </>
  );
};

export default TemperamentsSelect;
