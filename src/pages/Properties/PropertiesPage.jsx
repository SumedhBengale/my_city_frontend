import {React, useState} from 'react'
import Navbar from '../../components/navbar'
import PropertiesBackground from '../../assets/images/properties/properties_top_image.jpg'
import SearchCard from '../../components/searchCard'
import filterBlack from '../../assets/images/properties/filter_black.svg'
import PropertyCard from '../HomePage/PropertyCard'
import Footer from '../HomePage/Footer'

function PropertiesPage() {
    const [sortValue, setsortValue] = useState('r-hl')
  return (
    <>
    <div
        style={{
          backgroundImage: `url(${PropertiesBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
        }}
      > {/* Background Image */}
        <div className='z-10 relative'>
        <Navbar />
        </div>


        <div className='h-full flex flex-col justify-center items-center mx-5 z-0'>
          <div className='font-custom text-4xl text-white font-bold text-center'>My City Residence</div>
          <div className='font-custom text-lg w-3/4 text-center text-white capitalize mb-10'>Discover your next home away from home</div>

          <SearchCard></SearchCard>
        </div>
      </div>

    <div className='mx-5 mt-5'>
        <div className="text-black font-custom text-2xl font-bold capitalize">Nearby Properties</div>
        <div className='flex justify-between mt-3'>
            <div className='h-8 w-8 bg-gray-200 rounded-md flex justify-center items-center'>
                <img src={filterBlack} alt="filter" className='h-3/4 w-3/4'/>
            </div>
            <div className="flex">
                <div className="text-sm self-center">Sort by:</div>
                <select className="text-sm ml-1 self-center" value={sortValue} onChange={(e)=>setsortValue(e.target.value)}>
                    <option value="p-hl">Price (High to Low)</option>
                    <option value="p-lh">Price (Low to High)</option>
                    <option value="r-hl">Rating (High to Low)</option>
                </select>
            </div>
        </div>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>

        <div className='flex justify-center mt-10'>
            <div className="w-[178px] h-14 bg-zinc-900 rounded-xl backdrop-blur-md" >
            <div className='text-white font-custom text-2xl h-full flex justify-center items-center'>View All</div>
            </div>
        </div>

    </div>
    <Footer></Footer>

    </>
  )
}

export default PropertiesPage