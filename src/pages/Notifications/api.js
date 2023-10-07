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
        } else {
            //get request with auth header
            const response = await axios.post(`${config.API_URL}/notifications/get`, {
                userId: localStorage.getItem('userId')
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

export const deleteNotification = async (notificationId) => {
    try {
        console.log("deleteNotification")
        console.log(window.location.href)
        if (localStorage.getItem('token') === null) {
            return {
                data: {
                    notifications: [],
                }
            };
        }
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/notifications/delete`, {
            notificationId: notificationId
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

export const setViewed = async (notificationId) => {
    try {
        console.log("setViewed")
        console.log(window.location.href)
        if (localStorage.getItem('token') === null) {
            return {
                data: {
                    notifications: [],
                }
            };
        }
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/notifications/setViewed`, {
            notificationId: notificationId
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