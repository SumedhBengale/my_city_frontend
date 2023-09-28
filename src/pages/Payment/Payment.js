import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from '../../config/config'
import "./Payment.css";
import CheckoutForm from "./CheckoutForm";
import { useLocation, useNavigate } from "react-router-dom";
import { createIntent, retrieveQuote } from "./api";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState("");



  const createPaymentIntent = async (quote) => {
    const response = await createIntent(quote);
    console.log("INTENT", response)
    setClientSecret(response.clientSecret);
  }

  useEffect(() => {
    const paymentActive = localStorage.getItem('paymentActive');
    // if (paymentActive === 'false') {
    //   //redirect to homepage and remove the history
    //   localStorage.getItem('luxe') === true ? window.history.replaceState(null, null, "/luxe") : window.history.replaceState(null, null, "/")

    //   return
    // }
    //Get the quoteId from url
    const quoteId = location.state.quote ? location.state.quote : null;
    if (!quoteId) {
      window.history.back();
      return
    }
    retrieveQuote(quoteId).then((quote) => {
      console.log("Quote", quote)
      if (quote.quote.reservationId) {
        console.log("Quote already reserved")
        localStorage.setItem('paymentActive', false);
        localStorage.getItem('luxe') === true ? navigate('/luxe', { replace: true }) : navigate('/', { replace: true })
      } else {
        createPaymentIntent(
          quote.quote
        );
      }
    })

  }, [location.state.quote]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex h-full 2xl:h-screen w-full justify-center items-center px-5 pt-10">
      <div className="w-[400px]">
        {clientSecret && stripePromise && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm quoteId={location.state.quote} />
          </Elements>
        )}</div>
    </div>
  );
}