import React, { Fragment ,useEffect} from 'react';
import "./orderDetails.css"
import { useSelector,useDispatch } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import {clearErrors,getOrderDetails} from '../../actions/orderAction'


const OrderDetails = () => {

  const {order,error,loading} = useSelector((state)=>state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  const {id} = useParams();
  
  useEffect(()=>{
      if(error){
        alert.error(error)
        dispatch(clearErrors());
      }
      dispatch(getOrderDetails(id));

  },[dispatch,alert,error,id]);
  return <Fragment>

      {loading ?  <Loader/> : <Fragment> 
        <MetaData title="Ticket Details"/>
        <div className='orderDetailsPage'>
            <div className='orderDetailsContainer'>
              <Typography component="h1">
                  Ticket #{order && order._id}
              </Typography>
                <div className='orderDetailsContainerBox'>
                  <div>
                      <p>Name :</p>
                      <span>{order.user && order.user.name}</span>

                  </div>

                  <div>
                      <p>Phone :</p>
                      <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>

                  </div>
                 
                  <div>
                      <p>Address :</p>
                      <span>{order.shippingInfo && 
                      `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.pinCode}`}
                      
                      </span>

                  </div>

                </div>
                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                    className={
                      order.paymentInfo &&
                          order.orderStatus === "TicketBooked"
                          ? "greenColor"
                          : "redColor"
                    }

                    >
                      {order.paymentInfo && 
                      order.paymentInfo.status === 'succeeded'
                      ?"PAID"
                      :"NOT PAID"}

                    </p>
                  </div>
                  <div>
                    <p>Amount : </p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                <Typography>Ticket Status</Typography>
                <div className='orderDetailsContainerBox'>
                  <div>
                    <p
                           className={
                            order.orderStatus &&
                                order.orderStatus === "TicketBooked"
                                ? "greenColor"
                                : "redColor"
                          }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
                  </div>
                </div>
            </div>
            <div className='orderDetailsCartItems'>
              <Typography>Booked Movies :</Typography>
              <div className='orderDetailsCartItemsContainer'>
                {order.orderItems &&
                   order.orderItems.map((item)=> (
                  <div key={item.movie}>
                    <img src={item.image} alt="movie"/>
                    <Link to={`/movie/${item.movie}`}>
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} X ₹{item.price} = {""}
                      <b>₹ {item.price * item.quantity}</b>
                    </span>
                    
                   </div>
                   ))}

            </div>
          </div>
        </div>

        </Fragment>}
        
    </Fragment>

  
  
};

export default OrderDetails