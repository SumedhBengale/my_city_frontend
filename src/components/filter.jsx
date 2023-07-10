import React, { useState } from 'react';

function Filter({ apply, close }) {
  const [selectedBedrooms, setSelectedBedrooms] = useState(null);
  const [selectedGuests, setSelectedGuests] = useState(null);
  const [selectedBeds, setSelectedBeds] = useState(null);
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
      <div
        className={`absolute bottom-0 w-full h-max flex justify-center items-end z-10 backdrop-filter backdrop-blur-sm `}>
        <div className='w-full h-3/4 bg-white rounded-t-2xl p-2'>
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
            <div className='flex justify-between'>
              <button
                className={`h-6 w-8 rounded-md border border-black text-center text-sm ${
                  selectedBedrooms === 'any' ? 'bg-black text-white' : ''
                }`}
                id='any_bed'
                onClick={() => handleBedroomClick('any')}
              >
                Any
              </button>
              {[0, 1, 2, 3, 4, 5].map((bedroom) => (
                <button
                  key={bedroom}
                  className={`h-6 w-8 rounded-md border border-black text-center text-sm ${
                    selectedBedrooms === bedroom ? 'bg-black text-white' : ''
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
            <div className='flex justify-between'>
              <button
                className={`h-6 w-8 rounded-md border border-black text-center text-sm ${
                  selectedGuests === 'any' ? 'bg-black text-white' : ''
                }`}
                id='any_guest'
                onClick={() => handleGuestClick('any')}
              >
                Any
              </button>
              {[0, 1, 2, 3, 4, 5].map((guest) => (
                <button
                  key={guest}
                  className={`h-6 w-8 rounded-md border border-black text-center text-sm ${
                    selectedGuests === guest ? 'bg-black text-white' : ''
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
            <div className='flex justify-between'>
              <button
                className={`h-6 w-8 rounded-md border border-black text-center text-sm ${
                  selectedBeds === 'any' ? 'bg-black text-white' : ''
                }`}
                id='any_bed'
                onClick={() => handleBedClick('any')}
              >
                Any
              </button>
              {[0, 1, 2, 3, 4, 5].map((bed) => (
                <button
                  key={bed}
                  className={`h-6 w-8 rounded-md border border-black text-center text-sm ${
                    selectedBeds === bed ? 'bg-black text-white' : ''
                  }`}
                  onClick={() => handleBedClick(bed)}
                >
                  {bed}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className='text-lg my-5 font-bold'>Amenities</div>
            {amenities.map((amenity) => (
                <div key={amenity} className='flex items-center gap-3 mt-3'>
                    <input type='checkbox' id={amenity} name={amenity} value={amenity} onChange={()=>{
                        //if the amenity is selected add it to selectedAmenities else remove it from selectedAmenities
                        if(selectedAmenities.includes(amenity)){
                            setSelectedAmenities(selectedAmenities.filter((selectedAmenity)=>selectedAmenity!==amenity))
                            console.log(selectedAmenities)
                        }else{
                            setSelectedAmenities([...selectedAmenities,amenity])
                            console.log(selectedAmenities)
                        }
                    }}/>
                    <label htmlFor={amenity}>{amenity}</label>
                    </div>
            ))}
          </div>

          <div className='w-full h-3/4 bg-white rounded-2xl p-5'>
          <div className='w-full text-center font-bold text-xl'>Filter</div>

          <div className='mt-5'>
            <div className='w-full text-center font-bold'>Price</div>
            <input
              type='range'
              min={0}
              max={1000}
              step={10}
              value={price}
              onChange={handlePriceChange}
              className='w-full h-4 appearance-none rounded-md bg-white outline-1 outline'
              style={{
                backgroundSize: `${(price / 1000) * 100}% 100%`,
              }}
            />
            <div className='flex justify-between'>
                <div>$0</div>
                <div>$1000</div>
            </div>
            <div className='mt-3'>{`Selected Price:$${price}`}</div>
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
