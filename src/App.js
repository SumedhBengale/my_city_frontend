import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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


const App = () => {
  const getToken = () => { localStorage.getItem('token') };
  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={
            //check whether the user is logged in or not
            getToken ? <HomePage></HomePage> : <Navigate to="/login"></Navigate>
          } />
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
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;




