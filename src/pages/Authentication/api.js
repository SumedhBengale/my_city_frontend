import axios from 'axios';
import config from '../../config/config';

const API_URL = config.API_URL; // Assuming your config file is located in the src/config folder

// API call to authenticate user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { "email":email, "password":password });
    return {token: response.data.token, status:response.status, userId: response.data.userId}; // Assuming your API returns a JSON response with data
  } catch (error) {
    const { response } = error;
    if (response) {
      // Error response from the backend
      const { data, status } = response;
      return { message: data.message, status: status };
    } else {
      // Network error or other issues
      return { message: 'An error occurred. Please try again later.', status: 500 };
    }
  }
};

// API call to register a new user
export const signup = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, { "userName":username, "email":email, "password":password });
    return response.data; // Assuming your API returns a JSON response with data
  } catch (error) {
    const { response } = error;
    if (response) {
      // Error response from the backend
      const { data, status } = response;
      return { message: data.message, status: status };
    } else {
      // Network error or other issues
      return { message: 'An error occurred. Please try again later.', status: 500 };
    }
  }
};
