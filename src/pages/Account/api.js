import axios from '../../components/axios';
import config from '../../config/config';

export const getAccount = async () => {

    const token = localStorage.getItem('token');
    if (!token) {
        //create a response object that says the user is not logged in and gives appropriate status code
        console.log('You are not logged in');
        const response = {
            status: 401,
            message: 'You are not logged in'
        }
        return response;
    }

    try {
        const response = await axios.post(`${config.API_URL}/account`, {
            token: token
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

//delete account
export const deleteAccount = async () => {
    const token = localStorage.getItem('token');

    try {
        const response = await axios.post(`${config.API_URL}/deleteAccount`, {
            token: token
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
