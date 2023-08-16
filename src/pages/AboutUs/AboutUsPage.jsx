import React, { useEffect } from 'react'
import NavbarBlack from '../../components/navbar_black'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import OurStorySection from './OurStorySection'
import OurValuesSection from './OurValuesSection'
import OurPartnersSection from './OurPartnersSection'
import FadeInSection from '../../components/fadeIn/fadeInSection'
import Footer from '../HomePage/Footer'
import aboutBackground from '../../assets/images/about/about_background.png'
import OurTeamSection from './OurTeamSection'


function AboutUsPage() {
  return (
    <>
        <div
        style={{
          backgroundImage: `url(${aboutBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '70vh',
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


        <div className='h-full flex flex-col justify-center items-center z-0 bg-black/40'>
            <div className='font-custom-bold text-4xl md:text-5xl text-white text-center pt-40 pb-4 capitalize'>Who are we?</div>
            <div className=' text-2xl md:text-4xl w-full text-center font-custom text-white sm-3 lg:mb-10 capitalize'>Discover your next home away from home</div>
        </div>
      </div>

        <FadeInSection>
        <OurStorySection></OurStorySection>
        </FadeInSection>
        <FadeInSection>
        <OurTeamSection></OurTeamSection>
        </FadeInSection>
        <FadeInSection>
        <OurValuesSection></OurValuesSection>
        </FadeInSection>
        <FadeInSection>
        <OurPartnersSection></OurPartnersSection>
        </FadeInSection>
        <Footer></Footer>



    </>
  )
}

export default AboutUsPage