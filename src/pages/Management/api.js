//Get the list of blogs from strapi url

import axios from "../../components/axios"
import config from "../../config/config.js"

export const getBlogs = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/blog-posts?populate=*`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

export const getLocations = async (postcode) => {
    try {
        const response = await axios.get(`${config.API_URL}/getLocations?postcode=${postcode}`, {
        })
        return response.data;

    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}


//getDynamicText
export const getDynamicText = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/home-owners-pages?pagination[pageSize]=30&pagination[page]=1`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

export const getCities = async () => {
    console.log(config.API_URL)
    try {
        console.log('Getting cities')
        const response = await axios.get(`${config.STRAPI_URL}/api/location`, {
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching cities:', error);
        return [];
    }
}

export const getHomeOwnersPageImages = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/images?filters[name][$eq]=HomeOwnersPageImages&populate=*`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

//newEnquiry 
export const newEnquiry = async (data) => {
    try {
        const response = await axios.post(`${config.API_URL}/enquiry/newEnquiry`, data, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}


export const getShowcaseReviews = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/reviews?populate=*`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}