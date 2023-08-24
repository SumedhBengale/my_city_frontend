import axios from '../../components/axios';
import config from '../../config/config';


export const getResidences = async ({filterData}) => {
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
            filterData: filterDataString,
        },
      });
  
      return response.data;
    } catch (error) {
      if (error.response) {
        return error.response;
      }
    }
  };
  