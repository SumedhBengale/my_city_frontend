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