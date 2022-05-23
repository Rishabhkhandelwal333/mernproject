import React, { Fragment, useState } from 'react';
import "./Header.css"
import { SpeedDial ,SpeedDialAction, Backdrop} from '@mui/material';
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {logout} from "../../../actions/userAction";
import {useDispatch,useSelector} from "react-redux";
require ("../../../images/Profile.png");

const UserOptions = ({user}) =>{

    const {cartItems} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    const [open,setOpen] = useState(false);
    const options = [
        {icon:<ListAltIcon/>,name:"Orders",func:orders},
        
        {icon:<PersonIcon/>,name:"Profile",func:account},
        

        {icon:<ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato":"unset"}}/>,name:`Cart(${cartItems.length})`,func:Cart},

        {icon:<ExitToAppIcon/>,name:"Logout",func:logoutUser},

        

    ];


   if(user.role ==="admin"){
       options.unshift({icon :<DashboardCustomizeRoundedIcon/>,name:"DashBoard",func:dashboard});
   }
   function dashboard(){
       window.location.href="/admin/dashboard";
   }
   function orders(){
    window.location.href="/orders";
}
function account(){
    window.location.href="/account";
}
function logoutUser(){
   dispatch(logout());
   console.log("Looged out");

}
function Cart(){
    window.location.href="/cart";
}
    return <Fragment>
        <Backdrop open={open} style={{zIndex :"10" }}/>
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={()=>setOpen(false)}
                onOpen={()=>setOpen(true)}
                open={open}
                style={{zIndex: "11"}}
                direction="down"
                className='speedDial'
                icon={<img
                className='speedDialIcon'
                src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                alt="Profile"
                
                />}
           > 
           {options.map((item)=>(
               <SpeedDialAction icon={item.icon} key={item.name}tooltipTitle={item.name} onClick={item.func}/>
           ))}
          
     
           </SpeedDial>
    </Fragment>

};

export default UserOptions;