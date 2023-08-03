import axios from 'axios';
import config from '../../config/config';

export const getNotifications = async () => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/notifications/get`,{
            userId: localStorage.getItem('userId')
        }, {
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