import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const CheckoutForm = (quoteId) => {
  console.log(quoteId);
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${
            window.location.origin
          }/payment/success?quoteId=${encodeURIComponent(quoteId.quoteId)}`,
        },
      })
      .then((res) => {
        console.log("ID", res);
      });

    if (error) {
      toast.error(error.message);
      console.log(error);
    }

    setIsLoading(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <LinkAuthenticationElement
          options={{
            type: "email",
            placeholder: "Email",
            mode: "billing",
          }}
        />
        <AddressElement options={{ mode: "billing" }} />
        <PaymentElement />
        <button
          disabled={isLoading}
          className="bg-primary mt-5 hover:bg-secondary transition-all duration-100 text-white rounded-lg flex px-5 py-3 gap-5 w-full sm:w-1/2 max-w-4xl"
        >{`
        ${isLoading ? "Loading..." : "Pay"}
      `}</button>
      </form>
      <ToastContainer
        limit={1}
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default CheckoutForm;
