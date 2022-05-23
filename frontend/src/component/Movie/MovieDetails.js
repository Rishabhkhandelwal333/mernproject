import React, { Fragment, useEffect, useState } from "react";
import "./MovieDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors,getMovieDetails, newReview} from "../../actions/movieAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import MetaData from '../layout/MetaData';
import {addItemsToCart} from "../../actions/cartAction";
import { useNavigate } from 'react-router-dom';


import {
  Dialog ,
  DialogActions,
  DialogContent, 
  DialogTitle,
  Button,
  Rating,} from '@mui/material';
import { NEW_REVIEW_RESET } from "../../constants/movieConstant";


const MovieDetails = () => {
  
  const navigate = useNavigate();
  

  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams();

  const { movie, loading, error } = useSelector(
    (state) => state.movieDetails
  );

  const { success,error : reviewError } = useSelector(
    (state) => state.newReview
  );
  
  const options = {
    value:movie.ratings,
    readOnly:true,
    size:"large",
    precision:0.5,
  };


  const[quantity,setQuantity]=useState(1);
  const[open,setOpen]=useState(false);
  const[rating,setRating]=useState(0);
  const[comment,setComment]=useState("");


 
   
  const increaseQuantity=()=>{
    if(movie.seats <= quantity)
     return;
    const qty = quantity+1;
    setQuantity(qty);
  };


  const decreaseQuantity=()=>{
    if(1 >= quantity)
    return;
    const qty = quantity-1;
    setQuantity(qty);
  };

  const addToCartHandler = ()=>{
    dispatch(addItemsToCart(id,quantity));
    alert.success("Item Added to Cart");
    navigate('/cart');
  };
   
  const submitReviewToggle = () =>{
     open ? setOpen(false) : setOpen(true);
  }

  const reviewSubmitHanlder = ()=>{
    const myform = new FormData();
    myform.set("rating",rating);
    myform.set("comment",comment);
    myform.set("movieId",id);

    dispatch(newReview(myform));
    setOpen(false);
  }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }
    if(success){
      alert.success("Review Submitted Sucessfully");
      dispatch({type:NEW_REVIEW_RESET});
    }
    dispatch(getMovieDetails(id));
  }, [dispatch, id, error, alert,reviewError,success]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title={`${movie.name} --BookMyShow`}/>
          <div className="MovieDetails">
          <div>
              { <img className="CarouselImage" src={(movie.images 
     && movie.images[0].url)} alt={"Movie picture"}/>} 
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{movie.name}</h2>
                <p>Movie # {movie._id}</p>
              </div>
              <div className="detailsBlock-2">
              <Rating {...options}/> 
                <span className="detailsBlock-2-span">
                  {" "}
                  ({movie.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${movie.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly  type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={movie.seats < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Book Movie
                  </button>
                </div>

                <p>
                  Status:
                  <b className={movie.seats < 1 ? "redColor" : "greenColor"}>
                    {movie.seats < 1 ? "House Full" : "Seats Available"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{movie.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
          aria-labelledby="simple-dialog-title"
          open={open}
          onClose={submitReviewToggle}
           >
             <DialogTitle>Submit Review</DialogTitle>
             <DialogContent className="submitDialog">
               <Rating
                onChange={(e)=>setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
              className="submitDialogTextArea"
              cols="30"
              rows="5"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}     
              ></textarea>
           </DialogContent>
           <DialogActions>
             <Button onClick={submitReviewToggle} color="secondary">Cancel</Button>
             <Button onClick={reviewSubmitHanlder}>Submit</Button>
           </DialogActions>

          </Dialog>
      {movie.reviews && movie.reviews[0] ?(
        <div className="reviews">
          {movie.reviews &&
           movie.reviews.map((review)=><ReviewCard review={review} numOfReviews={movie.numOfReviews}/>) }
        </div>
      ):(
        <p>No Reviews Yet :-(</p>
      )}
         
        </Fragment>
      )}
    </Fragment>
  );
};

export default MovieDetails;
