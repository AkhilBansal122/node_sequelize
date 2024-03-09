// src/App.js
import { React, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from "./components/Login";
import ForgotPassword from './components/ForgetPassword';
import OTPScreen from './components/OtpScreen';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';


import ChangePassword from "./components/ChangePassword";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import PageContent from "./components/PageContent";
import Footer from "./components/Footer";

const App = () => {

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token !== null) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        //   console.error("Error checking authentication:", error);
        setAuth(false);
      }
    };
    checkAuth();
  }, []);



  //   return (  <div id="wrapper">
  //   <Sidebar />
  //   <div className="content-page">
  //     <TopBar />
  //     <PageContent />
  //     <Footer />
  //   </div>
  // </div>)


  return (
    <Router>
      <Routes>
        {/* Pages accessible without authentication */}
        <Route path='/' element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<OTPScreen />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Redirect to login if auth is false */}
        {auth === false ? (
          <Route path="*" element={<Navigate to="/" />} />
        ) : null}

        {/* Pages accessible only with authentication */}
        {auth === true ? (
          <>
            <Route path="/dashboard" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path='/change-password' element={<ChangePassword />} />
          </>
        ) : null}
      </Routes>
    </Router>
  );
};

export default App;