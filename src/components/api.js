import axios from './axios';
import config from '../config/config';
export const fetchBookedDatesFromBackend = async (residenceId, startDate, endDate) => {
    try {
        const response = await axios.post(
            `${config.API_URL}/getBookedDates`, {
                residenceId: residenceId,
                startDate: startDate,
                endDate: endDate
            },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            }
        );
        return response.data.availability;
        // Assuming the backend returns an object with a 'bookedDates' array

    } catch (error) {
        console.error('Error fetching booked dates:', error);
        return [];
    }
}

//Api to get list of cities
export const getCities = async () => {
    console.log(config.API_URL)
    try{
        console.log('Getting cities')
        const response = await axios.get(`${config.STRAPI_URL}/api/location`,{
        });
        return response.data;
    }catch(error){
        console.error('Error fetching cities:', error);
        return [];
    }
}