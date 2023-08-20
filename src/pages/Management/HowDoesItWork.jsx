import React from 'react'
import howDoesItWork_1 from '../../assets/images/management/howDoesItWork_1.jpeg'
import howDoesItWork_2 from '../../assets/images/management/howDoesItWork_2.jpeg'
import howDoesItWork_3 from '../../assets/images/management/howDoesItWork_3.jpeg'

function HowDoesItWork() {
  return (
    <>
        <div className='flex-col container mx-auto lg:mb-96 hidden lg:block'>
            <div className='flex justify-center items-center p-5 lg:pb-10 lg:pl-10 gap-2 container mx-auto w-full'>
                <div className='text-center lg:text-left pr-5 max-w-4xl'>
                <div className='text-primary text-center text-md pb-3 pt-10'>Hassle Free</div>
                <div className="text-primary text-center font-custom-bold text-3xl capitalize pb-3">How does it work?</div>
                <div className=" w-full text-primary text-center text-md font-normal leading-normal pb-5">City Relay increases demand by creating unparalleled rental experiences — managing the entire relationship from start to finish.</div>
                </div>
            </div>
                <div className='flex flex-col lg:flex-row justify-center items-center gap-32 lg:gap-0'>
                    <div className="w-96 h-96 relative z-10">
                        <div className="w-80 h-96 left-12 top-0 absolute rounded-tl-full rounded-tr-full border-8 border-secondary"></div>
                        <img className="w-full h-96 scale-x-105 left-16 top-[13px] absolute rounded-tl-full rounded-tr-full" alt='placeholder' src={howDoesItWork_1} />
                        <div className=" absolute left-16 -bottom-10 text-indigo-950 text-base font-custom-bold">Corporate Leasing Agreement</div>
                        <div className="w-80 left-16  absolute -bottom-20 text-indigo-950 text-xs font-normal leading-relaxed">With A Corporate Leasing Arrangement, We Become Your Tenant.</div>
                        <div className="left-0 top-[334px] absolute text-right text-stone-500 text-8xl font-medium -translate-x-2">1</div>
                    </div>
                    <div className='translate-y-40 relative hidden lg:block'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='' width="419" height="159" viewBox="0 0 419 159" fill="none">
                            <path d="M2.5 25.0074C35.6667 2.17411 122.3 -21.3926 203.5 67.0074C284.7 155.407 380 159.841 417.5 151.007" stroke="#A88F5E" stroke-width="8" stroke-dasharray="16 16"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className='translate-y-20 translate-x-5' width="372" height="239" viewBox="0 0 372 239" fill="none">
                            <path d="M4.05337 237.683C7.99749 197.61 45.8677 116.206 165.795 111.174C285.723 106.142 350.58 36.1753 368.018 1.82109" stroke="#A88F5E" stroke-width="8" stroke-dasharray="16 16"/>
                        </svg>

                    </div>

                    <div className="w-96 h-96 relative z-10 lg:-translate-x-20 lg:translate-y-32">
                        <div className="w-80 h-96 left-12 top-0 absolute rounded-tl-full rounded-tr-full border-8 border-secondary"></div>
                        <img className="w-full h-96 scale-x-105 left-16 top-[13px] absolute rounded-tl-full rounded-tr-full" alt='placeholder' src={howDoesItWork_2} />
                        <div className=" absolute left-16 -bottom-16 text-indigo-950 text-base font-custom-bold">We operate the property as a short-term rental</div>
                        <div className="w-80 left-16  absolute -bottom-40 text-indigo-950 text-xs font-normal leading-relaxed">The process of us renting out your property on a short-term basis and becoming your tenant is nearly identical; the only difference is that the return may vary from month to month based on the occupancy of these properties as well as the market.</div>
                        <div className="left-0 top-[334px] absolute text-right text-stone-500 text-8xl font-medium -translate-x-2">2</div>
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-center items-center lg:translate-y-28 lg:translate-x-72 mt-48 lg:mt-0'>
                    <div className="w-96 h-96 relative z-10 lg:-translate-x-36 xl:-translate-x-20 lg:translate-y-28">
                        <div className="w-80 h-96 left-12 top-0 absolute rounded-tl-full rounded-tr-full border-8 border-secondary"></div>
                        <img className="w-full h-96 scale-x-105 left-16 top-[13px] absolute rounded-tl-full rounded-tr-full" alt='placeholder' src={howDoesItWork_3} />
                        <div className=" absolute left-16 -bottom-16 text-indigo-950 text-base font-custom-bold">We purchase the property</div>
                        <div className="w-80 left-16  absolute -bottom-40 text-indigo-950 text-xs font-normal leading-relaxed">Based on your requirements this would be better discussed over the phone where we can make arrangements accordingly. You may also call us at +447442211353 or email us at info@mycityresidences.com</div>
                        <div className="left-0 top-[334px] absolute text-right text-stone-500 text-8xl font-medium -translate-x-2">3</div>
                    </div>
                    <div className='translate-y-40 relative invisible hidden lg:block'>
                        <svg xmlns="http://www.w3.org/2000/svg" className='' width="419" height="159" viewBox="0 0 419 159" fill="none">
                            <path d="M2.5 25.0074C35.6667 2.17411 122.3 -21.3926 203.5 67.0074C284.7 155.407 380 159.841 417.5 151.007" stroke="#A88F5E" stroke-width="8" stroke-dasharray="16 16"/>
                        </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" className='translate-y-20 translate-x-5' width="372" height="239" viewBox="0 0 372 239" fill="none">
                            <path d="M4.05337 237.683C7.99749 197.61 45.8677 116.206 165.795 111.174C285.723 106.142 350.58 36.1753 368.018 1.82109" stroke="#A88F5E" stroke-width="8" stroke-dasharray="16 16"/>
                        </svg>

                    </div>

                    <div className="w-96 h-96 relative z-10 -translate-x-20 translate-y-32 invisible">
                        <div className="w-80 h-96 left-12 top-0 absolute rounded-tl-full rounded-tr-full border-8 border-secondary"></div>
                        <img className="w-full h-96 scale-x-105 left-16 top-[13px] absolute rounded-tl-full rounded-tr-full" alt='placeholder' src={howDoesItWork_3} />
                        <div className=" absolute left-16 -bottom-16 text-indigo-950 text-base font-custom-bold">We purchase the property</div>
                        <div className="w-80 left-16  absolute -bottom-40 text-indigo-950 text-xs font-normal leading-relaxed">Based on your requirements this would be better discussed over the phone where we can make arrangements accordingly. You may also call us at +447442211353 or email us at info@mycityresidences.com</div>
                        <div className="left-0 top-[334px] absolute text-right text-stone-500 text-8xl font-medium -translate-x-2">3</div>
                    </div>
                </div>
        </div>
        <div className='flex justify-center items-center mx-5 lg:hidden'>
            <div className='flex flex-col gap-20'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <img className="w-full h-56 object-fill rounded-lg" alt='placeholder' src={howDoesItWork_1} />
                    <div className=" text-primary text-xl font-custom-bold mt-5">Corporate Leasing Agreement</div>
                    <div className=" text-primary text-md text-center">With A Corporate Leasing Arrangement, We Become Your Tenant.</div>
                </div>

                <div className='w-full flex flex-col justify-center items-center'>
                    <img className="w-full h-56 object-fill rounded-lg" alt='placeholder' src={howDoesItWork_2} />
                    <div className=" text-primary text-xl font-custom-bold mt-5">We operate the property as a short-term rental</div>
                    <div className=" text-primary text-md text-center">The process of us renting out your property on a short-term basis and becoming your tenant is nearly identical; the only difference is that the return may vary from month to month based on the occupancy of these properties as well as the market.</div>
                </div>

                <div className='w-full flex flex-col justify-center items-center'>
                    <img className="w-full h-56 object-fill rounded-lg" alt='placeholder' src={howDoesItWork_3} />
                    <div className=" text-primary text-xl font-custom-bold mt-5">We Purchase the Property</div>
                    <div className=" text-primary text-md text-center">Based on your requirements this would be better discussed over the phone where we can make arrangements accordingly. You may also call us at +447442211353 or email us at info@mycityresidences.com.</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HowDoesItWork