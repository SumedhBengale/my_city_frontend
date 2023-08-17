import React from 'react'
import NavbarBlack from '../../components/navbar_black'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import Image4 from '../../assets/images/management/image4.png'
import Image5 from '../../assets/images/management/image5.png'
import Image6 from '../../assets/images/management/image6.png'
import Image7 from '../../assets/images/management/image7.png'
import HowWeDoIt from './HowWeDoIt'
import WhyUs from './WhyUs'
import FrequentQuestionsSection from './FrequentQuestionsSection'
import Footer from '../../pages/HomePage/Footer'
import FadeInSection from '../../components/fadeIn/fadeInSection'
import managementBackground from '../../assets/images/management/management_background.png'
import ReviewShowcaseSection from '../HomePage/ReviewShowcaseSection'
import OurPartnersSection from '../AboutUs/OurPartnersSection'
import whyMyCity from '../../assets/images/management/why_my_city.jpg'
import agreements from '../../assets/images/management/agreements.jpg'
import calculatorImage from '../../assets/images/management/calculator_image.jpg'
import HowDoesItWork from './HowDoesItWork'
import BlogContainer from './BlogContainer'

function ManagementPage() {
  return (
    <>
      <div
        style={{
          //Blurry Background Image
          backgroundImage: `url(${managementBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '80vh',
        }}
      > {/* Background Image */}
        <div className="hidden md:block z-20 fixed w-full">
        {
          <DesktopNavbarBlack />
        }
        </div>

        <div className="md:hidden z-20 fixed w-full">
          {
            <NavbarBlack />
          }
        </div>


        <div className='h-full flex flex-col justify-center items-start z-0 bg-black/40 backdrop-filter backdrop-blur-sm'>
          <div className='max-w-2xl'>
            <div className='font-custom-bold text-4xl md:text-5xl text-white pt-40 pb-4 capitalize'>Unlock your properties true potential</div>
            <div className=' text-lg w-full font-custom text-white sm-3 lg:mb-10 capitalize'>Boost yield, maximise income and easily manage your property by partnering with MyCityResidences the London property experts.</div>
          </div>
        </div>
      </div>
          <FadeInSection>

      {/* <div className="Rectangle w-full bg-gray-200 px-10 pt-10 mt-20">
          <div className='container mx-auto'>
            <div className='text-zinc-700 font-custom-bold text-2xl text-center'>About Us</div>

            <div className='text-black text-md pt-5 text-justify'>Our team has over three decades of experience in the vacation home sector, and our unrivaled knowledge of the city, as well as our attention on customer satisfaction, ensure that your stay in London is easy and unforgettable. We provide quality serviced apartments for both leisure and business. We assure that the property is kept in hotel-standard condition during our agreement, reducing your worries.</div>
            <div className='justify-center flex'>
                <img src={mcr} alt="mcr" className='w-full h-14 object-contain mt-10 mb-10' />
            </div>
          </div>
        </div> */}

        <FadeInSection>
          <OurPartnersSection></OurPartnersSection>
          </FadeInSection>
        </FadeInSection>
        <FadeInSection>
          <div className='grid grid-cols-1 lg:grid-cols-2 justify-center items-center p-5 lg:p-20 lg:pl-10 gap-2 container mx-auto'>
            <div className='flex justify-center w-full'>
              <img className=" h-[400px] lg:h-[700px] w-full sm:w-1/2 lg:w-full rounded-lg py-5 lg:pr-10" src={whyMyCity} alt='Placeholder'/>
            </div>
            <div className='text-center lg:text-left pr-5'>
              <div className='text-primary text-md pb-3 pt-10'>Earn More From Your Properties</div>
              <div className="text-primary font-custom-bold text-3xl capitalize pb-3">Why My City Residences?</div>
              <div className=" w-full text-primary text-md font-normal leading-normal pb-5">Our team has over three decades of experience in the vacation home sector, and our unrivaled knowledge of the city, as well as our attention on customer satisfaction, ensure that your stay in London is easy and unforgettable. We provide quality serviced apartments for both leisure and business. We assure that the property is kept in hotel-standard condition during our agreement, reducing your worries.</div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <ReviewShowcaseSection></ReviewShowcaseSection>
        </FadeInSection>

        <FadeInSection>
          <HowWeDoIt></HowWeDoIt>
        </FadeInSection>

        <FadeInSection>
          <div className='grid grid-cols-1 lg:grid-cols-2 justify-center items-center p-5 lg:p-10 lg:pl-10 gap-2 container mx-auto'>
            <div className='text-center lg:text-left pr-5'>
              <div className='text-primary text-md pb-3 pt-10'>Agreements</div>
              <div className="text-primary font-custom-bold text-3xl capitalize pb-3">Lease Agreements</div>
              <div className=" w-full text-primary text-md font-normal leading-normal pb-5">With our deep understanding of the local market, thorough tenant vetting process, and adaptable letting approach, we possess the perfect expertise to tailor a lease agreement that aligns with your portfolio's needs. Depending on the size, location, and design standards of your properties, we can offer either a revenue share model or a guaranteed rent model. This grants you the assurance of consistent monthly income, eliminating concerns about void periods or delayed tenancy payments.</div>
              <button className='bg-primary text-white hover:scale-105 transition duration-75 cursor-pointer font-custom py-2 px-4 h-12 w-40 my-3'>Find Out More</button>
            </div>
            <div className='flex justify-center w-full'>
              <img className=" h-[400px] lg:h-[700px] w-full sm:w-1/2 lg:w-full rounded-lg py-5 lg:pr-10" src={agreements} alt='Placeholder'/>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className='flex justify-center items-center p-5 lg:pb-10 lg:pl-10 gap-2 container mx-auto w-full sm:w-1/2'>
            <div className='text-center lg:text-left pr-5'>
              <div className='text-primary text-md pb-3 pt-10'>Hassle Free</div>
              <div className="text-primary font-custom-bold text-3xl capitalize pb-3">End-to-end London property management</div>
              <div className=" w-full text-primary text-md font-normal leading-normal pb-5">We make certain that all of our properties are kept in pristine condition from beginning to end of our arrangement. We constantly aim to go above and above to provide our landlords with outstanding customer service, regardless of the time of day.</div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <WhyUs></WhyUs>
        </FadeInSection>

        <FadeInSection>
          <div className='flex justify-center items-center p-5 lg:p-20 lg:pl-10 gap-2 container mx-auto w-full sm:w-1/2'>
            <div className='text-center lg:text-left pr-5'>
              <div className='text-primary text-md text-center pb-3 pt-10'>Set and Forget Service</div>
              <div className="text-primary font-custom-bold text-center text-3xl capitalize pb-3">We Know The Struggle</div>
              <div className=" w-full text-primary text-center text-md font-normal leading-normal">When you decided to rent your property, we bet you never bargained for all the hassle that came with it.</div>
              <div className=" w-full text-primary text-center text-md font-normal leading-normal pb-5">Our mission is to provide landlords with a ‘set and forget’ service. Set the property up and leave it to us to take care of EVERYTHING - all you have to do is check your bank each month.</div>
              <div className='flex justify-center'>
                <button className='bg-primary text-white hover:scale-105 transition duration-75 cursor-pointer font-custom py-2 px-4 h-16 w-48 my-3'>Get Free Rental Estimate</button>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-20 container mx-auto'>
            <div className='flex flex-col gap-5 col-span-1 order-2'>
                <div className='flex justify-center lg:justify-end gap-5'>
                    <img src={Image4} alt="image4" className='w-16 h-16 object-cover mt-5'/>
                    <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-5 h-max flex flex-col gap-3">
                      <div className=" w-full text-center text-primary font-custom-bold text-lg md:text-xl px-2 pb-1">We Handle all the Tenants</div>
                      <div className=" w-full text-center text-primary text-[12px] sm:text-lg px-2 pb-2 ">No more worrying about another late-night call from your renter. Our customer support representatives are in charge of all setup, daily operations, and guest communications.</div>
                    </div>
                </div>

                <div className='flex justify-center lg:justify-end gap-5'>
                    <img src={Image4} alt="image4" className='w-16 h-16 object-cover mt-5'/>
                    <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-5 h-max flex flex-col gap-3">
                      <div className=" w-full text-center text-primary font-custom-bold text-lg md:text-xl px-2 pb-1">We Handle all the Tenants</div>
                      <div className=" w-full text-center text-primary text-[12px] sm:text-lg px-2 pb-2 ">No more worrying about another late-night call from your renter. Our customer support representatives are in charge of all setup, daily operations, and guest communications.</div>
                    </div>
                </div>

                <div className='flex justify-center lg:justify-end gap-5'>
                    <img src={Image4} alt="image4" className='w-16 h-16 object-cover mt-5'/>
                    <div className=" w-4/5 md:w-1/2 lg:w-2/3 md:py-5 h-max flex flex-col gap-3">
                      <div className=" w-full text-center text-primary font-custom-bold text-lg md:text-xl px-2 pb-1">We Handle all the Tenants</div>
                      <div className=" w-full text-center text-primary text-[12px] sm:text-lg px-2 pb-2 ">No more worrying about another late-night call from your renter. Our customer support representatives are in charge of all setup, daily operations, and guest communications.</div>
                    </div>
                </div>

            </div>
            <div className='flex justify-center w-full col-span-1 order-1 lg:order-2'>
              <img className=" h-[400px] lg:h-[700px] w-full sm:w-1/2 lg:w-full rounded-lg py-5 lg:pr-10" src={calculatorImage} alt='Placeholder'/>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <HowDoesItWork></HowDoesItWork>
        </FadeInSection>

        <FadeInSection>
          <BlogContainer></BlogContainer>
        </FadeInSection>


        {/* <FadeInSection>
        <FrequentQuestionsSection></FrequentQuestionsSection>
        </FadeInSection> */}
        {/* <FadeInSection> */}
        <Footer></Footer>
        {/* </FadeInSection> */}

    </>
  )
}

export default ManagementPage