import axios from '../../components/axios';
import config from '../../config/config';
//API to get a Quote for a residence
export const getQuote = async (residenceId, checkInDate, checkOutDate, guestCount, coupon) => {
    //Get date from checkInDate, don't consider timezones
    console.log(checkInDate);
    console.log(checkOutDate);
    try {
        //get request with auth header
        const response = await axios.post(`${config.API_URL}/getQuote`, {
            residenceId: residenceId,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            guestCount: guestCount ? guestCount : localStorage.getItem('guestCount') ? localStorage.getItem('guestCount') : 1,
            coupon: coupon ? coupon : null,
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
        if (error.response) {
            return error.response;
        }
    }
}