import React from 'react'
import Navbar from '../../components/navbar_black'
import DesktopNavbar from '../../components/desktopNavbarBlack'
import Image1 from '../../assets/images/about/about_img_1.jpg'
import Footer from '../HomePage/Footer'
import location_black from '../../assets/images/contact/location_black.svg'
import phone_black from '../../assets/images/contact/phone_black.svg'
import email_black from '../../assets/images/contact/email_black.svg'
import FadeInSetion from '../../components/fadeIn/fadeInSection'

function ContactUs() {
  return (
    <>
        <div className="hidden md:block z-20 fixed top-0  w-full">
        {
           <DesktopNavbar />
        }
        </div>

        <div className="md:hidden z-20 fixed w-full">
          {
            <Navbar />
          }
        </div>
          {/* Hacky solution utilizing negative margins and translations, because if used absolute value to overlap text over image 
          then navbar menu get's messed up. 
          Will check later */}
          <div className='h-16 bg-transparent'></div>
          <FadeInSetion>
          <div className='md:hidden relative mr-5'>
        <div className='w-full h-[300px] rounded-r-[70px]'>
          <img src={Image1} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[70px] " />
        </div>
        <div className='absolute bottom-0 h-full text-center flex justify-end flex-col w-full pb-20 bg-gradient-to-b from-transparent via-gray to-black/60 rounded-r-[70px] px-10'>
          <div className='text-white font-bold text-3xl  drop-shadow-lg font-custom'>Contact Us</div>
          <div className='text-white text-md drop-shadow-lg'>We Offer Unique Places Suitable For Your Confort</div>

        </div>
      </div>

      <div className='hidden md:block  relative md:mr-10 xl:mr-20'>
      <div className='w-full md:h-[400px] lg:h-[500px] rounded-r-[150px]'>
          <img src={Image1} alt="About Us" className="w-full h-full md:object-fill lg:object-cover rounded-r-[150px] " />
        </div>
        <div className='absolute bottom-0 h-full text-center flex justify-end flex-col w-full backdrop-filter backdrop-blur-sm pb-20 bg-gradient-to-b from-transparent via-gray to-black/40 rounded-r-[150px]'>
          <div className='text-white font-bold text-6xl  drop-shadow-lg font-custom'>Contact Us</div>
          <div className='text-white text-lg drop-shadow-lg'>We Offer Unique Places Suitable For Your Confort</div>
        </div>
      </div>
      </FadeInSetion>
      <FadeInSetion>
          <div className='w-full h-full px-5'>
            <div className='flex flex-col h-full bg-gray-200 m-5 rounded-lg container mt-10 mx-auto'>
              <div className='font-custom font-bold text-xl mx-3 mt-3 text-black'>Get In Touch</div>
              <hr className="w-36 border-sm my-4 ml-3 border-[1px] border-black" />
              <div className='flex flex-col md:flex-row gap-3 w-full justify-center md:items-center'>
                <input className=" md:w-full mx-3 h-12 px-2 bg-white rounded-lg" type='email' placeholder='Email'>
                      {/* Email Input */}
                  </input>
                  <input 
                  //set number of lines
                  rows={5}
                  className=" md:w-full mx-3 h-36 md:h-12 px-2 bg-white rounded-lg" type='text' placeholder='Description'>
                      {/* Email Input */}
                  </input>
                  <div className=' rounded-lg px-3 w-full md:w-min hover:scale-105 transition duration-75 flex justify-center'>
                    <button className="bg-black text-white font-bold font-custom text-lg h-12 w-full md:w-40 rounded-lg my-2">Submit</button>
                  </div>
                </div>
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
          </div>
          </FadeInSetion>
          <FadeInSetion>
            <Footer></Footer>
          </FadeInSetion>
    </>
  )
}

export default ContactUs