import React, { useState } from 'react';

function Filter({ apply, close }) {
  const [selectedBedrooms, setSelectedBedrooms] = useState('any');
  const [selectedGuests, setSelectedGuests] = useState('any');
  const [selectedBeds, setSelectedBeds] = useState('any');
  const [price, setPrice] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenities = [
    'Carbon Monoxide Detector',
    'Cable TV',
    'Air Conditioning',
    'Bath Tub',
    `Children's Dinnerware`
  ];


  const handlePriceChange = (event) => {
    const newPrice = parseInt(event.target.value);
    setPrice(newPrice);
    console.log(event.target.value)
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
      <div className='h-min w-full z-30 fixed bottom-0 overflow-scroll bg-white rounded-t-2xl p-2 md:hidden'>
          <div className='flex justify-between'>
              <div className='font-bold' onClick={()=>{close()}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 border border-black rounded-md text-black" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
        <div className='w-full text-center font-bold text-xl mb-5'>Filter</div>
        </div>

        <div>
          <div className='mb-3 font-bold'>Bedrooms</div>
          <div className='flex justify-between gap-1'>
            <button
              className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                selectedBedrooms === 'any' ? 'bg-black font-bold text-white' : ''
              }`}
              id='any_bed'
              onClick={() => handleBedroomClick('any')}
            >
              Any
            </button>
            {[0, 1, 2, 3, 4, 5].map((bedroom) => (
              <button
                key={bedroom}
                className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                  selectedBedrooms === bedroom ? 'bg-black font-bold text-white' : ''
                }`}
                onClick={() => handleBedroomClick(bedroom)}
              >
                {bedroom}
              </button>
            ))}
          </div>
        </div>

        <div className='mt-5'>
        <div className='mb-3 font-bold'>Guests</div>
          <div className='flex justify-between gap-1'>
            <button
              className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                selectedGuests === 'any' ? 'bg-black font-bold text-white' : ''
              }`}
              id='any_guest'
              onClick={() => handleGuestClick('any')}
            >
              Any
            </button>
            {[0, 1, 2, 3, 4, 5].map((guest) => (
              <button
                key={guest}
                className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                  selectedGuests === guest ? 'bg-black font-bold text-white' : ''
                }`}
                onClick={() => handleGuestClick(guest)}
              >
                {guest}
              </button>
            ))}
          </div>
        </div>

        <div className='mt-5'>
        <div className='mb-3 font-bold'>Beds</div>
          <div className='flex justify-between gap-1'>
            <button
              className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                selectedBeds === 'any' ? 'bg-black font-bold text-white' : ''
              }`}
              id='any_bed'
              onClick={() => handleBedClick('any')}
            >
              Any
            </button>
            {[0, 1, 2, 3, 4, 5].map((bed) => (
              <button
                key={bed}
                className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                  selectedBeds === bed ? 'bg-black font-bold text-white' : ''
                }`}
                onClick={() => handleBedClick(bed)}
              >
                {bed}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className='font-custom font-bold text-lg my-5'>Amenities</div>
          {amenities.map((amenity) => (
            <div key={amenity} className='flex items-center gap-1 mt-3'>
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

        <div className='w-full h-min bg-white rounded-2xl p-5'>
        <div className='relative'>
          <div className='w-full font-bold text-xl pb-5'>Price</div>
          <input
            type='range'
            min={0}
            max={1000}
            value={price}
            step={10}
            onChange={handlePriceChange}
            className='w-full absolute h-4 bg-transparent scale-x-105 -translate-y-1 accent-black appearance-none rounded-full z-10'
          />
          <div className='w-full bg-white h-2 border-black border rounded-2xl'>
            <div
              className='h-2 absolute bg-black rounded-full'
              style={{ width: `${(price / 1000) * 100}%` }}
            ></div>
          </div>
          <div className='flex justify-between'>
            <div>$0</div>
            <div>$1000</div>
          </div>
          <div className='mt-3'>{`Selected Price: $${price}`}</div>
        </div>

        <div className='flex justify-center'>
          <button className='bg-black text-white w-full max-w-md rounded-md px-5 py-2 mt-5'
          onClick={()=>apply({bedrooms:selectedBedrooms, guests:selectedGuests, beds:selectedBeds,amenities: selectedAmenities, price:price})}
          >Apply Filter</button>
        </div>
      </div>
        
      </div>






      <div className='fixed top-0 z-20 w-full h-full flex justify-center items-center  backdrop-filter backdrop-blur-md'>
      <div className='h-max z-30 bg-white overflow-hidden rounded-2xl drop-shadow-2xl p-2 hidden md:block'>
          <div className='flex justify-between'>
              <div className='font-bold' onClick={()=>{close()}}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 border border-black rounded-md text-black" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12" />
                  </svg>

              </div>
        <div className='w-full text-center font-bold font-custom text-xl mb-5'>Filter</div>
        </div>
        <div className='grid grid-cols-2 gap-5 mx-5'>
        <div className='mt-5'>
          <div className='mb-3 font-bold'>Bedrooms</div>
          <div className='flex justify-between gap-1'>
            <button
              className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                selectedBedrooms === 'any' ? 'bg-black font-bold text-white' : ''
              }`}
              id='any_bed'
              onClick={() => handleBedroomClick('any')}
            >
              Any
            </button>
            {[0, 1, 2, 3, 4, 5].map((bedroom) => (
              <button
                key={bedroom}
                className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                  selectedBedrooms === bedroom ? 'bg-black font-bold text-white' : ''
                }`}
                onClick={() => handleBedroomClick(bedroom)}
              >
                {bedroom}
              </button>
            ))}
          </div>
        </div>

        <div className='mt-5'>
        <div className='mb-3 font-bold'>Guests</div>
          <div className='flex justify-between gap-1'>
            <button
              className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                selectedGuests === 'any' ? 'bg-black font-bold text-white' : ''
              }`}
              id='any_guest'
              onClick={() => handleGuestClick('any')}
            >
              Any
            </button>
            {[0, 1, 2, 3, 4, 5].map((guest) => (
              <button
                key={guest}
                className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                  selectedGuests === guest ? 'bg-black font-bold text-white' : ''
                }`}
                onClick={() => handleGuestClick(guest)}
              >
                {guest}
              </button>
            ))}
          </div>
        </div>

        <div className='mt-5'>
        <div className='mb-3 font-bold'>Beds</div>
          <div className='flex justify-between gap-1'>
            <button
              className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                selectedBeds === 'any' ? 'bg-black font-bold text-white' : ''
              }`}
              id='any_bed'
              onClick={() => handleBedClick('any')}
            >
              Any
            </button>
            {[0, 1, 2, 3, 4, 5].map((bed) => (
              <button
                key={bed}
                className={`h-6 w-10 rounded-lg border border-black font-bold text-center text-[12px] ${
                  selectedBeds === bed ? 'bg-black font-bold text-white' : ''
                }`}
                onClick={() => handleBedClick(bed)}
              >
                {bed}
              </button>
            ))}
          </div>
        </div>
        </div>
        <div>
          <div className='font-custom font-bold text-lg m-5'>Amenities</div>
          <div className='flex gap-5 mx-5'>
          {amenities.map((amenity) => (
            <div key={amenity} className='flex items-center gap-1 mt-3'>
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
        </div>

        <div className='w-full h-max bg-white rounded-2xl p-5'>
        <div className='relative'>
          <div className='w-full font-bold text-xl pb-5'>Price</div>
          <input
            type='range'
            min={0}
            max={1000}
            value={price}
            step={10}
            onChange={handlePriceChange}
            className="w-full absolute h-4 -translate-y-1 scale-x-105 accent-black  rounded-full z-10
            appearance-none bg-transparent 
            [&::-webkit-slider-runnable-track]:rounded-full
              [&::-webkit-slider-thumb]:appearance-none 
              [&::-webkit-slider-thumb]:h-6
               [&::-webkit-slider-thumb]:w-6
                [&::-webkit-slider-thumb]:rounded-full
                 [&::-webkit-slider-thumb]:bg-black"
          />
          <div className='w-full bg-white h-2 border-black border rounded-2xl'>
            <div
              className='h-2 absolute bg-black rounded-full'
              style={{ width: `${(price / 1000) * 100}%` }}
            ></div>
          </div>
          <div className='flex justify-between pt-3'>
            <div>$0</div>
            <div>$1000</div>
          </div>
          <div className='mt-3'>{`Selected Price: $${price}`}</div>
        </div>
        <div className='flex justify-center'>
          <button className='bg-black text-white w-full max-w-md rounded-md px-5 py-2 mt-5'
          onClick={()=>apply({bedrooms:selectedBedrooms, guests:selectedGuests, beds:selectedBeds,amenities: selectedAmenities, price:price})}
          >Apply Filter</button>
        </div>
      </div>
      </div>
      </div>
  
      </>
  );
}

export default Filter;
