import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/Authentication/LoginPage';
import SignUpPage from './pages/Authentication/SignUpPage';
import PropertiesPage from './pages/Properties/PropertiesPage';
import ManagementPage from './pages/Management/ManagementPage';
import AboutUsPage from './pages/AboutUs/AboutUsPage';
import ContactUsPage from './pages/ContactUs/ContactUsPage';
import React from 'react'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage></HomePage>} />
        <Route exact path="/login" element={<LoginPage></LoginPage>} />
        <Route exact path= "/signup" element={<SignUpPage></SignUpPage>} />
        <Route exact path="/properties" element={<PropertiesPage></PropertiesPage>} />
        <Route exact path="/management" element={<ManagementPage></ManagementPage>} />
        <Route exact path="/about" element={<AboutUsPage></AboutUsPage>} />
        <Route exact path="/contact" element={<ContactUsPage></ContactUsPage>} />
      </Routes>
    </Router>
  );
};

export default App;
