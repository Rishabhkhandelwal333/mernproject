import React from 'react'
import {Link} from "react-router-dom";
import { Rating } from '@mui/material';

const MovieCard = ({movie}) =>{
    const options = {
        value:movie.ratings,
        readOnly:true,
        size:"small",
        precision:0.5,
      };
    
    
    
    return(
       <Link className='movieCard' to={`/movie/${movie._id}`}>
           <img src={movie.images[0].url} alt={movie.name}/>
           <p>{movie.name}</p>
           <div>
               <Rating {...options}/> <span className='movieCardSpan'>({movie.numOfReviews})reviews</span>
           </div>
           <span>{`₹${movie.price}`}</span>
            
       </Link>
    );
};
export default MovieCard; 