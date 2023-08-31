import axios from '../../components/axios';
import config from '../../config/config';

export const getPartners = async () => {
    try{
        const response = await axios.get(`${config.STRAPI_URL}/api/partners?populate=*`, {
        })
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}

//get DynamicText
export const getDynamicText = async () => {
    try{
        const response = await axios.get(`${config.STRAPI_URL}/api/about-us-pages`, {
        })
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}

//get DynamicImages
export const getDynamicImages = async () => {
    try{
        const response = await axios.get(`${config.STRAPI_URL}/api/images?filters[name][$eq]=AboutUsPageImages&populate=*`, {
        })
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}