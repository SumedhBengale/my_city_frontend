import React from 'react'

function Amenities(props) {
    const [showAmenities, setShowAmenities] = React.useState(false)
    const amenities = props.amenities
    console.log(amenities)
  return (
    <>  
        <div className='text-2xl text-center pt-5 font-bold pb-2'>Amenities</div>
        {showAmenities &&<div> <div className='flex flex-col mx-5 mb-10'>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5'>
                {amenities.map((amenity, index) => (
                    <div className='flex justify-center'>
                        <div className='w-3/4 h-12  border-[1px] border-black  hover:scale-105 transition duration-75 hover:bg-black hover:text-white rounded-xl flex justify-center items-center'>
                            <div className='text-center'>{amenity}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
        }
        <div className='flex justify-center my-10'>
            <button className='flex justify-center fill-black hover:bg-black hover:fill-white text-black hover:text-white bg-white border border-black rounded-lg px-3 py-2' onClick={()=>setShowAmenities(!showAmenities)}>
                <div className=' active:text-black font-bold text-lg '>{` ${showAmenities ? 'Hide Amenities' : "Show Amenities"}`}</div>
                {/*Down arrow svg */}
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 self-center ml-2 transform transition ease-in duration-100 ${showAmenities ? 'rotate-180' : ''}`} viewBox="0 0 20 20" >
                    <path fillRule="evenodd" d="M10 16a1 1 0 01-.707-.293l-6-6a1 1 0 111.414-1.414L10 13.586l5.293-5.293a1 1 0 111.414 1.414l-6 6A1 1 0 0110 16z" clipRule="evenodd" />
                </svg>
            </button>
        </div>

        {showAmenities && 
        <div className='h-full mx-2 my-2'>
            <hr className='w-full h-[2px] bg-black'></hr>
        </div> 
        }
    </>
  )
}

export default Amenities