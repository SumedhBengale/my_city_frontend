import axios from 'axios';
import config from '../../config/config';


export const getResidences = async () => {
    try {
        //get request with auth header
        const response = await axios.get(`${config.API_URL}/getResidences`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if(error.response) {
            return error.response;
        }
    }
}