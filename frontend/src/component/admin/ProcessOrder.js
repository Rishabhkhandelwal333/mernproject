import React, { Fragment,useEffect ,useState} from 'react'
import { useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import Sidebar from './Sidebar';
import {getOrderDetails,clearErrors, updateOrder} from "../../actions/orderAction";
import { useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import { Button } from '@mui/material';
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant';
import "./processOrder.css"
const ProcessOrder = () => {
    const{order,error,loading} = useSelector((state)=>state.orderDetails);
    const{user}=useSelector((state)=>state.user);

    const{shippingInfo}=useSelector((state)=>state.cart);

    
    const{error: updateError,isUpdated} = useSelector((state)=>state.order)
    

    const {id}= useParams();
    const ProcessBooking = (e)=>{

        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);
      
      
        dispatch(updateOrder(id,myForm));
    };

    const dispatch = useDispatch();
    const alert = useAlert();

    const [status,setStatus] = useState(""); 


    useEffect(()=>{
        if(error){
          alert.error(error);
          dispatch(clearErrors());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
          }
          if(isUpdated){
            alert.success("Ticket Booked Successfully ")
            dispatch({type:UPDATE_ORDER_RESET});
          }
          
        dispatch(getOrderDetails(id));
  
    },[dispatch,alert,error,id,isUpdated,updateError]);

  return (
    <Fragment>
    <MetaData title="Process Movie Ticket" />
    <div className='dashboard'>
        <Sidebar />
        <div className='newMovieContainer'>
          
    
       {loading ? (<Loader/>) : (<div
       style={{
        display:order.orderStatus === "TicketBooked" ? "block" : "grid",
      }}
       className='confirmOrderPage'>
           <div>
                <div className='confirmshippingArea'>
                    <Typography>Shipping Info</Typography>
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
                      <span>{
                      order.shippingInfo && 
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
                          order.paymentInfo.status === "succeeded"
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
                <div className='confirmCartItems'>
                    <Typography>Your Movie Tickets </Typography>
                    <div className='confirmCartItemsContainer'>
                        {order.orderItems &&
                           order.orderItems.map((item)=>(
                                <div key={item.movie}>
                                    <img src={item.image} alt="Movie"/>
                                    <Link to={`/movie/${item.movie}`}>
                                        {item.name}
                                    </Link>
                                    <span>
                                        {item.quantity} X ₹{item.price} ={"."}
                                        <b> ₹ {item.price * item.quantity}</b>
                                    </span>
                                    
                                </div>
                           ))}

                    </div>

                </div>
           </div>
          {/* */}
          <div
          
          style={{
            display:order.orderStatus === "TicketBooked" ? "none" : "block"
          }}
          >
                <form
                            className='updateOrderForm'
                            onSubmit={ ProcessBooking}

                        >
                            <h1>Process Ticket</h1>
                            <div>
                                <AccountTreeIcon />
                                <select  onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    <option value="TicketBooked">Confirm User Ticket </option>

                                </select>
                            </div>

                            <Button
                                id="createMovieBtn"
                                type="submit"
                                disabled={loading ? true : false || status === "" ? true : false}
                            >
                                Update Status
                            </Button>

                        </form>


          </div>
       </div>
)}
        </div>

    </div>
</Fragment>
     
   
  );
};

export default ProcessOrder