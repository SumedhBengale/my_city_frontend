import React from 'react'
import tick from '../../assets/images/management/tick.svg'
import keyHandover from '../../assets/images/management/key_handover.jpg'

function WhyUs() {
  return (
    <>
        <div className='flex flex-col md:flex-row justify-center container mx-auto gap-10 my-10'>
            <div className = 'flex justify-center items-center'>
                <img src={keyHandover}  alt="key-handover" className="w-full sm:w-80 h-full sm:h-80 object-cover"/>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 col-span-2 gap-5'>
                
                <div className='flex justify-center lg:justify-start'>
                    <img src={tick} alt="tick" className="w-10 h-10 object-cover mr-5"/>
                    <div>
                        <div className='font-custom-bold text-lg fond-bold text-primary text-center sm:text-start sm:pl-5'>Guaranteed rental income</div>
                        <div className='text-sm text-primary text-center sm:text-start sm:pl-5'>A guaranteed rental income on time, every month.</div>
                    </div>
                </div>
                <div className='flex justify-center lg:justify-start'>
                    <img src={tick} alt="tick" className="w-10 h-10 object-cover mr-5"/>
                    <div>
                        <div className='font-custom-bold text-lg fond-bold text-primary text-center sm:text-start sm:pl-5'>Inspections & certifications</div>
                        <div className='text-sm text-primary text-center sm:text-start sm:pl-5'>Regular property inspections, free repairs and maintenance up to $50 including VAT.</div>
                    </div>
                </div>
                <div className='flex justify-center lg:justify-start'>
                    <img src={tick} alt="tick" className="w-10 h-10 object-cover mr-5"/>
                    <div>
                        <div className='font-custom-bold text-lg fond-bold text-primary text-center sm:text-start sm:pl-5'>Long term tenancy contract</div>
                        <div className='text-sm text-primary text-center sm:text-start sm:pl-5'>We offer long term tenancy contracts to our property partners.</div>
                    </div>
                </div>
                <div className='flex justify-center lg:justify-start'>
                    <img src={tick} alt="tick" className="w-10 h-10 object-cover mr-5"/>
                    <div>
                        <div className='font-custom-bold text-lg fond-bold text-primary text-center sm:text-start sm:pl-5'>Transparency</div>
                        <div className='text-sm text-primary text-center sm:text-start sm:pl-5'>You can visit property anytime with 24 hours notice to check how we are looking after your property.</div>
                    </div>
                </div>
                <div className='flex justify-center lg:justify-start'>
                    <img src={tick} alt="tick" className="w-10 h-10 object-cover mr-5"/>
                    <div>
                        <div className='font-custom-bold text-lg fond-bold text-primary text-center sm:text-start sm:pl-5'>No Surprises!</div>
                        <div className='text-sm text-primary text-center sm:text-start sm:pl-5'>No set up fees, monthly commissions or hidden charges.</div>
                    </div>
                </div>
                <div className='flex justify-center lg:justify-start'>
                    <img src={tick} alt="tick" className="w-10 h-10 object-cover mr-5"/>
                    <div>
                        <div className='font-custom-bold text-lg fond-bold text-primary text-center sm:text-start sm:pl-5'>End to end management</div>
                        <div className='text-sm text-primary text-center sm:text-start sm:pl-5'>We deal with all the tenant’s queries, questions and complaints.</div>
                    </div>
                </div>
               
                
            </div>
        </div>
    </>
  )
}

export default WhyUs