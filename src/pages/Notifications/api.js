import axios from '../../components/axios';
import config from '../../config/config';

export const getNotifications = async () => {
    try {
        console.log("getNotifications")
        console.log(window.location.href)
        if (localStorage.getItem('token') === null) {
            return {
                data: {
                    notifications: [],
                }
            };
        }
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/notifications/get`, {
            userId: localStorage.getItem('userId')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}