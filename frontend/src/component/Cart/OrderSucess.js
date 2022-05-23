import React from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./orderSuccess.css";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const OrderSucess = () => {
  return (
    <div className='orderSuccess'>
      <CheckCircleIcon></CheckCircleIcon>
        <Typography>Your Movie tickets has been  Booked Successfully :-)</Typography>
        <Link to="/orders">View Tickets</Link>
        </div>
  )
}

export default OrderSucess;