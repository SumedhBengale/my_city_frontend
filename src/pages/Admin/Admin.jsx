//A Simple Admin Panel

import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import config from '../../config/config'
import DesktopNavbarBlack from '../../components/desktopNavbarBlack'
import NavbarBlack from '../../components/navbar_black'
import SearchComponent from './pages/SearchComponent';

function Admin() {
  const [checkComplete, setCheckComplete] = React.useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    //Ask the backend whether the user is an admin or not, use the checkAdmin route
    //If the user is not an admin, navigate to the homepage
    //If the user is an admin, do nothing

    try{

      const checkAdmin = async () => {
        console.log(localStorage.getItem('token'))
        await axios.post(`${config.API_URL}/admin/checkAdmin`,{
          token: localStorage.getItem('token')
        },{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }).then((response) => {
          if(response.status === 200){
          setCheckComplete(true)
          }
        }).catch((err) => {
          console.log(err)
          if(err.response.status === 400){
            console.log('no')
            navigate('/admin/login')
          }
        })
      }
      checkAdmin()

    }
    catch(err){
      console.log(err)
    }

  }, [navigate])

  // Sidebar elements
  const sidebarElements = [
    { id: 1, label: 'Users' },
    { id: 2, label: 'Chats' },
    // Add more elements as needed
  ];

  // State to keep track of the selected sidebar element
  const [selectedElement, setSelectedElement] = React.useState(sidebarElements[0]);
  const [isMinimized, setIsMinimized] = React.useState(false);



  const handleSidebarItemClick = (element) => {
    setSelectedElement(element);
    console.log(element)
  };

  return (
    checkComplete ?
    <div className="flex relative flex-col h-screen">
      <div className="hidden md:block z-20 sticky w-full">
        {
          <DesktopNavbarBlack />
        }
        </div>

        <div className="md:hidden z-20 sticky w-full">
          {
            <NavbarBlack />
          }
        </div>
      {/* Sidebar */}
      <div className='flex flex-col sm:flex-row h-full w-full'>
        <div className="w-full sm:w-1/2 md:w-1/4 h-min sm:h-full bg-[#262150] transition duration-75 p-4">
          <div className='flex justify-between items-center'>
            <div className="text-lg font-bold sm:mb-4 text-center text-white">Admin Panel</div>
            <div className='sm:hidden'>
              {
                isMinimized ?
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setIsMinimized(false)}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setIsMinimized(true)}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              }
            </div>            
          </div>
          <div className='sm:hidden'>
            {isMinimized === false && //Size of screen is less than md
              <ul>
                {sidebarElements.map((element) => (
                  <li
                    key={element.id}
                    className={`cursor-pointer mb-2 hover:bg-secondary border border-white p-4 rounded-md ${
                      selectedElement?.id === element.id ? 'text-gray-200 font-bold' : ' text-white'
                    }`}
                    onClick={() => handleSidebarItemClick(element)}
                  >
                    {element.label}
                  </li>
                ))}
            </ul>}
          </div>
          <div className='hidden sm:block'>
              <ul>
                {sidebarElements.map((element) => (
                  <li
                    key={element.id}
                    className={`cursor-pointer mb-2 hover:bg-secondary border border-white p-4 rounded-md ${
                      selectedElement?.id === element.id ? 'text-gray-200 font-bold' : 'text-white'
                    }`}
                    onClick={() => handleSidebarItemClick(element)}
                  >
                    {element.label}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Main content */}
        <div className="w-full p-4">
          {selectedElement.label === 'Users' ? <SearchComponent searchType={'user'} />
          : selectedElement.label === 'Chats' ? <SearchComponent searchType={'chat'} />
          :null}
        </div>
      </div>
    </div>
    : <div>Checking</div>
  )
}

export default Admin