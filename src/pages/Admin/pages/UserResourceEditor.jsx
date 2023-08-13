import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getResource, saveResource } from '../api'; // Make sure to import the saveResource function from the appropriate location
import ResourceEditor from '../components/ResourceEditor';
import DesktopNavbarBlack from '../../../components/desktopNavbarBlack';

const UserResourceEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const typeOfResource = location.state.typeOfResource;
    const resourceId = location.state.id;
    getResource(typeOfResource, resourceId)
      .then((data) => {
        console.log(data.data.resource);
        setResource(data.data.resource);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error('Error fetching resource:', error);
      });
  }, [location]);

  const handleSave = () => {
    // Save the resource if it's not null and it's a 'user' resource
    if (resource !== null && location.state.typeOfResource === 'user') {
      saveResource(location.state.typeOfResource, resource._id, resource)
        .then((data) => {
          console.log('Resource saved:', data);
        })
        .catch((error) => {
          console.error('Error saving resource:', error);
        });
    }
  };

  return (
    <div className='mx-5 flex justify-center relative'>
      <div className='hidden md:block z-20 fixed w-full'>
        {/* DesktopNavbarBlack */}
      </div>
      <div className='w-full sm:w-1/2 md:w-1/3 max-w-5xl absolute top-16'>
        {dataLoaded && location.state.typeOfResource === 'user' ? (
          <div className=''>
            <div className='text-2xl font-bold text-center'>Edit User's Data</div>
            <div className='flex flex-row justify-center gap-5 mt-5'>
              <button
                className='bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg'
                onClick={() => {
                  navigate(`/admin/upcomingTrips/${location.state.id}`, {
                    state: {
                      typeOfResource: 'upcomingTrip',
                      id: location.state.id,
                    },
                  });
                }}
              >
                Upcoming Trips
              </button>
              <button
                className='bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg'
                onClick={() => {
                  navigate(`/admin/pastTrips/${location.state.id}`, {
                    state: {
                      typeOfResource: 'pastTrip',
                      id: location.state.id,
                    },
                  });
                }}
              >
                Past Trips
              </button>
              <button className='bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg'
                onClick={() => {
                  navigate(`/admin/wishlist/${location.state.id}`, {
                    state: {
                      typeOfResource: 'wishlist',
                      id: location.state.id,
                    },
                  });
                }}
              >
                Wishlist
              </button>
            </div>
          </div>
        ) : null}
        {dataLoaded && location.state.typeOfResource === 'user' ? (
          <div className='flex flex-col justify-center gap-5 relative'>
            {resource !== null && (
              <ResourceEditor
                typeOfResource={location.state.typeOfResource}
                resource={resource}
                handleSave={handleSave}
              />
            )}
            {/* */}
          </div>
        ) : (
          // Circular loading bar
          <div className='flex flex-col justify-center items-center gap-5 relative'>
            <div className='text-2xl font-bold text-center'>Loading...</div>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserResourceEditor;
