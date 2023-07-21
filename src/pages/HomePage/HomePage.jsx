import {React, useState, useEffect} from 'react'
import Navbar from '../../components/navbar'
import NavbarBlack from '../../components/navbar_black'
import DesktopNavbar from '../../components/desktopNavbar'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import homeBackground from '../../assets/images/home/home_top_image.jpg'
import IntroductionSection from './IntroductionSection'
import PropertyCard from './PropertyCard'
import WhatWeOfferSection from './WhatWeOfferSection'
import KnowMoreSection from './KnowMoreSection'
import ReviewShowcaseSection from './ReviewShowcaseSection'
import FrequentQuestionsSection from './FrequentQuestionsSection'
import SearchCard from '../../components/searchCard'
import Footer from './Footer'
import logoWhite from '../../assets/images/white_logo.png'
import FadeInSection from '../../components/fadeIn/fadeInSection'
import Filter from '../../components/filter'

function Home() {
  const [blackNavbar, setBlackNavbar] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const screenHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      console.log(scrollPosition, screenHeight * 70 / 100)
      if (scrollPosition >= screenHeight * 70 / 100) {
        setBlackNavbar(true);
      } else {
        setBlackNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
     {filterVisible &&
      <div className='h-screen w-screen absolute'>
      <Filter apply={(data)=>{
        setFilterVisible(false)
        console.log('filter applied')
        console.log(data)
      }} close={()=>setFilterVisible(false)}></Filter>
      </div>}
      <div
        style={{
          backgroundImage: `url(${homeBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '80vh',
        }}
      > {/* Background Image */}
        <div className="hidden md:block z-20 fixed w-full">
        {
          blackNavbar ? <DesktopNavbarBlack /> : <DesktopNavbar />
        }
        </div>

        <div className="md:hidden z-20 fixed w-full">
          {
            blackNavbar ? <NavbarBlack /> : <Navbar />
          }
        </div>


        <div className='h-full flex flex-col justify-center items-center mx-5 z-0'>
          <div className='lg:hidden'>
            <div className='font-custom font-bold text-2xl sm:text-4xl text-white text-center pt-10 pb-4'>My City Residence</div>
            <div className=' text-lg w-full text-center font-semibold text-white capitalize sm-3 sm:mb-10'>Discover your next home away from home</div>
          </div>

          <div className='hidden lg:block justify-center items-center'>
            <img src={logoWhite} alt='My City Logo' className='md:w-48 lg:w-72 self-start mb-20'></img>
          </div>
          <SearchCard setFilterVisible={(value)=>setFilterVisible(value)}></SearchCard>
        </div>
      </div>
      <div className='container mx-auto'>
      <FadeInSection>
        <IntroductionSection></IntroductionSection>
      </FadeInSection>
      </div> {/* Seperated into different file because it's static content */}
      <FadeInSection>

      <div className='p-4 container mx-auto'>
      <div className=" text-center text-black font-custom font-bold text-4xl capitalize">Our Properties</div>
      <div className=" text-center text-zinc-800 opacity-40 text-md pt-4 capitalize">Hand-picked selection of quality places</div>
      
      {/* Fill these with fetched data */}
      <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 gap-5 lg:px-10 mt-10'>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
      </div>

      <div className='flex justify-center mt-10'>
        <div className="w-[178px] h-14 bg-black text-white hover:scale-105 transition duration-75 cursor-pointer rounded-xl backdrop-blur-md" >
          <div className=' font-bold text-2xl h-full flex justify-center items-center'>View All</div>
        </div>
      </div>

      </div>
      </FadeInSection>

      {/* Seperated into different file because it's static content */}
      <FadeInSection>
      <WhatWeOfferSection></WhatWeOfferSection>
      </FadeInSection>

      {/* Seperated into different file because it's static content */}
      <FadeInSection>
      <KnowMoreSection></KnowMoreSection>
      </FadeInSection>

      {/* Seperated into different file because it's static content(for now) */}
      <FadeInSection>
      <div className='mt-10'>
        <ReviewShowcaseSection></ReviewShowcaseSection>
      </div>
      </FadeInSection>

      {/* Seperated into different file because it's static content */}
      <FadeInSection>
      <div className='container mx-auto'>
        <FrequentQuestionsSection></FrequentQuestionsSection>
      </div>
      </FadeInSection>
    
      <FadeInSection>
      <Footer></Footer>
      </FadeInSection>
    </>
  )
}

export default Home