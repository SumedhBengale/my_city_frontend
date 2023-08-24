//Get the list of blogs from strapi url

import axios from "../../components/axios"
import config from "../../config/config.js"

export const getBlogs = async () => {
    try{
        const response = await axios.get(`${config.STRAPI_URL}/api/blog-posts?populate=*`, {
        })
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}