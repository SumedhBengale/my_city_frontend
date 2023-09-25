//API endpoint for adding new contact us request

import axios from 'axios';
import config from '../../config/config';


export const addContactUsRequest = async (data) => {
    try {
        const response = await axios.post(`${config.API_URL}/contact/newRequest`, {
            data: data
        }, {
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

export const getDynamicText = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/contact-us-pages`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

export const getDynamicImages = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/images?filters[name][$eq]=ContactUsPageImages&populate=*`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}