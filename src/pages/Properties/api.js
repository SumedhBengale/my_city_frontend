import axios from '../../components/axios';
import config from '../../config/config';


export const getResidences = async ({ filterData, limit, luxe }) => {
  try {
    // Stringify the filterData object to send it as a JSON string in the query parameters
    const filterDataString = JSON.stringify(filterData);
    console.log(filterData)

    // Get request with auth header and query parameters
    const response = await axios.get(`${config.API_URL}/getResidences`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        limit: limit ? limit : 100,
        filterData: filterDataString,
        luxe: luxe
      },
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
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

export const getDynamicText = async (id) => {
  try {
    //get request with auth header
    const response = await axios.get(`${config.STRAPI_URL}/api/luxe-home-pages`, {
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response;
    }
  }
}
