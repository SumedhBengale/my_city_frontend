import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getResource, saveResource } from '../api'; // Make sure to import the saveResource function from the appropriate location
import ResourceEditor from '../components/ResourceEditor';
import DesktopNavbarBlack from '../../../components/desktopNavbarBlack';

const UpcomingTripEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const typeOfResource = location.state.typeOfResource;
    console.log(location.state.trip)
    setResource(location.state.trip);
    setDataLoaded(true);
  }, [location]);

  const handleSave = () => {
    // Save the resource if it's not null and it's a 'UpcomingTrip' resource
    if (resource !== null && location.state.typeOfResource === 'upcomingTrip') {
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
        {dataLoaded && location.state.typeOfResource === 'upcomingTrip' ? (
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

export default UpcomingTripEditor;
