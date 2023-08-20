import React from 'react'

function Amenities(props) {
    const [showAmenities, setShowAmenities] = React.useState(false)
    const amenities = props.amenities
    const expanded = props.expanded
    console.log(amenities)
  return (
    <>  
        <div className='mx-2 my-2 mt-10'>
            <hr className='w-full h-[2px]'></hr>
        </div> 
        <div className='text-2xl text-start pt-5 font-bold pb-2 pl-10'>Amenities</div>
        {showAmenities &&<div> <div className='flex flex-col mx-5 mb-10'>
            <div className={`grid grid-cols-2 ${
                expanded ? 'md:grid-cols-2' : 'md:grid-cols-3 lg:grid-cols-4'
            } gap-5`}>
                {amenities.map((amenity, index) => (
                    <div className='flex justify-center'>
                        <div className='w-3/4 h-16  border-[1px] border-secondary hover:scale-105 transition duration-75 hover:bg-secondary hover:text-white rounded-xl flex justify-center items-center'>
                            <div className='text-center text-sm px-1'>{amenity}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
        }
        <div className='flex flex-col justify-center my-10'>
            {!showAmenities && <div className={`grid grid-cols-2 ${
                expanded ? 'md:grid-cols-2' : 'md:grid-cols-3 lg:grid-cols-4'
            } gap-5 mb-5`}>
                <div className='flex justify-center'>
                    <div className='w-3/4 h-16  border-[1px]  border-secondary hover:scale-105 transition duration-75 hover:bg-secondary text-primary hover:text-white rounded-xl flex justify-center items-center'>
                        <div className='text-center text-sm px-1'>{amenities[0]}</div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-3/4 h-16  border-[1px]  border-secondary hover:scale-105 transition duration-75 hover:bg-secondary text-primary hover:text-white rounded-xl flex justify-center items-center'>
                        <div className='text-center text-sm px-1'>{amenities[1]}</div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-3/4 h-16  border-[1px]  border-secondary hover:scale-105 transition duration-75 hover:bg-secondary text-primary hover:text-white rounded-xl flex justify-center items-center'>
                        <div className='text-center text-sm px-1'>{amenities[2]}</div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-3/4 h-16  border-[1px]  border-secondary hover:scale-105 transition duration-75 hover:bg-secondary text-primary hover:text-white rounded-xl flex justify-center items-center'>
                        <div className='text-center text-sm px-1'>{amenities[3]}</div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div className='w-3/4 h-16  border-[1px]  border-secondary hover:scale-105 transition duration-75 hover:bg-secondary text-primary hover:text-white rounded-xl flex justify-center items-center'>
                        <div className='text-center text-sm'>{amenities[4]}</div>
                    </div>
                </div>
            </div>}
            <div className='flex justify-center'>
            <button className='flex justify-center w-48 fill-primary hover:fill-white border-primary hover:scale-105 transition duration-75 hover:bg-primary hover:text-white bg-white border rounded-lg px-3 py-2' onClick={()=>setShowAmenities(!showAmenities)}>
                <div className=' active:text-black font-bold text-md '>{` ${showAmenities ? 'Hide Amenities' : "Show Amenities"}`}</div>
                {/*Down arrow svg */}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 self-center ml-2 ${showAmenities ? 'rotate-180' : ''}`} viewBox="0 0 20 20" >
                    <path fillRule="evenodd" d="M10 16a1 1 0 01-.707-.293l-6-6a1 1 0 111.414-1.414L10 13.586l5.293-5.293a1 1 0 111.414 1.414l-6 6A1 1 0 0110 16z" clipRule="evenodd" />
                </svg>
            </button>
            </div>
        </div>

    </>
  )
}

export default Amenities