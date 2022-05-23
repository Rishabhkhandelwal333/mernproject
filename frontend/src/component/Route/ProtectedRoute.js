import { React,Fragment} from "react"; 
import { useSelector } from "react-redux";
import { Routes,Route ,Navigate} from "react-router-dom";


export const ProtectedRoute = ({ children }) => {

    const {loading,isAuthenticated,user}=useSelector((state)=>state.user);

    return
    if(!loading){
    
    if(!isAuthenticated){
        return  <Navigate to="/login" />;
    }
   else{
       return children;
   }
    }
};


export default ProtectedRoute