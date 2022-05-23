import React from 'react'
import { Fragment,useEffect } from 'react'   
import { DataGrid } from '@mui/x-data-grid';
import "./myOrders.css";
import { useSelector,useDispatch } from 'react-redux';
import { clearErrors,myOrders } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import LaunchIcon from '@mui/icons-material/Launch';
const MyOrders = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const{loading,orders,error} = useSelector((state)=>state.myOrders);
    const {user} = useSelector((state)=>state.user);
    const columns =[
        {field:"id",headerName:"Booking ID",minWidth:300,flex:1},
        {field:"status",headerName : "Status",minWidth:150,flex:0.5,cellClassName:(params)=>{
            return params.getValue(params.id,"status") === "TicketBooked" ? "greenColor":"redColor";
        }},
        {field:"movies_qty",headerName:"Movies",type:"number",minWidth:150,flex:0.3},
        {field:"amount",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
        {field:"actions",headerName:"Action",type:"number",minWidth:100,flex:0.3,sortable:false,
        renderCell:(params)=>{
            return(
                <Link to={`/order/${params.getValue(params.id,"id")}`}>
                <LaunchIcon/>
                </Link>
                
            );

        },
    }
    ];
    const rows=[];

    orders && 
        orders.forEach((item,index) => {
            rows.push({
                movies_qty:item.orderItems.length,
                id:item._id,
                status:item.orderStatus,
                amount:item.totalPrice,


            });
        });
    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors())
        }
        dispatch(myOrders());
    },[dispatch,alert,error])
  return (
      <Fragment>
          <MetaData title={`${user.name} -Bookings`}/>
          {loading ? (
              <Loader/>
          ):(
              <div className='myOrdersPage'>
                  <DataGrid 
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='myOrdersTable'
                    autoHeight
                  />
  
                <Typography id='myOrdersHeading'>{user.name}'s Bookings</Typography>
              </div>
          )}


      </Fragment>
     );
};

export default MyOrders