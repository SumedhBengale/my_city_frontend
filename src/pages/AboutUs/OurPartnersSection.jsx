import React from 'react'
import Carousel from './Carousel'
import Footer from '../HomePage/Footer'

function OurPartnersSection() {
  return (
    <>
        <div className="mt-5">
            <div className="text-center text-black text-2xl font-bold capitalize">Our Partners</div>
        </div>

        <Carousel></Carousel>

        <Footer></Footer>

    </>
  )
}

export default OurPartnersSection


