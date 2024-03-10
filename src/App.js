// App.js
import React, { useEffect, useState } from 'react';
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
import Layout from './Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Pages accessible without authentication */}
        <Route path='/' element={<Login />} />
        <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/verify-otp" element={<OTPScreen />} />
        <Route path="/admin/reset-password" element={<ResetPassword />} />

        {/* Private routes */}
        <Route element={<PrivateRoute/>}>
          <Route  path="/admin/dashboard" element={ <Layout pageContents={{ breadcrumbitem:"Home",breadcrumbitems:"Dashboard",breadcrumbitemActive:"Dashboard",pageTitle:"Dashboard" ,LinkTo:"/admin/dshboard"}} mainComponent={<Home />} /> } />
          <Route path="/about" element={<About />}  />
          <Route path="/contact" element={<Contact />} />
          <Route path='/admin/change-password' element={ <Layout pageContents={{ breadcrumbitem:"Home",breadcrumbitems:"Change Password",breadcrumbitemActive:"Change Password",pageTitle:"Change Password" ,LinkTo:"/admin/dshboard"}} mainComponent={<ChangePassword />} /> } />
        </Route>
        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
