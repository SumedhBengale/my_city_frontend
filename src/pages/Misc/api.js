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

//HouseRules
export const getHouseRules = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/house-rule`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

//GroundRules
export const getGroundRules = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/ground-rule`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

//refund policy
export const getRefundPolicy = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/refund-policy`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

//paymentpolicy
export const getPaymentPolicy = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/payment-policy`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}