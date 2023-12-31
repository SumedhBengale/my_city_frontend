import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Admin from './pages/Admin/Admin';
import Login from './pages/Admin/Login';
import HomePage from './pages/HomePage/HomePage';
import LuxeHomePage from './pages/Luxe/HomePage/HomePage'
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
import axios from './components/axios';
import config from './config/config';
import UserResourceEditor from './pages/Admin/pages/UserResourceEditor';
import ChatResourceEditor from './pages/Admin/pages/ChatResourceEditor';
import TripsPage from './pages/Admin/pages/TripsPage';
import TripEditor from './pages/Admin/pages/TripEditor';
import WishlistEditor from './pages/Admin/pages/WishlistEditor';
import BlogPost from './pages/Management/BlogPost';
import ReviewViewer from './pages/Admin/pages/ReviewViewer';
import EmailVerification from './pages/Authentication/EmailVerification';
import Payment from './pages/Payment/Payment';
import Success from './pages/Payment/Success';
import ResetPassword from './pages/Authentication/ResetPassword';
import AccountPage from './pages/Account/AccountPage';
import PrivacyPolicy from './pages/Misc/PrivacyPolicy';
import TermsOfUse from './pages/Misc/TermsOfUse';
import HouseRules from './pages/Misc/HouseRules';
import GroundRules from './pages/Misc/GroundRules';
import RefundPolicy from './pages/Misc/RefundPolicy';
import ChargePaymentMethod from './pages/Misc/ChargePaymentMethod';


const App = () => {
  const getToken = () => { localStorage.getItem('token') };

  return (
    <Router>
      <ScrollToTop>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/admin" element={
            //check whether the user is logged in or not
            getToken ? <Admin></Admin> : <Navigate to="/admin/login"></Navigate>
          } />
          <Route exact path="/admin/login" element={getToken ? <Login></Login> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/user/:id" element={getToken ? <UserResourceEditor></UserResourceEditor> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/chat/:id" element={getToken ? <ChatResourceEditor></ChatResourceEditor> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/trips/:id" element={getToken ? <TripsPage></TripsPage> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/trip/:id" element={getToken ? <TripEditor></TripEditor> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/wishlist/:id" element={getToken ? <WishlistEditor></WishlistEditor> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/admin/review/:id" element={getToken ? <ReviewViewer /> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/login" element={getToken ? <LoginPage></LoginPage> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/signup" element={<SignUpPage></SignUpPage>} />
          <Route exact path="/verify-email/:id" element={<EmailVerification></EmailVerification>} />
          <Route exact path="/reset-password/:id" element={<ResetPassword></ResetPassword>} />
          <Route exact path="/account" element={<AccountPage></AccountPage>} />
          <Route exact path="/properties" element={<PropertiesPage />} />
          <Route exact path="/payment" element={<Payment></Payment>} />
          <Route exact path="/payment/success" element={<Success></Success>} />
          <Route exact path="/luxe" element={<LuxeHomePage></LuxeHomePage>} />
          <Route exact path="/homeowners" element={<ManagementPage></ManagementPage>} />
          <Route exact path="/homeowners/blog/:id" element={<BlogPost></BlogPost>} />
          <Route exact path="/about" element={<AboutUsPage></AboutUsPage>} />
          <Route exact path="/contact" element={<ContactUsPage></ContactUsPage>} />
          <Route exact path="/property/:id" element={<Property></Property>} />
          <Route exact path='/wishlist' element={getToken ? <Wishlist></Wishlist> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path='/book' element={<Book></Book>} />
          <Route exact path="/trips" element={getToken ? <Trips></Trips> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/notifications" element={getToken ? <Notifications></Notifications> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/help" element={getToken ? <Help></Help> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/messages" element={getToken ? <Messages></Messages> : <Navigate to="/admin/login"></Navigate>} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy></PrivacyPolicy>} />
          <Route exact path="/terms-of-use" element={<TermsOfUse></TermsOfUse>} />
          <Route exact path="/house-rules" element={<HouseRules></HouseRules>} />
          <Route exact path="/ground-rules" element={<GroundRules></GroundRules>} />
          <Route exact path="/refund-policy" element={<RefundPolicy></RefundPolicy>} />
          <Route exact path="/payment-policy" element={<ChargePaymentMethod></ChargePaymentMethod>} />

          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
};

export default App;




