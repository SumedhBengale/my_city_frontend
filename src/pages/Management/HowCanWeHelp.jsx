import React, { useRef, useEffect } from 'react';
import tick from '../../assets/images/management/tick.svg';

function HowCanWeHelp() {
  const ref = useRef(null);
  const b1 = useRef(null);
  const b2 = useRef(null);
  const b3 = useRef(null);
  const b4 = useRef(null);

  // when the ref is in view wait for 10 seconds and then slide in the bullet refs b1, b2, and b3 one by one
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            b1.current.classList.remove('translate-x-full');
            b1.current.classList.remove('opacity-0');
            b1.current.classList.add('translate-x-0');
          }, 1000);
          setTimeout(() => {
            b2.current.classList.remove('translate-x-full');
            b2.current.classList.remove('opacity-0');
            b2.current.classList.add('translate-x-0');
          }, 1500);
          setTimeout(() => {
            b3.current.classList.remove('translate-x-full');
            b3.current.classList.remove('opacity-0');
            b3.current.classList.add('translate-x-0');
          }, 2000);
          setTimeout(() => {
            b4.current.classList.remove('translate-x-full');
            b4.current.classList.remove('opacity-0');
            b4.current.classList.add('translate-x-0');
          }, 2500);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [ref]);

  return (
    <>
      <div className='text-center font-custom-bold text-2xl mt-10'>How Can We Help?</div>
      <div className='mx-5 overflow-x-hidden' ref={ref}>
        {/* Updated the 'overflow-x-hidden' class above to hide any horizontal overflow */}
        <div className='flex flex-col md:flex-row justify-center items-center m-5 container mx-auto'>
          <div className='w-full h-min bg-gray-200 text-zinc-800 rounded-2xl'>
            <div className='text-md px-5 pb-8 pt-3 text-left'>
              We are constantly looking for new properties because of our high occupancy rate and rising demand. If you are a landlord wanting to rent or sell your property, you have come to the right place.
            </div>
            <div className='flex flex-col gap-4 pb-5'>
              <div className={`flex justify-start items-center opacity-0 translate-x-full transition-all duration-200 md:duration-400`} ref={b1}>
                <img src={tick} alt='tick' className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                <div className='text-md px-4 text-zinc-800 text-left'>We would like to rent or buy your property</div>
              </div>

              <div className='flex justify-start items-center opacity-0 translate-x-full transition-all duration-200 md:duration-400' ref={b2}>
                <img src={tick} alt='tick' className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                <div className='text-md px-4 text-zinc-800 text-left'>We strive to help landlords and clients by providing a greater return on investment while maintaining, renting, or purchasing their property.</div>
              </div>

              <div className='flex justify-start items-center opacity-0 translate-x-full transition-all duration-200 md:duration-400' ref={b3}>
                <img src={tick} alt='tick' className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                <div className='text-md px-4 text-zinc-800 text-left'>We make certain that all of our properties are kept in pristine condition from beginning to end of our arrangement.</div>
              </div>

              <div className='flex justify-start items-center opacity-0 translate-x-full transition-all duration-200 md:duration-400' ref={b4}>
                <img src={tick} alt='tick' className=' ml-5 w-5 h-5 object-cover rounded-xl mt-2 mb-2' />
                <div className='text-md px-4 text-left'>We constantly aim to go above and above to provide our landlords with outstanding customer service, regardless of the time of day.</div>
              </div>
              <div className='w-full flex justify-center'>
                <button className='bg-black text-white hover:scale-105 transition duration-75 cursor-pointer font-bold py-2 px-4 rounded-lg h-12 w-full max-w-md mx-10'>Schedule a Call</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HowCanWeHelp;
