import axios from "../../components/axios";
import config from "../../config/config"; // Make sure to import your configuration file
import { getResidence } from "../Property/api";

export const createIntent = async (quote) => {
  try {
    const response = await axios.post(
      `${config.API_URL}/create-payment-intent`,
      quote,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data); // Log the response data
    return response.data; // Return the response data to the caller if needed
  } catch (error) {
    console.error(error); // Log any errors

    if (error.response) {
      return error.response.data; // Return the response data in case of an error response
    }

    // Handle other types of errors here
    throw error; // Rethrow the error to let the caller handle it
  }
};


export const sendSuccessfulPayment = async (paymentIntent, paymentStatus, quoteId) => {
  try {
    const response = await axios.post(`${config.API_URL}/payment/success`, {
      paymentIntent,
      paymentStatus,
      quoteId,
      userToken: localStorage.getItem('token') ? localStorage.getItem('token') : null
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.error(error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export const retrieveQuote = async (quoteId) => {
  try {
    const response = await axios.post(`${config.API_URL}/retrieveQuote`, {
      id: quoteId
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
  catch (error) {
    console.error(error);
    if (error.response) {
      return error.response.data;
    }
    throw error;
  }
}

export const confirmBooking = async (quote) => {

  try {
    //get request with auth header
    const response = await axios.post(`${config.API_URL}/bookResidence`, {
      quote: quote,
      userId: localStorage.getItem('userId')
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
  catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}