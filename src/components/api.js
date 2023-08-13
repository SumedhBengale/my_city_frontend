import axios from 'axios';
import config from '../config/config';
export const fetchBookedDatesFromBackend = async (residenceId) => {
    try {
        const response = await axios.post(
            `${config.API_URL}/upcomingTrips/getBookedDates`, {
                residenceId: residenceId
            },{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
            }
        );
        return response.data.bookedDates; // Assuming the backend returns an object with a 'bookedDates' array
    } catch (error) {
        console.error('Error fetching booked dates:', error);
        return [];
    }
}