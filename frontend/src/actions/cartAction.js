import {ADD_TO_CART, REMOVE_CART_ITEM,SAVE_SHIPPING_INFO} from "../constants/cartConstant";
import axios from "axios";

//Add to cart

export const addItemsToCart = (id,quantity) => async(dispatch,getState)=>{
    
       const {data} = await axios.get(`/api/v1/movie/${id}`);
       const pic = data.movie.images && data.movie.images[0].url

        dispatch({
            type:ADD_TO_CART
            ,payload:{
                movie : data.movie._id,
                name:data.movie.name,
                price:data.movie.price,
                image:pic,
                seats:data.movie.seats,
                quantity,
              },

        });
    
    localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};

//Remove from cart

export const removeItemsFromCart = (id) => async(dispatch,getState)=>{


     dispatch({
         type:REMOVE_CART_ITEM,
         payload:id,        
     });
 
 localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
};

// save shiping info



export const saveShippinhInfo = (data) => async(dispatch,getState)=>{


    dispatch({
        type:SAVE_SHIPPING_INFO,
        payload:data,        
    });

localStorage.setItem("shippingInfo",JSON.stringify(data));
};