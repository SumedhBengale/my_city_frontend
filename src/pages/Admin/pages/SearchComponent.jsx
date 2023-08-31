import axios from '../../../components/axios';
import React, { useState, useEffect } from 'react';
import config from '../../../config/config';
import { useNavigate } from 'react-router-dom';

const SearchComponent = ({ searchType }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [rating, setRating] = useState('');

  let userResourceURL = '';
  if (searchType === 'user') {
    userResourceURL = 'users';
  } else if (searchType === 'chat') {
    userResourceURL = 'chats';
  } else if (searchType === 'review') {
    userResourceURL = 'reviews';
  }
    

  const handleSearch = async (query) => {
    setSearchQuery(query);

    try {
      const response = await axios.post(`${config.API_URL}/admin/${userResourceURL}`, {
        query: query,
        rating: rating
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(response);
      const data = response.data;
      setSearchResults(data);
    } catch (error) {
      console.error(`Error searching for ${searchType}:`, error);
    }
  };

  useEffect(() => {
    const initialSearch = async () => {
      const query = '';
      setSearchQuery(query);

      try {
        const response = await axios.post(`${config.API_URL}/admin/${userResourceURL}`, {
          query: query,
          //if searchType is review, send the rating as well
          rating: rating
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log(response);
        const data = response.data;
        setSearchResults(data);
        console.log(data)
      } catch (error) {
        console.error(`Error searching for ${searchType}:`, error);
      }
    };

    initialSearch();
  }, [searchType, userResourceURL, rating]);




  return (
    <div className='flex flex-col justify-center gap-5 relative'>
      <div className='text-2xl font-bold text-center '>Search for {searchType}</div>
      <div className='flex justify-center mx-5'>
        <input
          className='w-full sm:w-1/2 lg:w-1/3 rounded-lg py-3 bg-primary hover:bg-secondary transition-all duration-100 text-white px-4 border border-white'
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={`Search ${searchType}...`} />
          {searchType === 'review' ?
          <select
            className='w-32 rounded-lg py-3 bg-primary hover:bg-secondary transition-all duration-100 text-white px-4 ml-4 border border-white '
            onChange={(e) => {
              const rating = e.target.value;
              setRating(rating);
            }
            }>
            <option value=''>All</option>
            <option value='1'>1 Star</option>
            <option value='2'>2 Stars</option>
            <option value='3'>3 Stars</option>
            <option value='4'>4 Stars</option>
            <option value='5'>5 Stars</option>
            <option value='6'>6 Stars</option>
            <option value='7'>7 Stars</option>
            <option value='8'>8 Stars</option>
            <option value='9'>9 Stars</option>
            <option value='10'>10 Stars</option>
          </select>
          : null  
        }
      </div>
      <div className='flex  justify-center sm:justify-start'>
        <div className='text-2xl font-bold p-4 w-full sm:w-40 h-min bg-primary rounded-lg'>
          <div className='flex flex-col justify-center items-center h-full'>
            <div className='text-4xl font-bold text-center text-white'>{searchResults.length}</div>
            <div className='text-xl font-bold capitalize text-center text-white'>{
              searchResults.length === 1 ? searchType + ' Found' : `${userResourceURL} Found`
            }</div>
            </div>
        </div>
      </div>
      {searchResults.length > 0 ? 
      
        <ul>
          <div className='text-2xl font-bold p-4'>{searchType}-</div>
          {searchResults && searchResults.map((result, index) => (
            <li key={result._id}>
              <div
                className='flex flex-col justify-center gap-2 my-2 bg-primary hover:bg-secondary text-white transition duration-75 rounded p-5'
                onClick={() => {
                  //Navigate to the appropriate details page based on the type of resource
                  navigate(`/admin/${searchType}/${result._id}`, {
                    state: {
                      typeOfResource: searchType.toLowerCase(),
                      id: result._id
                    }
                  });
                }}
              >
                {searchType === 'user' ?
                <div>
                  <div className='text-xl font-bold'>{result.userName}</div>
                  <div className='text-lg'>{result.email}</div>
                </div>
                : searchType === 'chat' ? 
                <div>
                  <div className='text-xl font-bold'>{result.userName}</div>
                  <div className='text-lg'>
                    {result.messages?.length > 0 && typeof result.messages[result.messages.length - 1] === 'object' ? (
                      result.messages[result.messages.length - 1].message
                    ) : (
                      'No message'
                    )}
                  </div>
                </div>
                : searchType === 'review' ?
                <div>
                <div className='text-xl font-bold'>Rating- {result.rating}</div>
                <div className='text-lg'>Review- {result.review}</div>
              </div>
                : null  
              }
              </div>
            </li>
          ))}
        </ul>
        :
        <div className='text-2xl font-bold p-4'>No {searchType} found</div>
      }
    </div>
  );
};

export default SearchComponent;
