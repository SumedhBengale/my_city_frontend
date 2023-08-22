//Api for login 

import axios from 'axios';
import config from '../../config/config';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${config.API_URL}/login`, {
        email,
        password
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
}

//A route to search all the trips of a user, the userId is passed in the body
export const getTrips = async (userId) => {
    try {
        const response = await axios.post(`${config.API_URL}/admin/trips`, {
            userId
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
}

//Fetch the resource
export const getResource = async (typeOfResource, id) => {
    try {
        const response = await axios.post(`${config.API_URL}/admin/resource/${id}`,{
            typeOfResource: typeOfResource,
            id: id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const saveResource = async (typeOfResource, id, data) => {
    try {
        const response = await axios.post(`${config.API_URL}/admin/resource/set/${id}`,{
            typeOfResource: typeOfResource,
            id: id,
            data: data
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
}

export const adminGetChat = async () => {
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

//adminGetWishlist
export const adminGetWishlist = async (userId) => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/admin/wishlist`,{
            userId: userId
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

export const deleteItem = async (id) => {
    try {
        const response = await axios.post(`${config.API_URL}/wishlist/delete`, {
            id: id,
            userId: localStorage.getItem('userId')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response);
        return response;
    } catch (err) {
        console.log(err);
    }
}




//adminGetTrips
export const adminGetTrips = async (userId) => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/admin/trips`,{
            userId: userId
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


export const adminAddMessage = async (chatId, message) => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/chat/adminAddMessage`, {
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
