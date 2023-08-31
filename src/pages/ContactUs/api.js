//API endpoint for adding new contact us request

import axios from 'axios';
import config from '../../config/config';


export const addContactUsRequest = async (data) => {
    try {
        const response = await axios.post(`${config.API_URL}/contact/newRequest`, {
            data: data
        },{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }
        );
        return response;
    } catch (error) {
        return error;
    }
}