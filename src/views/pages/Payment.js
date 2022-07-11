import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import DefaultFooter from "../../components/Footers/DefaultFooter.js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51KlAAhJdFP0i1eQkONC3MXzirFPIIHcwYWUZ5GgTSvcskNihzfJie31tWEETcKaffeDw20pfM3Pxjtq054j6rX1n00Ym08yxbg");

const successMessage = () => {
  return (
    <div className="success-msg">
      <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
      </svg>
      <div className="title">Payment Successful</div>
    </div>
  )
}


function PaymentPage() {
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    return (
        <>
            <IndexNavbar />
            <div className="wrapper">
                <section style={{padding:"40px",backgroundColor:"#172324"}}>
                    <div className="container">        
                        <div className="row h-100">
                            <div className="col-md-6 offset-md-3">
                                {paymentCompleted ? successMessage() : (<>
                                
                                <div className="col-md-12" style={{border:"4px solid #2C5F5B",backgroundColor:"#ffffff", padding: "30px", borderRadius:"20px"}}>
                                    <Elements stripe={stripePromise}>
                                    <CheckoutForm amount={2000} setPaymentCompleted={setPaymentCompleted} />
                                    </Elements>
                                </div>
                                </>)}
                            </div>

                        </div>
                    </div>
                </section>
                <DefaultFooter />
            </div>
        </>
    );
}

export default PaymentPage;