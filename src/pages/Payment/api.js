import axios from "../../components/axios";
import config from "../../config/config"; // Make sure to import your configuration file

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
