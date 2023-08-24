import axios from '../../components/axios';
import config from '../../config/config';

export const  confirmBooking = async (residence, quote, checkInDate, checkOutDate) => {
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/bookResidence`, {
            residence: residence,
            quote: quote,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
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

//API to get a Quote for a residence
export const getQuote = async (residenceId, checkInDate, checkOutDate) => {
    //convert date to UTC
    checkInDate = new Date(checkInDate).toISOString();
    checkOutDate = new Date(checkOutDate).toISOString();
    console.log(checkInDate);
    console.log(checkOutDate);
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/getQuote`, {
            residenceId: residenceId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            guestCount: localStorage.getItem('guestCount')? localStorage.getItem('guestCount') : 1,
            userId: localStorage.getItem('userId')
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log("RESPONSE", response);
        return response.data;
    }
    catch (error) {
        if(error.response) {
            return error.response;
        }
    }
}