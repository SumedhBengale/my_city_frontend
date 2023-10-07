import axios from '../../components/axios';
import config from '../../config/config';

const API_URL = config.API_URL; // Assuming your config file is located in the src/config folder

// API call to authenticate user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { "email": email, "password": password });
    return { token: response.data.token, status: response.status, userId: response.data.userId, userType: response.data.userType }; // Assuming your API returns a JSON response with data
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

export const sendResetPasswordLink = async (email) => {
  console.log(email)
  try {
    const response = await axios.post(`${API_URL}/forgot-password`, { "email": email });

    return { status: response.status, message: response.data }; // Assuming your API returns a JSON response with data
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

//verify-email
export const verifyEmail = async (token) => {
  console.log(token)
  try {
    const response = await axios.post(`${API_URL}/verify-email`,
      //send the token in the body
      {
        verificationToken: token
      }
    );

    return { status: response.status, message: response.data }; // Assuming your API returns a JSON response with data
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

//Check passwordResetToken
export const verifyPasswordToken = async (token) => {
  console.log(token)
  try {
    const response = await axios.post(`${API_URL}/verify-password-token`,
      //send the token in the body
      {
        passwordToken: token
      }
    );

    return { status: response.status, message: response.data }; // Assuming your API returns a JSON response with data
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

//Reset password
export const resetPassword = async (token, password) => {
  console.log(token)
  try {
    const response = await axios.post(`${API_URL}/reset-password`,
      //send the token in the body
      {
        passwordToken: token,
        password: password
      }
    );

    return { status: response.status, message: response.data }; // Assuming your API returns a JSON response with data
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
    const response = await axios.post(`${API_URL}/signup`, { "userName": username, "email": email, "password": password });
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

export const getVideos = async () => {
  try {
    //get request with auth header
    const response = await axios.get(`${config.STRAPI_URL}/api/videos?populate=*`, {
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}


export const sendGoogleCode = async (code) => {
  console.log(code)
  try {
    const response = await axios.post(`${API_URL}/google`, { "code": code });
    return response.data; // Assuming your API returns a JSON response with data
  } catch (error) {
    const { response } = error;
    if (response) {
      // Error response from the backend
      const { data, status } = response;
      return { message: data.message, token: data.token, userId: data.userId, userType: data.userType, status: status };
    } else {
      // Network error or other issues
      return { message: 'An error occurred. Please try again later.', status: 500 };
    }
  }
}

export const googleAuth = async () => {
  try {
    const response = await axios.get(`${API_URL}/google`);
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
}


export const getClientId = async () => {
  try {
    const response = await axios.get(`${API_URL}/client-id`);
    return response.data; // Assuming your API returns a JSON response with data
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}

export const sendFacebookData = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/facebook`, {data});
    return response.data; // Assuming your API returns a JSON response with data
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}