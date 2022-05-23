import { Step, StepLabel, Stepper, Typography } from '@mui/material';
import React, { Fragment } from 'react'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import "./CheckoutSteps.css";

const CheckoutSteps = ({activeSteps}) => {   

    console.log(activeSteps);

    const steps = [
            {
                label: <Typography>Ticket Details</Typography>,
                icon :<LocalShippingIcon/>,

            },
            {
                label: <Typography>Confirm Ticket</Typography>,
                icon :<LibraryAddCheckIcon/>,

            },
            {
                label: <Typography>Payment</Typography>,
                icon :<AccountBalanceIcon/>,

            },
         ];

         const stepStyles ={
             boxSizing :"border-box",
         };

  return (
        <Fragment>
            <Stepper
            alternativeLabel
            activeStep={activeSteps}
            style={stepStyles}
            >
                {steps.map((item,index)=>(
                    <Step
                    key={index}
                    active={activeSteps === index ? true : false}
                    completed={activeSteps >= index ? true : false}
                    >
                    <StepLabel
                    style={{
                        color : activeSteps  >= index ? "tomato" : "rgba(0,0,0,0.649)",
                    }}
                    icon={item.icon}
                    >
                    {item.label}
                    </StepLabel>
                    </Step>
                ))}


            </Stepper>

        </Fragment>    
  )
}

export default CheckoutSteps