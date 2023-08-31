import axios from '../../../components/axios';
import config from '../../../config/config';


export const getLuxeResidences = async ({filterData}) => {
    try {  
      
      const filterDataString = JSON.stringify(filterData);

  
      // Get request with auth header and query parameters
      const response = await axios.get(`${config.API_URL}/getResidences`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        params: {
            luxe: true,
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
  