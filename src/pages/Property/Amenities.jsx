import React from 'react'

function Amenities() {
    const amenities = [
        'Bed Linen',
        'Ovens',
        'Iron',
        'Hot Water',
        'Toaster',
        'Hair Dryer',
        'Washer',
        'Kitchen',
        'Bed Linen',
        'Ovens',
        'Iron',
        'Hot Water',
        'Toaster',
        'Hair Dryer',
        'Washer',
        'Kitchen',
        
    ]
  return (
    <>
        <div className='flex flex-col mx-5 mb-10'>
            <div className='text-lg pt-3 font-bold pb-5'>Amenities</div>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
                {amenities.map((amenity, index) => (
                    <div className='flex justify-center'>
                        <div className='w-3/4 h-12  border-[2px] border-black rounded-xl flex justify-center items-center'>
                            <div className='text-center'>{amenity}</div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    </>
  )
}

export default Amenities