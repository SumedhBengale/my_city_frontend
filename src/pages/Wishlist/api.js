import axios from '../../components/axios';
import config from '../../config/config';


export const  getWishlist = async () => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/wishlist/getWishlist`, {
            userId: localStorage.getItem('userId')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        if(error.response) {
            return error.response;
        }
    }
}

export const deleteFromWishlist = async (id) => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/wishlist/delete`, {
            id: id,
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