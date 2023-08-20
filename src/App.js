import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import Login from './pages/Admin/Login';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Authentication/LoginPage';
import SignUpPage from './pages/Authentication/SignUpPage';
import PropertiesPage from './pages/Properties/PropertiesPage';
import ManagementPage from './pages/Management/ManagementPage';
import AboutUsPage from './pages/AboutUs/AboutUsPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';
import Property from './pages/Property/Property';
import Wishlist from './pages/Wishlist/Wishlist';
import Trips from './pages/Trips/Trips';
import Book from './pages/Book/Book';
import React, { useState } from 'react'
import Notifications from './pages/Notifications/Notifications';
import Help from './pages/Help/Help';
import Messages from './pages/Messages/Messages';
import ScrollToTop from './components/ScrollToTop';
import axios from 'axios';
import config from './config/config';
import UserResourceEditor from './pages/Admin/pages/UserResourceEditor';
import ChatResourceEditor from './pages/Admin/pages/ChatResourceEditor';
import UpcomingTripsPage from './pages/Admin/pages/UpcomingTripsPage';
import UpcomingTripEditor from './pages/Admin/pages/UpcomingTripEditor';
import PastTripsPage from './pages/Admin/pages/PastTripsPage';
import PastTripEditor from './pages/Admin/pages/PastTripEditor';
import WishlistEditor from './pages/Admin/pages/WishlistEditor';
import BlogPost from './pages/Management/BlogPost';
import ReviewViewer from './pages/Admin/pages/ReviewViewer';


const App = () => {
  const getToken = () => { localStorage.getItem('token') };

  const checkAdmin = async () => {
    if(localStorage.getItem('token') === null){
      return false
    }
    try{
    await axios.post(`${config.API_URL}/admin/checkAdmin`,{
      id: localStorage.getItem('token')
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((response) => {
      if(response.status === 200){
        console.log("true")
        return true
      }
    });
  }catch(err){
    console.log(err)
    return false

  }
  }

  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<HomePage></HomePage>} />
          <Route exact path="/admin" element={
              //check whether the user is logged in or not
              getToken ? <Admin></Admin> : <Navigate to="/admin/login"></Navigate>
            } />
          <Route exact path="/admin/login" element={getToken ? <Login></Login>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/user/:id" element={getToken ? <UserResourceEditor></UserResourceEditor> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/chat/:id" element={getToken ? <ChatResourceEditor></ChatResourceEditor>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/upcomingTrips/:id" element={getToken ? <UpcomingTripsPage></UpcomingTripsPage>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/upcomingTrip/:id" element={getToken ? <UpcomingTripEditor></UpcomingTripEditor>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/pastTrips/:id" element={getToken ? <PastTripsPage></PastTripsPage>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/pastTrip/:id" element={getToken ? <PastTripEditor></PastTripEditor>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/wishlist/:id" element={getToken ? <WishlistEditor></WishlistEditor>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/review/:id" element={getToken ? <ReviewViewer/>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/login" element={getToken ? <LoginPage></LoginPage>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path= "/signup" element={getToken ? <SignUpPage></SignUpPage>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/properties" element={getToken ? <PropertiesPage></PropertiesPage>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/management" element={getToken ? <ManagementPage></ManagementPage>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/management/blog/:id" element={getToken ? <BlogPost></BlogPost>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/about" element={getToken ? <AboutUsPage></AboutUsPage>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/contact" element={getToken ? <ContactUsPage></ContactUsPage>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/property/:id" element={getToken ? <Property></Property>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path='/wishlist' element={getToken ? <Wishlist></Wishlist>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path='/book' element={getToken ? <Book></Book>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/trips" element={getToken ? <Trips></Trips>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/notifications" element={getToken ? <Notifications></Notifications>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/help" element={getToken ? <Help></Help>: <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/messages" element={getToken ? <Messages></Messages>: <Navigate to="/admin/login"></Navigate>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;




