import axios from 'axios';
import config from '../../config/config';

export const getChat = async () => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/chat/getChat`,{
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

export const addMessage = async (chatId, message) => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/chat/addMessage`, {
            message,chatId
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
