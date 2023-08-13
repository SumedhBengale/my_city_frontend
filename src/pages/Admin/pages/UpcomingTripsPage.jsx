import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminGetUpcomingTrips } from '../api'; // Import the appropriate getResource function
import diff from 'date-fns/differenceInDays';

const UpcomingTripsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [upcomingTrips, setUpcomingTrips] = useState(null);

  useEffect(() => {
    // Fetch the user's upcoming trips using the appropriate API endpoint
    const userId = location.state.id;
    adminGetUpcomingTrips(userId)
      .then((data) => {
        console.log('Upcoming trips:', data);
        setUpcomingTrips(data);
      })
      .catch((error) => {
        console.error('Error fetching upcoming trips:', error);
      });
  }, [location]);

  return (
    <div className='mx-5'>
      <div className='text-2xl font-bold text-center'>Upcoming Trips</div>
      {upcomingTrips !== null ? (
        <div>
          {upcomingTrips.map((trip) => (
                <div className='flex flex-col sm:flex-row justify-center gap-5 my-5'>
                  <div className='bg-primary hover:bg-secondary transition-all duration-100 text-white rounded-lg flex px-5 py-3 gap-5 w-full sm:w-1/2 max-w-4xl' 
                    onClick={() => {
                      navigate(`/admin/upcomingTrip/${trip._id}`, {
                        state: {
                          typeOfResource: 'upcomingTrip',
                          trip: trip,
                        },
                      });
                    }}
                  >
                  <div className='flex justify-center'>
                    <img src={trip.residenceId.images[0]} alt='residence' className='w-40 h-40 rounded-lg'/>
                  </div>
                  <div className='flex gap-5'>
                    <div className='flex flex-col justify-center gap-2'>
                    <div className='text-xl font-bold text-center'>Trip to {trip.residenceId.title}</div>

                      <div className='flex'>
                        <div className='text-lg font-bold'>{`Check In - ${trip.checkInDate.split('T')[0]}`}</div>
                      </div>
                      <div className='flex'>
                        <div className='text-lg font-bold'>{`Check Out - ${trip.checkOutDate.split('T')[0]}`}</div>
                      </div>
                    <div className='text-lg font-bold'>{`Total Cost - ${
                      trip.residenceId.pricePerNight * diff(new Date(trip.checkOutDate), new Date(trip.checkInDate))
                    }`}</div>
                  </div>
              </div>
              </div>
            </div>
            ))}
        </div>
      ) : (
        <div className='text-2xl font-bold text-center'>Loading upcoming trips...</div>
      )}
    </div>
  );
};

export default UpcomingTripsPage;
