import React from 'react'
import Navbar from '../../components/navbar_black'
import Image1 from '../../assets/images/about/about_img_1.jpg'
import Footer from '../HomePage/Footer'
import location_black from '../../assets/images/contact/location_black.svg'
import phone_black from '../../assets/images/contact/phone_black.svg'
import email_black from '../../assets/images/contact/email_black.svg'

function ContactUs() {
  return (
    <>
      <div className='z-20 absolute w-full'>
        <Navbar />
        </div>
          {/* Hacky solution utilizing negative margins and translations, because if used absolute value to overlap text over image 
          then navbar menu get's messed up. 
          Will check later */}
      <div className="w-full pr-8 pt-16">
        <img src={Image1} alt="About Us" className="w-full h-full object-cover" />
        <div className="flex flex-col items-center -translate-y-20 -my-10 w-full h-full">
            <p className="text-white font-custom text-2xl font-bold">Who Are We?</p>
            <p className='text-white font-custom text-lg w-2/3 text-center capitalize'>Discover your next home away from home</p>
        </div>
      </div>
          <div className='w-full h-full'>
            <div className='flex flex-col h-full bg-gray-200 m-5 rounded-lg'>
              <div className='font-custom text-xl mx-3 mt-3 text-black font-bold'>Get In Touch</div>
              <hr className="w-36 border-sm my-4 ml-3 border-[1px] border-black" />
              <input className=" max-w-lg mx-3 h-12 my-4 px-2 bg-white rounded-lg" type='email' placeholder='Email'>
                    {/* Email Input */}
                </input>
                <textarea 
                //set number of lines
                rows={5}
                className=" max-w-lg mx-3 h-36 my-4 px-2 bg-white rounded-lg" type='text' placeholder='Description'>
                    {/* Email Input */}
                </textarea>

                <button className="bg-black text-white font-bold font-custom text-lg max-w-md h-12 rounded-lg mx-3 my-4">Submit</button>

                <div className="mx-3 mb-5 flex flex-col text-center"><span className="text-zinc-800 text-xs font-normal leading-normal">Thank you so much for your interest! We’d love to hear from you and help you book your dream vacation! Please submit your email or email directly to: </span><span className="text-zinc-800 text-xs font-semibold leading-normal">info@mycityresidences.com</span></div>

                <div className='pt-5 pl-5'>
                      <div className=' flex items-center h-full mt-5'>
                          <img src={location_black} alt='location' className='w-8 pr-3'></img>
                          <div className=" w-full text-black text-sm flex items-center">96 Earls Court Road, Kensington, W8 6EG</div>
                      </div>

                      <div className='flex items-center h-full mt-5'>
                          <img src={phone_black} alt='location' className='w-8 pr-3'></img>
                          <div className=" w-full text-black text-sm flex items-center">+44 744 221 1353</div>
                      </div>

                      <div className='flex items-center h-full mt-5 mb-5'>
                          <img src={email_black} alt='location' className='w-8 pr-3'></img>
                          <div className=" w-full text-black text-sm flex items-center">info@mycityresidences.comk</div>
                      </div>
              </div>
            </div>
            <Footer></Footer>

          </div>
          


    </>
  )
}

export default ContactUs