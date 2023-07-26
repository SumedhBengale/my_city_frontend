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
    const [currencySwitcherVisible, setCurrencySwitcherVisible] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('Property Currency');
  
    const currencies = {
      'AUD': "Australian Dollar",
      'CAD': "Canadian Dollar",
      'EUR': "Euro",
      'USD': "US Dollar",
      'SGD': "Singapore Dollar",
      'GBP': 'Pound Sterling',
      'INR': 'Indian Rupee',
    };  

    const handleCurrencySelect = (currency) => {
        setSelectedCurrency(currency);
        setCurrencySwitcherVisible(false);
        };

    return (
    <>
    {currencySwitcherVisible && (
        <div className='fixed bottom-0 h-screen w-screen backdrop-blur-lg bg-black/40 flex justify-center items-end md:items-center z-50'>
            <div className=' w-full md:w-1/2 bg-white rounded-2xl p-5'>
            <div className='flex justify-between mb-5'>
              <div className='font-bold' onClick={()=>setCurrencySwitcherVisible(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 border border-black rounded-md text-black" fill="none"
                          viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </div>
        <div className='w-full text-center font-bold font-custom text-xl mb-1'>Currency Switcher</div>
        </div>
            <div className=''>
                <div className='font-bold px-4 py-2 bg-gray-100 mb-2'>Suggested Currencies</div>
                {
                    Object.keys(currencies).map((currency) => (
                        !['GBP', 'INR'].includes(currency) && (
                            <div key={currency} className={`px-4 py-2 cursor-pointer ${selectedCurrency === currency ? 'bg-gray-100' : ''}`} onClick={() => handleCurrencySelect(currency)}>
                            {currency + ' - ' + currencies[currency]}
                            </div>
                        )
                    ))
                }
            </div>
            <div className=''>
                <div className='font-bold px-4 py-2 bg-gray-100 mb-2'>All Currencies</div>
                {
                    Object.keys(currencies).map((currency) => (
                        ['GBP', 'INR'].includes(currency) && (
                        <div key={currency} className={`px-4 py-2 cursor-pointer ${selectedCurrency === currency ? 'bg-gray-100' : ''}`} onClick={() => handleCurrencySelect(currency)}>
                            {currency + ' - ' + currencies[currency]}
                        </div>
                        )
                    ))
                }
                <div className={`px-4 py-2 cursor-pointer ${selectedCurrency === 'Property Currency' ? 'bg-gray-100' : ''}`} onClick={() => handleCurrencySelect('Property Currency')}>
                    Property Currency
                </div>
            </div>
            </div>
        </div>
      )}
    <div className="Rectangle w-full bg-zinc-100 mt-10" >
        <div className='container mx-auto'>
            <div className='flex justify-center'>        
                <img src={black_logo} alt='logo' className='h-20 max-w-[300px] pt-5 pl-5'></img>
            </div>

        <div className='flex flex-col md:flex-row justify-between md:mx-5'>
            <div className='pt-10 pl-5'>
                <div className='font-custom font-bold text-xl' onClick={()=> setCurrencySwitcherVisible(!currencySwitcherVisible)}>Currency Switcher</div>
            </div>

            <div className='pt-10 pl-5'>
                <div className='font-custom font-bold text-xl'>Explore</div>
                <div className="text-black text-md pt-3 pl-3">Apartment</div>
                <div className="text-black text-md pt-3 pl-3">Condominimum</div>
            </div>

            <div className='pt-10 pl-5'>
                <div className='font-custom font-bold text-xl'>Company</div>
                <div className="text-black text-md pt-3 pl-3">Properties</div>
                <div className="text-black text-md pt-3 pl-3">Things to do</div>
                <div className="text-black text-md pt-3 pl-3">Management</div>
                <div className="text-black text-md pt-3 pl-3">Privacy Policy</div>
                <div className="text-black text-md pt-3 pl-3">Terms and Conditions</div>
            </div>

            <div className='pt-10 pl-5'>
                <div className='font-custom font-bold text-xl w-full'>Contact Us</div>
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