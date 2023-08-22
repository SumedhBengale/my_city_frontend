import axios from 'axios';
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
        let bookedDates = [];
        response.data.availability.forEach((booking) => {
            if(booking.status === 'booked' || booking.status === 'unavailable') {
                bookedDates.push(booking.date);
            }
        })
        return bookedDates;
        // Assuming the backend returns an object with a 'bookedDates' array

    } catch (error) {
        console.error('Error fetching booked dates:', error);
        return [];
    }
}

//Api to get list of cities
export const getCities = async () => {
    try{
        console.log('Getting cities')
        const response = await axios.get(`${config.API_URL}/getCities`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        return response.data;
    }catch(error){
        console.error('Error fetching cities:', error);
        return [];
    }
}