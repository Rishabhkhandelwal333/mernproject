import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import MovieCard from "./MovieCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getMovie } from "../../actions/movieAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";



const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, movies } = useSelector((state) => state.movies);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getMovie());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="BookMyShow" />

          <div className="banner">
            <p>Welcome to Book My Show</p>
            <h1>FIND AMAZING MOVIES BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Movies</h2>

          <div className="container" id="container">
            {movies && movies.map((movie)=>
              <MovieCard movie={movie} key={movie._id}/>
            )}
         </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
