import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { adminGetTrips } from '../api'; // Import the appropriate getResource function
import diff from 'date-fns/differenceInDays';
import NavbarBlack from '../../../components/navbar_black';
import DesktopNavbarBlack from '../../../components/desktopNavbarBlack';

const TripsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [trips, setTrips] = useState(null);

  useEffect(() => {
    // Fetch the user's Trips using the appropriate API endpoint
    const userId = location.state.id;
    adminGetTrips(userId)
      .then((data) => {
        console.log('Trips:', data);
        setTrips(data);
      })
      .catch((error) => {
        console.error('Error fetching Trips:', error);
      });
  }, [location]);

  return (
    <div>
            <div className="hidden md:block z-30 fixed w-full">
        {
          <DesktopNavbarBlack />
        }
        </div>

        <div className="md:hidden z-30 fixed w-full">
          {
            <NavbarBlack />
          }
        </div>
      <div className='mx-5 pt-16'>
        <div className='text-2xl font-bold text-center'>Trips</div>
        {trips !== null ? (
          <div>
            {trips.map((trip) => (
                  <div className='flex flex-col sm:flex-row justify-center gap-5 my-5'>
                    <div className='bg-primary hover:bg-secondary transition-all duration-100 text-white rounded-lg flex px-5 py-3 gap-5 w-full sm:w-1/2 max-w-4xl' 
                      onClick={() => {
                        navigate(`/admin/trip/${trip._id}`, {
                          state: {
                            typeOfResource: 'trip',
                            trip: trip,
                          },
                        });
                      }}
                    >
                    <div className='flex justify-center'>
                      <img src={trip.residence.pictures[0].original ? trip.residence.pictures[0].original : trip.residence.pictures[0].thumbnail} alt='residence' className='w-40 h-40 rounded-lg'/>
                    </div>
                    <div className='flex gap-5'>
                      <div className='flex flex-col justify-center gap-2'>
                      <div className='text-xl font-bold text-center'>Trip to {trip.residence.title}</div>

                        <div className='flex'>
                          <div className='text-lg font-bold'>{`Check In - ${trip.checkInDate.split('T')[0]}`}</div>
                        </div>
                        <div className='flex'>
                          <div className='text-lg font-bold'>{`Check Out - ${trip.checkOutDate.split('T')[0]}`}</div>
                        </div>
                      <div className='text-lg font-bold'>{`Total Cost - ${
                        trip.residence.prices.basePrice * diff(new Date(trip.checkOutDate,
                        ), new Date(trip.checkInDate,
                          ))
                      }`}</div>
                    </div>
                </div>
                </div>
              </div>
              ))}
          </div>
        ) : (
          <div className='text-2xl font-bold text-center'>Loading trips...</div>
        )}
      </div>
    </div>
  );
};

export default TripsPage;
