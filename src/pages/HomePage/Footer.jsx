import React from 'react'
import black_logo from '../../assets/images/black_logo.png'
import location_black from '../../assets/images/home/location_black.svg'
import phone_black from '../../assets/images/home/phone_black.svg'
import email_black from '../../assets/images/home/email_black.svg'
import twitter from '../../assets/images/home/twitter.svg'
import facebook from '../../assets/images/home/facebook.svg'
import instagram from '../../assets/images/home/instagram.svg'
import linkedin from '../../assets/images/home/linkedin.svg'

function Footer() {
  return (
    <>
    <div className="Rectangle w-full bg-zinc-100 mt-10" >
        <div className='container mx-auto'>
        <img src={black_logo} alt='logo' className='w-1/2 sm:w-1/3 md:w-1/6 max-w-[300px] pt-5 pl-5'></img>
        <div className='flex flex-col md:flex-row justify-between md:mx-5'>
            <div className='pt-10 pl-5'>
                <div className='font-custom text-xl font-bold'>Currency Switcher</div>
            </div>

            <div className='pt-10 pl-5'>
                <div className='font-custom text-xl font-bold'>Explore</div>
                <div className="text-black text-md pt-3 pl-3">Apartment</div>
                <div className="text-black text-md pt-3 pl-3">Condominimum</div>
            </div>

            <div className='pt-10 pl-5'>
                <div className='font-custom text-xl font-bold'>Company</div>
                <div className="text-black text-md pt-3 pl-3">Properties</div>
                <div className="text-black text-md pt-3 pl-3">Things to do</div>
                <div className="text-black text-md pt-3 pl-3">Management</div>
                <div className="text-black text-md pt-3 pl-3">Privacy Policy</div>
                <div className="text-black text-md pt-3 pl-3">Terms and Conditions</div>
            </div>

            <div className='pt-10 pl-5'>
                <div className='font-custom text-xl font-bold w-full'>Contact Us</div>
                    <div className=' flex items-center mt-5'>
                        <img src={location_black} alt='location' className='w-10 pr-3'></img>
                        <div className=" w-full text-black text-md flex items-center">Po Box 1046, Stockton On Tees, TS19 1XL</div>
                    </div>

                    <div className='mr-5'>
                        <div className="w-full h-[1px] bg-black mt-3 mr-20" />
                    </div>

                    <div className='flex items-center mt-5'>
                        <img src={phone_black} alt='location' className='w-10 pr-3'></img>
                        <div className=" w-full text-black text-md flex items-center">800 987 6543</div>
                    </div>

                    <div className='mr-5'>
                        <div className="w-full h-[1px] bg-black mt-3 mr-20" />
                    </div>

                    <div className='flex items-center mt-5'>
                        <img src={email_black} alt='location' className='w-10 pr-3'></img>
                        <div className=" w-full text-black text-md flex items-center">info@boostly.co.uk</div>
                    </div>

                    <div className='mr-5'>
                        <div className="w-full h-[1px] bg-black mt-3 mr-20" />
                    </div>
            </div>
        </div>

        <div className='flex flex-col md:flex-row md:justify-between md:m-5'>
            <div className='flex justify-evenly mt-5 md:gap-5'>
                <div className='w-8 h-8 rounded-full border-[2px] border-black'>
                    <img src={twitter} alt='twitter' className='w-5 h-5 ml-1 mt-1'></img>
                </div>

                <div className='w-8 h-8 rounded-full border-[2px] border-black'>
                    <img src={facebook} alt='twitter' className='w-5 h-5 ml-1 mt-1'></img>
                </div>

                <div className='w-8 h-8 rounded-full border-[2px] border-black'>
                    <img src={instagram} alt='twitter' className='w-5 h-5 ml-1 mt-1'></img>
                </div>

                <div className='w-8 h-8 rounded-full border-[2px] border-black'>
                    <img src={linkedin} alt='twitter' className='w-5 h-5 ml-1 mt-1'></img>
                </div>
            </div>

            <div className='flex justify-center mt-5 text-sm'>
                My City Residence ©2023. All rights reserved.
            </div>
        </div>
        </div>
    </div>
    </>
  )
}

export default Footer