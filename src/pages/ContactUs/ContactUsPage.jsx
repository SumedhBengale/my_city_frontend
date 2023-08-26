import React from 'react'
import NavbarBlack from '../../components/navbar_black'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import contactBackground from '../../assets/images/contact/contactBackground.jpeg'
import Footer from '../HomePage/Footer'
import location_black from '../../assets/images/contact/location_black.svg'
import phone_black from '../../assets/images/contact/phone_black.svg'
import email_black from '../../assets/images/contact/email_black.svg'
import FadeInSetion from '../../components/fadeIn/fadeInSection'

function ContactUs() {
  return (
    <>
        <div
        style={{
          backgroundImage: `url(${contactBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '70vh',
        }}
      > {/* Background Image */}
        <div className="hidden md:block z-30 fixed w-full">
        {
          <DesktopNavbarBlack />
        }
        </div>

        <div className="md:hidden z-30 fixed w-full">
          {
            <NavbarBlack />
          }
        </div>


        <div className='h-full flex flex-col justify-center items-center z-0 bg-black/40 backdrop-filter backdrop-blur-sm'>
            <div className='font-custom-bold text-4xl md:text-5xl text-white text-center pt-96 pb-4 capitalize'>Contact Us</div>
            <div className=' text-2xl md:text-4xl w-full text-center font-custom text-white sm-3 lg:mb-10 capitalize'>We offer unique places suitable for your comfort</div>
        </div>
      </div>
      <FadeInSetion>
          <div className='w-full h-full px-5'>
            <div className='flex flex-col justify-center items-center h-full bg-gray-200 w-full md:px-5 m-5 rounded-lg container mt-10 mx-auto'>
              <div className='font-custom-bold text-xl mx-3 md:mx-0 mt-3 text-black'>Get In Touch</div>
              <hr className="w-36 border-sm my-4 ml-3 mx-3 md:mx-0 border-[1px] border-black" />

              <div className='flex flex-col sm:flex-row w-full justify-center md:items-start px-3 gap-5'>
                <input className=" sm:w-full h-12 px-2 mt-3 bg-white rounded-lg shadow-lg" type='text' placeholder='First Name'>
                      {/* Email Input */}
                </input>
                <input className=" sm:w-full h-12 px-2 mt-3 bg-white rounded-lg shadow-lg" type='text' placeholder='Last Name'>
                    {/* Email Input */}
                </input>
                </div>

              <div className='flex flex-col w-full justify-center md:items-start px-3'>
                <input className=" sm:w-full h-12 px-2 mt-3 bg-white rounded-lg shadow-lg" type='email' placeholder='Email'>
                      {/* Email Input */}
                  </input>
                  <textarea 
                  //set number of lines
                  rows={5}
                  className="md:w-full mt-3 h-36 md:h-36 p-2 bg-white rounded-lg shadow-lg" type='text' placeholder='Message'>
                      {/* Email Input */}
                  </textarea>
                  <div className='w-full flex justify-center'>
                  <div className=' rounded-lg px-3 w-full md:w-min hover:scale-105 transition duration-75 mt-3'>
                    <button className=" border bg-secondary border-secondary hover:bg-primary hover:text-white text-white font-bold font-custom text-lg h-12 w-full md:w-40 rounded-lg my-2">Submit</button>
                  </div>
                  </div>
                </div>
                <div className="mx-3 my-5 flex flex-col text-center"><span className="text-zinc-800 text-xs font-normal leading-normal">Thank you so much for your interest! We’d love to hear from you and help you book your dream vacation! Please submit your email or email directly to: </span><span className="text-zinc-800 text-xs font-semibold leading-normal">info@mycityresidences.com</span></div>

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
          {/* <FadeInSetion> */}
            <Footer></Footer>
          {/* </FadeInSetion> */}
    </>
  )
}

export default ContactUs