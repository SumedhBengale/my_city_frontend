import axios from 'axios';
import config from '../../config/config';

export const  getUpcomingTrips = async () => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/upcomingTrips/getUpcomingTrips`, {
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


export const  getPastTrips = async () => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/pastTrips/getPastTrips`, {
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

export const getResidenceInfo = async (residenceId) => {
    try {
        //get request with auth header
        console.log("ID: ", residenceId)
        const response = await axios.get(`${config.API_URL}/getResidence/${residenceId}`, {
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