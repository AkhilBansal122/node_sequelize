// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from "./components/Login";
import ForgotPassword from './components/ForgetPassword';
import OTPScreen from './components/OtpScreen';
import ResetPassword from './components/ResetPassword';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPScreen />} />
        <Route path ="/reset-password" element={<ResetPassword/>}/>
      </Routes>
    </Router>
  );
};

export default App;