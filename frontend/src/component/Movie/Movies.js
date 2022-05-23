import React, { Fragment, useEffect, useState } from 'react';
import  './Movies.css';
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors,getMovie } from '../../actions/movieAction';
import Loader from '../layout/Loader/Loader';
import MovieCard from '../Home/MovieCard';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import{useAlert} from "react-alert";
import MetaData from '../layout/MetaData';


const genres = [
    "Comedy",
    "Science",
    "Sports",
    "Horror",
    "Action",
    "Love"
];


const Movies = () =>{

    const { keyword } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage,setCurrentPage]=useState(1);
    
    const [price,setPrice]=useState([0,500]);
    const [genre,setGenre]=useState("");
    const[ratings,setRatings] = useState(0);


    const {movies,loading,error,movieCount,resultPerPage } = useSelector(state => state.movies);
  
    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }
    const priceHandler = (event,newPrice) =>{
        setPrice(newPrice);
    }
    useEffect (()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
           dispatch(getMovie(keyword,currentPage,price,genre,ratings));
    },[dispatch,keyword,currentPage,price,genre,ratings,error,alert]);

 

    return(
        <Fragment> {loading?<Loader/> : 
        <Fragment>
            <MetaData title="MOVIES -- BookyMyShow"/>
            <h2 className='moviesHeading'> Movies </h2>
            <div className='movies'>
                
                 {movies && 
                  movies.map((movie)=>(

                    <MovieCard key={movie._id} movie={movie}/>
                  ))}

            </div>
             <div className='filterBox'>
                <Typography>Price </Typography>
                <Slider
                   value={price}
                   onChange={priceHandler}
                   valueLabelDisplay="auto"
                   aria-labelledby='range-slider'
                   min={0}
                   max={500}


                />

            <Typography>Genre </Typography>
            <ul className='categoryBox'>
                {
                 genres.map((genre)=>(
                        <li
                            className="category-link"
                            key={genre}
                            onClick={()=>setGenre(genre)}
                         
                        >
                               {genre}
                        </li>
                    ))
                }

            </ul>
            <fieldset>
            <Typography component="legend">Ratings Above </Typography>
            <Slider
                value={ratings}
                onChange={(e,newRating)=>{
                    setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay='auto'
                min={0}
                max={5}
                />


            </fieldset>
            </div>

                          {resultPerPage < movieCount && (<div className='paginationBox'>
                <Pagination 
                   activePage={currentPage}
                   itemsCountPerPage ={resultPerPage}
                   totalItemsCount={movieCount}
                   onChange={setCurrentPageNo}
                   nextPageText="Next"
                   prevPageText="Prev"
                   firstPageText="1st"
                   lastPageText="Last"
                   itemClass ="page-item"
                   linkClass="page-link"
                   activeClass = "pageItemActive"
                   activeLinkClass="pageLinkActive"
                />
            </div>)}
            

                
            </Fragment> }
        </Fragment>
    );
}

export default Movies;