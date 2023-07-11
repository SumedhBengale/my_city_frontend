import React from 'react'
import background from '../../assets/images/management/image3.png'
import handshake from '../../assets/images/management/handshake.svg'



function HowItWorks() {
  return (
    <>
        <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%',
        }}
      > {/* Background Image */}


        <div className='font-custom text-4xl fond-bold text-white text-center pt-10'>How It Works?</div>
        
        <div className='w-full flex justify-center'>
            <div className=" w-full h-min m-5 bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-xl">
                <div className='flex justify-center items-center mt-10'>
                    <img src={handshake} alt="handshake" className="w-10 h-10 object-cover rounded-t-2xl"/>
                </div>
                <div className=" w-full text-center text-white font-custom text-xl px-5 pt-5 capitalize leading-relaxed">1. With a corporate leasing arrangement, we become your tenant and give the following benefits.</div>
                <div className=" w-full text-center text-white text-xs font-normal leading-7 my-4">- Your property is maintained to hotel standards.</div>
            </div>
        </div>

        <div className='w-full flex justify-center'>
            <div className=" w-full h-min m-5 bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-xl">
                <div className='flex justify-center items-center mt-10'>
                    <img src={handshake} alt="handshake" className="w-10 h-10 object-cover rounded-t-2xl"/>
                </div>
                <div className=" w-full text-center text-white font-custom text-xl px-5 pt-5 capitalize leading-relaxed">2. We operate the property for you as a short-term rental.</div>
                <div className=" w-full text-center text-white text-xs font-normal leading-7 my-4">- The process of us renting out your property on a short-term basis and becoming your tenant is nearly identical; the only difference is that the return may vary from month to month based on the occupancy of these properties as well as the market.</div>
            </div>
        </div>

        <div className='w-full flex justify-center pb-5'>
            <div className=" w-full h-min m-5 bg-white bg-opacity-5 rounded-2xl border border-white backdrop-blur-xl">
                <div className='flex justify-center items-center mt-10'>
                    <img src={handshake} alt="handshake" className="w-10 h-10 object-cover rounded-t-2xl"/>
                </div>
                <div className=" w-full text-center text-white font-custom text-xl px-5 pt-5 capitalize leading-relaxed">3. We purchase the property</div>
                <div className=" w-full text-center text-white text-xs font-normal leading-7 my-4">-Based on your requirements this would be better discussed over the phone where we can make arrangements accordingly. You may also call us at +447442211353 or email us at info@mycityresidences.com</div>
            </div>
        </div>

      </div>
    </>
  )
}

export default HowItWorks