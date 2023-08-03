import axios from 'axios';
import config from '../../config/config';

//Get the property details from the backend
export const getResidence = async (id) => {
    try {
        //get request with auth header
        console.log("ID: ", id)
        const response = await axios.get(`${config.API_URL}/getResidence/${id}`, {
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

export const getChat = async (residenceId) => {
    try{
        const response = await axios.post(`${config.API_URL}/chat/getChat`,{
            residenceId: residenceId,
                userId : localStorage.getItem('userId')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                residenceId: residenceId,
                userId : localStorage.getItem('userId')
            }
        });
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}


export const initiateChat = async (residenceId, chatId) => {

     try {
        console.log("residenceId: ", residenceId)
      // Send the message to the backend
      const response = await axios.post(`${config.API_URL}/chat/initiateChat`, {
        userId: localStorage.getItem('token'),
        residenceId: residenceId,
        chatId:  chatId,
        message: 'I am interested in your property',
      }, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });

      // Handle the response and update the UI if needed
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
    }
}


export const  addToWishlist = async (residenceId) => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/wishlist/add`, {
            residenceId: residenceId,
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