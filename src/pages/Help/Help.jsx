import React from 'react'
import LeftArrow from '../../assets/images/property/left.svg'
import FrequentQuestionsSection from './FrequentQuestionsSection'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'

function Help() {
  return (

    <>
        <div className="hidden md:block z-20 fixed top-0 w-full">
        {
           <DesktopNavbarBlack />
        }
        </div>
    <div className='flex flex-col h-screen justify-between md:mt-16'>
        <div>
            <div className='flex w-full h-12 bg-white shadow-lg justify-between'>
                <div className='w-10 h-full' onClick={()=>window.history.back()}>
                    <img src={LeftArrow} alt='left arrow' className='w-6 h-6 m-3'/>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <div className='text-lg text-center font-bold '>Help</div>
                </div>
            </div>
            <div className='text-md font-bold p-5'>FAQ's</div>
            <div className='container mx-auto'>
                <FrequentQuestionsSection></FrequentQuestionsSection>
            </div>
        </div>

        {/*Show a Button at the bottom of the screen */}
        <div className='flex w-full justify-center p-2'>
            <button className='w-full max-w-lg h-12 text-white bg-black rounded-lg'>Chat with Us</button>
        </div>
    </div>
    </>
  )
}

export default Help