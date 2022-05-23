import React, { Fragment, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import './MovieList.css'
import { useSelector,useDispatch } from 'react-redux';
import {
    clearErrors,
    deleteOrder,
    getAllOrders,
    

} from  "../../actions/orderAction";

import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import MetaData from '../layout/MetaData';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';

const OrderList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {error,orders} = useSelector((state)=>state.allOrders);

    const {error:deleteError,isDeleted} = useSelector((state)=>state.order)

    const deleteOrderHandler = (id) =>{
       dispatch(deleteOrder(id));
    };

    useEffect(()=>{

        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }

        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if(isDeleted){
            alert.success("Order Deleted Sucessfully");
            window.location.href="/admin/orders";
            dispatch({type:DELETE_ORDER_RESET});
        }

        dispatch(getAllOrders());
    },[dispatch,alert,error,deleteError,isDeleted]);

    const columns =[
        {field:"id",headerName:"Booking ID",minWidth:300,flex:1},
        {field:"status",headerName : "Status",minWidth:150,flex:0.5,cellClassName:(params)=>{
            return params.getValue(params.id,"status") === "Delivered" ? "greenColor":"redColor";
        }},
        {field:"quantity",headerName:"Movies Booked",type:"number",minWidth:310,flex:0.3},
        {field:"price",headerName:"Amount",type:"number",minWidth:270,flex:0.5},
        {field:"actions",headerName:"Action",type:"number",minWidth:150,flex:0.3,sortable:false,
        renderCell:(params)=>{
            return(
                <Fragment>
                <Link to={`/admin/order/${params.getValue(params.id,"id")}`}>
                <EditIcon/>
                </Link>
                <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}>
                    <DeleteIcon/>
                </Button>
                </Fragment>
            );

        },
    }
    ];

  
    const rows=[];

    orders && 
        orders.forEach((item,index) => {
            rows.push({
                
                id:item._id,
                quantity:item.orderItems.length,
                price:item.totalPrice,
                status:item.orderStatus,
            });
        });
  return (
    <Fragment>
        <MetaData title="{'ALL BOOKINGS -Admin'}"/>
        <div className='dashboard'>
            <Sidebar/>
            <div className='movieListContainer'>

                <h1 id="movieListHeading">ALL BOOKINGS</h1>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='movieListTable'
                    autoHeight

                />
            </div>

        </div>
    </Fragment>
  )
}

export default OrderList;