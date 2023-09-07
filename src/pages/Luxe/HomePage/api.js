import axios from '../../../components/axios';
import config from '../../../config/config';


export const getResidences = async () => {
    try {
        //get request with auth header
        const response = await axios.get(`${config.API_URL}/getResidences`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                filterData: null
            }
        });
        return response.data;
    } catch (error) {
        if(error.response) {
            return error.response;
        }
    }
}

export const getVideos = async () => {
    try {
        //get request with auth header
        const response = await axios.get(`${config.STRAPI_URL}/api/videos?populate=*`, {
        });
        return response.data;
    } catch (error) {
        if(error.response) {
            return error.response;
        }
    }
}



//get featured residences
export const getFeaturedResidences = async () => {
    try {
        //get request with auth header
        const listingsData = await axios.get(`${config.STRAPI_URL}/api/luxe-featured-listing`, {
        });
        const listing1 = listingsData.data.data.attributes.listing1;
        const listing2 = listingsData.data.data.attributes.listing2;
        const listing3 = listingsData.data.data.attributes.listing3;
        const listings = [listing1, listing2, listing3];

        console.log(listings)
        //For each listing, get the residence data from the backend
        let residences = [];
        for(let i = 0; i < listings.length; i++) {
            const residence = await axios.get(`${config.API_URL}/getResidence/${listings[i]}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
            residences.push(residence.data);
            console.log(residence.data.residence)
        }
        console.log(residences);

        return {residences: residences, status: 200};
    } catch (error) {
        if(error.response) {
            return error.response;
        }
    }
}

export const getDynamicText = async () => {
    try{
        const response = await axios.get(`${config.STRAPI_URL}/api/luxe-home-pages`, {
        })
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}

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

//Get homepageImages from strapi collection Image
export const getHomepageImages = async () => {
    try{
        const response = await axios.get(`${config.STRAPI_URL}/api/images?filters[name][$eq]=LuxeHomePageImages&populate=*`, {
        })
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}

export const getShowcaseReviews = async () => {
    try{
        const response = await axios.get(`${config.STRAPI_URL}/api/reviews?populate=*`, {
        })
        return response.data;
    }
    catch(error){
        if(error.response){
            return error.response;
        }
    }
}