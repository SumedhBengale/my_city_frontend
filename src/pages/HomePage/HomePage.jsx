import {React, useState, useEffect} from 'react'
import Navbar from '../../components/navbar'
import NavbarBlack from '../../components/navbar_black'
import DesktopNavbar from '../../components/desktopNavbar'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import homeBackground from '../../assets/images/home/home_top_image.png'
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
import { getResidences } from './api'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const  navigate = useNavigate();
  const [blackNavbar, setBlackNavbar] = useState(false);
  const [residences, setResidences] = useState(null);

  
  const search = (params) => {
    console.log(params)
    //if params.startDate is greater than params.endDate, show toast
    if(params.startDate > params.endDate){
      toast.error("Cannot Check-in after Check-out")
      return
    }
    navigate('/properties', {state: {filterData:params}})
  }

  useEffect(() => {
    getResidences().then((res) => {
      if(res.status === 200){
        console.log(res.residences)
        setResidences(res.residences)
      }else if(res.status === 401){
        console.log('unauthorized')
        localStorage.removeItem('token')
        navigate('/login')
      }else{
        console.log("error")
      }
    }).catch((err) => {
      console.log(err)
    });
    const handleScroll = () => {
      const screenHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      // console.log(scrollPosition, screenHeight * 70 / 100)
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
  }, [navigate]);
  return (
    <>

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


        <div className='h-full flex flex-col justify-center items-center z-0 bg-black/40'>
          <div className='lg:hidden'>
            <div className='font-custom font-bold text-2xl lg:text-4xl text-white text-center pt-10 pb-4'>My City Residence</div>
            <div className=' text-lg w-full text-center font-semibold text-white capitalize sm-3 lg:mb-10'>Discover your next home away from home</div>
          </div>

          <div className='hidden lg:block justify-center items-center'>
            <img src={logoWhite} alt='My City Logo' className='md:w-48 lg:w-72 self-start mb-10'></img>
          </div>
          <SearchCard search={(params)=>search(params)}></SearchCard>
        </div>
      </div>
      <div className='md:container md:mx-auto'>
      <FadeInSection>
        <IntroductionSection></IntroductionSection>
      </FadeInSection>
      </div> 
      {/* Seperated into different file because it's static content */}
      <FadeInSection>

      <div className='p-4 container mx-auto'>
      <div className=" text-center text-black font-custom font-bold text-4xl capitalize">Our Properties</div>
      <div className=" text-center text-zinc-800 opacity-40 text-md pt-4 capitalize">Hand-picked selection of quality places</div>
      
      {residences === null ? (
          //Circular Progress
          <div className='flex justify-center items-center mt-10'>
            <div className="animate-spin rounded-full h-5 w-5 border-dashed border-2 border-gray-900"></div>
          </div>
        ) : (
          <div className='grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:px-10 mt-10'>
          {residences.map((residence) => (
            <PropertyCard residence={residence} key={residence._id}></PropertyCard>
          ))}
          </div>
        )}

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
    
      {/* <FadeInSection> */}
      <Footer></Footer>
      {/* </FadeInSection> */}
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    </>
  )
}

export default Home