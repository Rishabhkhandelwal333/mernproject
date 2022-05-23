import Sidebar from './Sidebar.js'
import './dashboard.css'
import { Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import {Doughnut,Line} from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import React,{useEffect}  from 'react'
import {
    getAdminMovie

} from  "../../actions/movieAction";
import { useSelector,useDispatch } from 'react-redux';
import { Chart } from 'react-chartjs-2'
import { getAllUsers } from '../../actions/userAction.js';
import { getAllOrders } from '../../actions/orderAction.js';

ChartJS.register(...registerables);
const Dashboard = () => {

    const dispatch = useDispatch();
    const {movies} = useSelector((state)=>state.movies);
    
    const {orders} = useSelector((state)=>state.allOrders);
    
    const {users} = useSelector((state)=>state.allUsers);
    let outOfStock = 0;
   
    movies && 
      movies.forEach(item=> {
          if(item.seats === 0){
              outOfStock += 1;
          }
      });


      useEffect(()=>{
  
          dispatch(getAdminMovie());
          dispatch(getAllOrders());
          dispatch(getAllUsers());
      },[dispatch]);

      let totalAmount = 0;
      orders &&
          orders.forEach((item)=>{
              totalAmount += item.totalPrice;
          });
  
   
    const lineState = {
        labels :["Intial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(197,72,49)"],
                data:[0,totalAmount],

            },
        ],
    };

    const dougnutState = {
        labels :["HOUSEFULL "," AVAILABLE MOVIES"],
        datasets:[
            {
                backgroundColor : ['#00A6B4','#6800B4'],
                hoverBackgroundColor:["rgb(197,72,49)"],
                data:[outOfStock,movies.length - outOfStock],

            }
        ]

    };

  return (
    <div className='dashboard'>
         <Sidebar/>
        <div className='dashboardContainer'>
            <Typography component="h1">Dashboard</Typography>

        <div className='dashboardSummary'>
            <div>
                <p>
                    Total Profit Earned <br/>₹{totalAmount}
                </p>
            </div>
            <div className='dashboardSummaryBox2'>
                <Link to="/admin/movies">
                    <p>Movies</p>
                    <p>{movies && movies.length}</p>
                </Link>
                <Link to="/admin/orders">
                    <p>Orders</p>
                    <p>{orders && orders.length}</p>
                </Link>
                <Link to="/admin/users">
                    <p>Users</p>
                    <p>{users && users.length}</p>
                </Link>
                 
            </div>

            </div>    
            <div className='lineChart'>
                <Line
                    data={lineState}
                />

            </div>

            <div className='doughnutChart'>
                <Doughnut
                    data={dougnutState}
                />

            </div>

        </div>
    </div>
  );
};

export default Dashboard