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
import React from 'react'
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
          <Route exact path="/" element={
              //check whether the user is logged in or not
              getToken ? <HomePage></HomePage> : <Navigate to="/login"></Navigate>
            } />
          <Route exact path="/admin" element={
              //check whether the user is logged in or not
              getToken ? <Admin></Admin> : <Navigate to="/admin/login"></Navigate>
            } />
          <Route exact path="/admin/login" element={<Login></Login>} />
          <Route exact path="/admin/user/:id" element={<UserResourceEditor></UserResourceEditor>} />
          <Route exact path="/admin/chat/:id" element={<ChatResourceEditor></ChatResourceEditor>} />
          <Route exact path="/admin/upcomingTrips/:id" element={<UpcomingTripsPage></UpcomingTripsPage>} />
          <Route exact path="/admin/upcomingTrip/:id" element={<UpcomingTripEditor></UpcomingTripEditor>} />
          <Route exact path="/admin/pastTrips/:id" element={<PastTripsPage></PastTripsPage>} />
          <Route exact path="/admin/pastTrip/:id" element={<PastTripEditor></PastTripEditor>} />
          <Route exact path="/admin/wishlist/:id" element={<WishlistEditor></WishlistEditor>} />
          <Route exact path="/login" element={<LoginPage></LoginPage>} />
          <Route exact path= "/signup" element={<SignUpPage></SignUpPage>} />
          <Route exact path="/properties" element={<PropertiesPage></PropertiesPage>} />
          <Route exact path="/management" element={<ManagementPage></ManagementPage>} />
          <Route exact path="/about" element={<AboutUsPage></AboutUsPage>} />
          <Route exact path="/contact" element={<ContactUsPage></ContactUsPage>} />
          <Route exact path="/property/:id" element={<Property></Property>} />
          <Route exact path='/wishlist' element={<Wishlist></Wishlist>} />
          <Route exact path='/book' element={<Book></Book>} />
          <Route exact path="/trips" element={<Trips></Trips>} />
          <Route exact path="/notifications" element={<Notifications></Notifications>} />
          <Route exact path="/help" element={<Help></Help>} />
          <Route exact path="/messages" element={<Messages></Messages>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;




