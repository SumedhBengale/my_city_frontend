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
        if (error.response) {
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
        if (error.response) {
            return error.response;
        }
    }
}

export const getFooter = async () => {
    try {
        //get request with auth header
        const response = await axios.get(`${config.STRAPI_URL}/api/footers`, {
        });
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}



//get featured residences
export const getFeaturedResidences = async () => {
    //Get 100 listings from backend and get the top 7 with the highest residence.prices.basePrice
    try {
        const response = await axios.get(`${config.API_URL}/getResidences`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                filterData: null,
                limit: 100,
                luxe: true
            }
        });
        const residences = response.data.residences.results;
        const featuredResidences = residences.sort((a, b) => {
            return b.prices.basePrice - a.prices.basePrice;
        }
        ).slice(0, 7);
        return { residences: featuredResidences, status: 200 };

    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

export const getDynamicText = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/luxe-home-pages`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

export const getFrequentlyAskedQuestions = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/frequently-asked-questions`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

//Get homepageImages from strapi collection Image
export const getHomepageImages = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/images?filters[name][$eq]=LuxeHomePageImages&populate=*`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}

export const getShowcaseReviews = async () => {
    try {
        const response = await axios.get(`${config.STRAPI_URL}/api/reviews?populate=*`, {
        })
        return response.data;
    }
    catch (error) {
        if (error.response) {
            return error.response;
        }
    }
}