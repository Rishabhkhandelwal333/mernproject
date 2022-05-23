import React, { Fragment, useState } from 'react'
import "./Shipping.css"
import { useSelector,useDispatch } from 'react-redux'
import {saveShippinhInfo} from '../../actions/cartAction'
import MetaData from '../layout/MetaData'
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PhoneIcon from '@mui/icons-material/Phone';
import { useAlert } from 'react-alert'
import CheckoutSteps from '../Cart/CheckoutSteps.js'

const Shipping = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {shippingInfo} = useSelector((state)=> state.cart);


    const[address,setAddress]= useState(shippingInfo.address);
    const[city,setCity]= useState(shippingInfo.city);
    const[pinCode,setPinCode]= useState(shippingInfo.pinCode);
    const[phoneNo,setPhoneNo]= useState(shippingInfo.phoneNo);

    const shippingSubmit = (e)=>{
      e.preventDefault();
      if(phoneNo.length < 10 || phoneNo.length > 10){
        alert.error("Phone number should be 10 digits Long");
        return;
      }
      dispatch(
        saveShippinhInfo({address,city,pinCode,phoneNo})
      );
      window.location.href="/order/confirm";
    };

  return (
    <Fragment>
        <MetaData title="Movie Ticket Details"/>

        <CheckoutSteps activeSteps={0} />

        <div className='shippingContainer'>
            <div className='.shippingBox'>
                <h2 className='shippingHeading'>Ticket Details</h2>

                <form 
                    className='shippingForm'
                    encType='multipart/form-data'
                    onSubmit={shippingSubmit}
                 >
                     <div>
                         <HomeIcon/>
                         <input
                           type="text"
                           placeholder="Address"
                           required
                           value={address}
                           onChange={(e)=>setAddress(e.target.value)}
                        />
                     </div>

                     <div>
                         <LocationCityIcon/>
                         <input
                           type="text"
                           placeholder="City"
                           required
                           value={city}
                           onChange={(e)=>setCity(e.target.value)}
                        />
                     </div>

                     <div>
                         <PinDropIcon/>
                         <input
                           type="number"
                           placeholder="Pin-Code"
                           required
                           value={pinCode}
                           onChange={(e)=>setPinCode(e.target.value)}
                        />
                     </div>

                     <div>
                         <PhoneIcon/>
                         <input
                           type="number"
                           placeholder="Phone-Number"
                           required
                           value={phoneNo}
                           onChange={(e)=>setPhoneNo(e.target.value)}
                           size="10"
                        />
                     </div>
                   <input
                   
                        type="submit"
                        value="Continue"
                        className="shippingBtn"
                        disabled ={phoneNo ? false : true}
                   
                   />

                </form>
                
            </div>
        </div>
    </Fragment>
    )
}

export default Shipping