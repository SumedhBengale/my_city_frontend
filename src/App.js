import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Login from './pages/Login';
import React from 'react'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home></Home>} />
        <Route exact path="/login" element={<Login></Login>} />
      </Routes>
    </Router>
  );
};

export default App;
