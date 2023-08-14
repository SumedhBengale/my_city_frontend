import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import { install } from 'resize-observer';

if (!window.ResizeObserver) install();

function Filter({ initialData, apply, close }) {
  const [selectedBedrooms, setSelectedBedrooms] = useState(initialData ? initialData.selectedBedrooms : 'any');
  const [selectedGuests, setSelectedGuests] = useState(initialData ? initialData.selectedGuests : 'any');
  const [selectedBeds, setSelectedBeds] = useState(initialData ? initialData.selectedBeds : 'any');
  const [priceRange, setPriceRange] = useState(initialData ? initialData.priceRange : [0, 20000]);
  const [selectedAmenities, setSelectedAmenities] = useState(initialData ? initialData.selectedAmenities : []);
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  const essentialAmenities = [
    'Wi-Fi',
    'Kitchen',
    'Iron',
    'Hair Dryer',
  ];

  const amenities = [
    'Carbon Monoxide Detector',
    'Cable TV',
    'Air Conditioning',
    'Bath Tub',
    `Children's Dinnerware`
    
  ];

  const handlePriceChange = (newValue) => {
    setPriceRange(newValue);
  };
  const handleBedroomClick = (bedrooms) => {
    setSelectedBedrooms(bedrooms);
  };

  const handleGuestClick = (guests) => {
    setSelectedGuests(guests);
  };

  const handleBedClick = (beds) => {
    setSelectedBeds(beds);
  };

  return (
    <>
    {/*Currently Breaks on Galaxy Fold */}
      
      <div className='fixed bottom-0 z-40 w-full h-full flex items-end justify-center md:items-center overflow-hidden backdrop-filter backdrop-blur-md'>
      <div className='h-5/6 2xl:h-min w-full md:w-max z-30 bg-white overflow overflow-auto rounded-t-2xl md:rounded-2xl drop-shadow-2xl p-2 flex flex-col '>
          <div className='flex justify-between mb-2'>
        <div className='w-full text-center font-bold font-custom text-xl mb-1'>Filter</div>
          <div className='font-bold' onClick={()=>{close()}}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 border border-black rounded-md text-black" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12" />
              </svg>
          </div>
        </div>
        <div className='grid grid-cols-1 mx-5'>
        <div className='mt-1'>
          <div className='mb-3 font-bold'>Bedrooms</div>
          <div className='flex justify-around md:justify-start'>
            <button
              className={`h-8 md:h-10 w-14 rounded-full border  text-center text-sm ${
                selectedBedrooms === 'any' ? 'bg-black font-bold text-white' : ''
              }`}
              id='any_bedroom'
              onClick={() => handleBedroomClick('any')}
            >
              Any
            </button>
            {[0, 1, 2, 3, 4].map((bedroom) => (
              <button
                key={bedroom}
                className={`h-8 md:h-10 w-14 rounded-full border  text-center text-sm ml-3 ${
                  selectedBedrooms === bedroom ? 'bg-black font-bold text-white' : ''
                }`}
                id='number_bedroom'
                onClick={() => handleBedroomClick(bedroom)}
              >
                {bedroom}
              </button>
            ))}
            <button
              className={`h-8 md:h-10 w-14 rounded-full border  text-center text-sm ml-3 ${
                selectedBedrooms === '5+' ? 'bg-black font-bold text-white' : ''
              }`}
              id='5+_bedroom'
              onClick={() => handleBedroomClick('5+')}
            >
              5+
            </button>
          </div>
        </div>

        <div className='mt-1'>
        <div className='mb-3 font-bold'>Guests</div>
          <div className='flex justify-around md:justify-start'>
            <button
              className={`h-8 md:h-10 w-14 rounded-full border  text-center text-sm ${
                selectedGuests === 'any' ? 'bg-black font-bold text-white' : ''
              }`}
              id='any_guest'
              onClick={() => handleGuestClick('any')}
            >
              Any
            </button>
            {[0, 1, 2, 3, 4].map((guest) => (
              <button
                key={guest}
                className={`h-8 md:h-10 w-14 rounded-full border  text-center text-sm ml-3 ${
                  selectedGuests === guest ? 'bg-black font-bold text-white' : ''
                }`}
                id='number_guest'
                onClick={() => handleGuestClick(guest)}
              >
                {guest}
              </button>
            ))}



            <button
              className={`h-8 md:h-10 w-14 rounded-full border  text-center text-sm ml-3 ${
                selectedGuests === '5+' ? 'bg-black font-bold text-white' : ''
              }`}
              id='5+_guest'
              onClick={() => handleGuestClick('5+')}
            >
              5+
            </button>

          </div>
        </div>

        <div className='mt-1'>
        <div className='mb-3 font-bold'>Beds</div>
          <div className='flex justify-around md:justify-start'>
            <button
              className={`h-8 md:h-10 w-14 rounded-full border  text-center text-sm ${
                selectedBeds === 'any' ? 'bg-black font-bold text-white' : ''
              }`}
              id='any_bed'
              onClick={() => handleBedClick('any')}
            >
              Any
            </button>
            {[0, 1, 2, 3, 4].map((bed) => (
              <button
                key={bed}
                className={`h-8 md:h-10 w-14 rounded-full border  text-center text-sm ml-3 ${
                  selectedBeds === bed ? 'bg-black font-bold text-white' : ''
                }`}
                id='number_bed'
                onClick={() => handleBedClick(bed)}
              >
                {bed}
              </button>
            ))}
            <button
              className={`h-8 md:h-10 w-14 rounded-full border  text-center text-sm ml-3 ${
                selectedBeds === '5+' ? 'bg-black font-bold text-white' : ''
              }`}
              id='5+_bed'
              onClick={() => handleBedClick('5+')}
            >
              5+
            </button>
          </div>
        </div>
        </div>
        <div>
          <div className='font-custom-bold text-lg mx-5 my-2'>Amenities</div>
          <div className='font-bold text-sm mx-5 my-2'>Essential Amenities</div>
          <div className='grid grid-cols-2 gap-3 mx-5'>
          {essentialAmenities.map((amenity) => (
            <div key={amenity} className='flex items-center gap-1 mt-1'>
              <input
                type='checkbox'
                id={amenity}
                name={amenity}
                value={amenity}
                onChange={() => {
                  //if the amenity is selected add it to selectedAmenities else remove it from selectedAmenities
                  if (selectedAmenities.includes(amenity)) {
                    setSelectedAmenities(selectedAmenities.filter((selectedAmenity) => selectedAmenity !== amenity));
                  } else {
                    setSelectedAmenities([...selectedAmenities, amenity]);
                  }
                }}
                className='hidden' // Hide the default checkbox
              />
              <label
                htmlFor={amenity}
                className={`flex items-center justify-center h-5 w-5 border border-black rounded-md cursor-pointer transition-colors ${selectedAmenities.includes(amenity)? 'bg-black' : 'bg-white'}`}
              >
                {selectedAmenities.includes(amenity) && (
                  <svg
                    className='w-4 h-4 text-white'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={4}
                      d='M5 13l4 4L19 7'
                    />
                  </svg>
                )}
              </label>
              <span className='text-sm pl-2'>{amenity}</span>
            </div>
          ))}
          </div>
          {
            showAllAmenities && <div className='font-bold text-sm mx-5 my-2 col-span-2'>All Amenities</div>
          }
          <div className='grid grid-cols-2 gap-3 mx-5 place-content-between'>
          
          {showAllAmenities &&
            amenities.map((amenity) => (
              <div key={amenity} className='flex items-center gap-1 mt-1'>
                <input
                  type='checkbox'
                  id={amenity}
                  name={amenity}
                  value={amenity}
                  onChange={() => {
                    //if the amenity is selected add it to selectedAmenities else remove it from selectedAmenities
                    if (selectedAmenities.includes(amenity)) {
                      setSelectedAmenities(selectedAmenities.filter((selectedAmenity) => selectedAmenity !== amenity));
                    } else {
                      setSelectedAmenities([...selectedAmenities, amenity]);
                    }
                  }}
                  className='hidden' // Hide the default checkbox
                />
                <label
                  htmlFor={amenity}
                  className={` h-5 w-5 border border-black rounded-md cursor-pointer transition-colors ${selectedAmenities.includes(amenity)? 'bg-black' : 'bg-white'}`}
                >
                  {
                  (selectedAmenities.includes(amenity) && (
                    <svg
                      className='w-4 h-4 text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={4}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )) || <div className='w-4 h-4'></div>
                  }
                </label>
                <span className='text-sm pl-2 overflow-hidden overflow-ellipsis'>{amenity}</span>
              </div>
            ))
          }
          </div>
          <div className='flex justify-start mx-5 mt-3'>
              <span className='text-sm font-bold underline  cursor-pointer' onClick={()=>setShowAllAmenities(!showAllAmenities)}>{showAllAmenities? 'Hide' : 'Show'} All Amenities</span>
          </div>
        </div>

        <div className='w-full h-max bg-white rounded-2xl p-5'>
        <div className='relative'>
      <div className='w-full font-bold text-xl pb-5'>Price</div>
      <ReactSlider
        min={0}
        max={20000}
        value={priceRange}
        step={10}
        onChange={handlePriceChange}
        className='w-full absolute h-4  accent-gray-400 rounded-full z-10 appearance-none bg-transparent'
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`h-[2px] absolute bg-gray-400 rounded-full ${
              state.index === 0 ? 'left-0' : 'right-0'
            }`}
          />
        )}
        renderThumb={(props, state) => (
          <div
            {...props}
            className={`h-6 w-6 bg-white border-2 border-grey-400 rounded-full -translate-y-3 flex justify-center items-center ${
              state.index === 0 ? 'left-0' : 'right-0'
            }`}
          >
            {/*3 Vertical Lines */}
            <div className='flex gap-[2px]'>
            <div className='w-[1px] h-2 bg-black'></div>
            <div className='w-[1px] h-2 bg-black'></div>
            <div className='w-[1px] h-2 bg-black'></div>
            </div>
          </div>
        )}
        pearling
      />
      <div className='flex justify-between'>
        <div>$0</div>
        <div>$20000</div>
      </div>
      <div className='mt-3 flex justify-start gap-5'>
        <div className='h-full border rounded-lg px-5 py-2 flex flex-col'>
          <div className='text-sm text-gray-400'>Min Price-</div>
          <div>{`£ ${priceRange[0]}`}</div>
        </div>
        <div className='h-full border rounded-lg px-5 py-2 flex flex-col'>
          <div className='text-sm text-gray-400'>Max Price-</div>
          <div>{`£ ${priceRange[1]}`}</div>
        </div>
      </div>
    </div>
        <div className='flex justify-center'>
          <button className='bg-black text-white w-full max-w-md rounded-md px-5 py-2 mt-5'
          onClick={()=>apply({bedrooms:selectedBedrooms, guests:selectedGuests, beds:selectedBeds,amenities: selectedAmenities, priceRange:priceRange})}
          >Apply Filter</button>
        </div>
      </div>
      </div>
      </div>
  
      </>
  );
}

export default Filter;
