import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import config from '../../config/config'
import "./Payment.css";
import CheckoutForm from "./CheckoutForm";
import { useLocation } from "react-router-dom";
import { createIntent } from "./api";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(config.STRIPE_PUBLISHABLE_KEY);

export default function Payment() {
    const location = useLocation();
  const [clientSecret, setClientSecret] = useState("");

  const createPaymentIntent = async (quote) => {
    const response = await createIntent(quote);
    setClientSecret(response.clientSecret);
}

  useEffect(() => {
    //Get the quoteId from url
    const quote = location.state.quote ? location.state.quote : null;
    if(!quote){
        window.history.back();
        return
    }
    console.log(quote)
    createPaymentIntent(quote);
      
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="flex h-screen w-full justify-center items-center">
        <div className="w-[400px]">
      {clientSecret && stripePromise && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}</div>
    </div>
  );
}