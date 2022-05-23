import './App.css';
import Header from './component/layout/Header/Header.js';
import Footer from './component/layout/Footer/Footer.js';
import {BrowserRouter,Route, Routes} from "react-router-dom";
import WebFont from "webfontloader";
import React, { useEffect } from 'react';
import Home from "./component/Home/Home";
import MovieDetails from "./component/Movie/MovieDetails.js";
import Movies from  './component/Movie/Movies.js';
import Search from './component/Movie/Search.js';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store"
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions.js"
import { useSelector} from 'react-redux';
import Profile from "./component/User/Profile.js"
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword  from"./component/User/ResetPassword.js"
import Cart from './component/Cart/Cart.js'
import Shipping from './component/Cart/Shipping.js'
import ConfirmOrder from './component/Cart/ConfirmOrder.js'
import Payment from './component/Cart/Payment.js'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSucess.js'
import MyOrders from './component/Order/MyOrders'
import OrderDetails from './component/Order/OrderDetails.js'
import Dashboard from './component/admin/Dashboard.js'
import MovieList from './component/admin/MovieList.js'
import NewMovie from './component/admin/NewMovie';
import UpdateMovie from './component/admin/UpdateMovie.js'
import OrderList from './component/admin/OrderList.js'
import ProcessOrder from './component/admin/ProcessOrder.js'
import UsersList from './component/admin/UsersList.js'
import UpdateUser from './component/admin/UpdateUser.js'
import MovieReviews from './component/admin/MovieReviews.js'


function App() {

  const { isAuthenticated ,user } = useSelector(
    (state) => state.user
  );

  
   let key = "pk_test_51KvllCSCZua1qhgcr4oYLsQWMb0DjnCswwyZBX6e7ZUJa4lq1tlWNaPzAqJvUFLOuA0Uxpb2L4CW2TPHGcaLKvAS00viNkzvfC";
  
 

 

useEffect(()=>{
  WebFont.load({
    google:{
      families:["Roboto","Droid Sans","Chilanka"],
    },
  });

 
    store.dispatch(loadUser());
  
},[]);
  return (
    
    <Elements stripe={loadStripe(key)}>
    
    <BrowserRouter>
  
    <Header/>
    {isAuthenticated && <UserOptions user={user}/>}
    <Routes>
    <Route exact path="/" element={<Home/>}/>
    
    <Route exact path="/movie/:id" element={<MovieDetails/>}/>
    
    <Route exact path="/movies" element={<Movies/>}/>

    {isAuthenticated && <Route  exact path="/account" element={ <Profile/> }/>}
    
    {isAuthenticated && <Route  exact path="/me/update" element={<UpdateProfile/>}/>}
    
    {isAuthenticated && <Route  exact path="/password/update" element={<UpdatePassword/>}/>}

    {isAuthenticated && <Route exact path='/shipping' element={<Shipping/>}/>}

    
    {isAuthenticated && <Route exact path='/order/confirm' element={<ConfirmOrder/>}/>}

    
    {isAuthenticated &&  <Route exact path='/process/payment' element={<Payment/>}/>}

       
      
    {isAuthenticated &&  <Route exact path='/success' element={<OrderSuccess/>}/>}


    
    {isAuthenticated &&  <Route exact path='/orders' element={<MyOrders/>}/>}
       
   
    {isAuthenticated &&  <Route exact path='/order/:id' element={<OrderDetails/>}/>}


    {isAuthenticated &&  <Route exact path='/admin/dashboard' element={<Dashboard/>}/>}


    
    {isAuthenticated &&  <Route exact path='/admin/movies' element={<MovieList/>}/>}


    
    {isAuthenticated &&  <Route exact path='/admin/movie' element={<NewMovie/>}/>}
    

    
    {isAuthenticated &&  <Route exact path='/admin/movie/:id' element={<UpdateMovie/>}/>}

    
    {isAuthenticated &&  <Route exact path='/admin/orders' element={<OrderList/>}/>}
    
    
    {isAuthenticated &&  <Route exact path='/admin/order/:id' element={<ProcessOrder/>}/>}

    
    
    {isAuthenticated &&  <Route exact path='/admin/users' element={<UsersList/>}/>}


    
    {isAuthenticated &&  <Route exact path='/admin/user/:id' element={<UpdateUser/>}/>}


    
    {isAuthenticated &&  <Route exact path='/admin/reviews' element={<MovieReviews/>}/>}
    
       
    
    <Route  exact path="/password/forgot" element={<ForgotPassword/>}/>
    
    <Route  exact path="/password/reset/:token" element={<ResetPassword/>}/>
    
    <Route  path="/movies/:keyword" element={<Movies/>}/>
    <Route exact path="/search" element={<Search/>}/>
    <Route exact path="/login" element={<LoginSignUp/>}/>

    <Route exact path="/cart" element={<Cart/>}/>


    </Routes>
    <Footer/>

    </BrowserRouter>
  
    </Elements>
      
      

   
  );
}

export default App;
