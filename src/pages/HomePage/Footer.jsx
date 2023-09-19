import {React, useState} from 'react'
import black_logo from '../../assets/images/black_logo.png'
import location_black from '../../assets/images/home/location_black.svg'
import phone_black from '../../assets/images/home/phone_black.svg'
import email_black from '../../assets/images/home/email_black.svg'
import twitter from '../../assets/images/home/twitter.svg'
import facebook from '../../assets/images/home/facebook.svg'
import instagram from '../../assets/images/home/instagram.svg'
import linkedin from '../../assets/images/home/linkedin.svg'

function Footer() {
  
    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setCurrencySwitcherVisible(false);
        };

    return (
    <>
    <div className="Rectangle w-full rounded-tl-[50px] md:rounded-tl-[100px] bg-neutral-100 h-full]" >
        <div className='mx-0 2xl:container 2xl:mx-auto py-10'>    
                <div className='flex flex-col md:flex-row justify-between w-full px-4'>
                    <div className='pt-10 pl-5 order-2 md:order-1  py-10'>
                        <div className='font-custom-bold text-primary text-xl pl-3'>Explore</div>
                        <div className="text-black text-md pt-3 pl-3">Home</div>
                        <div className="text-black text-md pt-3 pl-3">Properties</div>
                        <div className="text-black text-md pt-3 pl-3">Rental Estimate</div>

                    </div>

                    <div className='pt-10 pl-5 order-3 md:order-2  py-10'>
                        <div className='font-custom-bold text-primary text-xl pl-3'>Company</div>
                        <div className="text-black text-md pt-3 pl-3">About Us</div>
                        <div className="text-black text-md pt-3 pl-3">Blogs</div>
                        <div className="text-black text-md pt-3 pl-3">Management</div>
                    </div>

                    <div className='pl-5 sm:pl-0 h-full flex md:items-between md:justify-between flex-col order-1 md:order-3'>
                    <div className='flex flex-col h-min pt-4 px-4'>
                        <div className='flex justify-center mb-5'>        
                            <img src={black_logo} alt='logo' className='h-24 max-w-[300px] pt-5 pl-5 md:pt-0'></img>
                        </div>

                        <div className='flex justify-center mt-5 gap-5'>
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
                    </div>
                    <div className='text-center text-black mt-5 text-sm pl-5 hidden md:block'>
                        My City Residence ©2023. All rights reserved.
                    </div>
                </div>
                    <div className='pt-10 pl-5 order-4  py-10'>
                        <div className='font-custom-bold text-primary text-xl w-full'>Contact Us</div>
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
                    <div className='text-center text-primary mt-5 text-sm pl-5 md:hidden order-5'>
                        My City Residence ©2023. All rights reserved.
                    </div>
                </div>
        
        </div>
    </div>
    </>
  )
}

export default Footer