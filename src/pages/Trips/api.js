import axios from '../../components/axios';
import config from '../../config/config';

export const  getTrips = async () => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/trips/getTrips`, {
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

export const saveReview = async (id, rating, review) => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/trips/addReview`, {
            id: id,
            rating: rating,
            review: review
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