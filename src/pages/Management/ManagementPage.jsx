import React from 'react'
import NavbarBlack from '../../components/navbar_black'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import HowWeDoIt from './HowWeDoIt'
import FadeInSection from '../../components/fadeIn/fadeInSection'
import managementBackground from '../../assets/images/management/management_background.png'
import ReviewShowcaseSection from '../HomePage/ReviewShowcaseSection'
import OurPartnersSection from '../AboutUs/OurPartnersSection'
import whyMyCity from '../../assets/images/management/why_my_city.jpg'
import agreements from '../../assets/images/management/agreements.jpg'
import earnEffortlessly from '../../assets/images/management/earn_effortlessly.jpeg'
import Footer from '../HomePage/Footer'
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


        <div className='h-full flex flex-col justify-center items-start z-0 bg-black/40 backdrop-filter backdrop-blur-sm'>
          <div className='max-w-2xl pl-20'>
            <div className='font-custom-bold text-4xl md:text-5xl text-white pt-40 pb-4 capitalize'>Unlock your properties true potential</div>
            <div className=' text-lg w-full font-custom text-white sm-3 lg:mb-10 capitalize'>Boost yield, maximise income and easily manage your property by partnering with MyCityResidences the London property experts.</div>
            <button className='bg-secondary text-white hover:scale-105 transition duration-75 cursor-pointer font-custom py-2 px-4 h-16 w-40 my-3 rounded-lg uppercase'>Get a Quote</button>
          </div>
        </div>
      </div>
          <FadeInSection>

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
              <div className='text-slate-800 opacity-50 text-md pb-3 pt-10'>Earn More From Your Properties</div>
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
                <button className='bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom py-2 px-4 h-12 w-40 my-3'>Find Out More</button>
            </div>
            <div className='flex justify-center w-full'>
              <img className=" h-[400px] lg:h-[700px] w-full sm:w-1/2 lg:w-full rounded-lg py-5 lg:pr-10 object-cover" src={agreements} alt='Placeholder'/>
            </div>
          </div>
        </FadeInSection>

        {/* <FadeInSection> */}
          <HowDoesItWork></HowDoesItWork>
        {/* </FadeInSection> */}

        <FadeInSection>
          <div className='bg-neutral-100 w-full grid grid-cols-1 md:grid-cols-2 place-items-center px-10 py-20'>
            <div className='w-full flex justify-center'>
              <img src={earnEffortlessly} alt='Img' className='w-2/3 h-96 object-fill'></img>
            </div>
            <div className='flex w-2/3'>
              <div className='flex flex-col justify-center items-center text-center'>
                <div className="text-primary font-custom-bold text-3xl capitalize pb-3">Earn Effortlessly</div>
                <div className=" w-full text-primary text-md font-normal leading-normal pb-5">Sustainability is at the heart of everything we do. We work closely with sustainable partners and brands, and use electric vans.</div>
                  <button className='bg-secondary rounded-lg text-white hover:scale-105 transition duration-75 cursor-pointer font-custom py-2 px-4 h-12 w-40 my-3'>Enquire</button>
              </div>
            </div>
          </div>
        </FadeInSection>

        <FadeInSection>
          <BlogContainer></BlogContainer>
        </FadeInSection>
        
        <Footer></Footer>
    </>
  )
}

export default ManagementPage