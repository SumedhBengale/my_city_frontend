import axios from '../../components/axios';
import config from '../../config/config';

//Get Privacy Policy from Strapi
export const getPrivacyPolicy = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/privacy-policy`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

//Get Terms Of Use
export const getTermsOfUse = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/terms-of-use`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}