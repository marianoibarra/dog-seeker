import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDogs, getTemperaments, setTotalPages } from "../../redux/actions";
import styles from "./Homepage.module.css";
import DogCard from "../../components/DogCard/DogCard";
import Paginate from "../../components/Paginate/Paginate";
import OrderAndFilter from "../../components/OrderAndFilter/OrderAndFilter";
import { dogsPerPage } from "../../redux/constants/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

const Homepage = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const dogsToDisplay = useSelector((state) => state.dogsToDisplay);
  const imgsStack = useSelector((state) => state.imgsStack);
  const page = useSelector((state) => state.page);
  const location = useLocation();
  const [random, setRandom] = useState(Array.from({length: 8}, () => Math.random()))
  const backFromRoutes =
    location.state && location.state.backFromRoutes === true ? true : false;
  const refCardsContainer = useRef();

  useEffect(() => {
    if (dogs.length === 0) {
      dispatch(getDogs());
      dispatch(getTemperaments());
    }
  }, []);

  useEffect(() => {
    dispatch(setTotalPages());
  }, [dogsToDisplay]);

  useEffect(() => {
    refCardsContainer.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
      <main className={styles.main}>
        <Helmet>
          <title>Dog Seeker | Home</title>
        </Helmet>
        <section className={styles.filters}>
          <OrderAndFilter />
        </section>
        <section ref={refCardsContainer} className={styles.cardsContainer}>
          {dogsToDisplay.length > 0
            ? dogsToDisplay
                .slice(dogsPerPage * (page - 1), dogsPerPage * page)
                .map((dog, k) => 
                    <DogCard seed={random[k]} dog={dog} key={dog ? `dog-${dog.id}` : k} />
                )
            : <div className={styles.notFoundWrapper}>
                <FontAwesomeIcon icon={faHeartBroken} size="6x" />
                <h4>No results found</h4>
                <p>Please try with anothers keywords or filters</p>
              </div>
            
          }
        </section>
        <section
          style={backFromRoutes ? { animation: "none" } : {}}
          className={styles.paginate}
        >
          <Paginate />
        </section>
      </main>
  );
};

export default Homepage;
