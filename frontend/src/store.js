import {legacy_createStore as createStore ,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { movieReducer, movieReviesReducer, moviesReducer, newMovieReducer, newReviewReducer, reviewReducer} from "./reducers/movieReducer";
import  {movieDetailsReducer}  from "./reducers/movieReducer";
import { profileReducer, userReducer,forgotPasswordReducer, allUsersReducer, userDetailsReducer } from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from "./reducers/orderReducer";

const reducer = combineReducers({
    movies:moviesReducer,
    movieDetails:movieDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword :forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview: newReviewReducer,
    newMovie:newMovieReducer,
    movie:movieReducer,
    allOrders:allOrdersReducer,
    order:orderReducer,
    allUsers:allUsersReducer,
    userDetails:userDetailsReducer,
    movieReviews:movieReviesReducer,
    review:reviewReducer,
});

let intailState = {
    cart:{
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        :[],
        shippingInfo: localStorage.getItem("shippingInfo")
        ?JSON.parse(localStorage.getItem("shippingInfo"))
        :{},
    }
};

const middleware = [thunk];
const store = createStore(
    reducer,
    intailState,
    composeWithDevTools(applyMiddleware(...middleware)
    ));

export default store;    
