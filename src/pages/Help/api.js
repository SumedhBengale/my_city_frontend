import axios from '../../components/axios';
import config from '../../config/config';

export const getFrequentlyAskedQuestions = async () => {
    try{
        const response = await axios.get(`${config.STRAPI_URL}/api/frequently-asked-questions`, {
        })
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}