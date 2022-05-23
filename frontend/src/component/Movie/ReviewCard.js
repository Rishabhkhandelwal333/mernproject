import React from "react";
import profilePng from "../../images/Profile.png";
import {Rating} from '@mui/material';

const ReviewCard = ({ review,numOfReviews }) => {
  const options = {
    value:review.rating,
    readOnly:true,
    size:"large",
    precision:0.5,
  };


  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options}/> <span>({numOfReviews})reviews</span>
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
