import axios from 'axios';
import config from '../../config/config';

export const  confirmBooking = async (residenceId, checkInDate, checkOutDate) => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/bookResidence`, {
            residenceId: residenceId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            userId: localStorage.getItem('userId')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }
    catch (error) {
        if(error.response) {
            return error.response;
        }
    }
}