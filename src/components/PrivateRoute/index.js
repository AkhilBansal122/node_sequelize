import React from 'react';
import { Route, Navigate } from 'react-router-dom';

// Dummy authentication function, replace with your actual authentication logic
const isAuthenticated = () => {
  return localStorage.getItem('token') ? true :false;
};

const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

export default PrivateRoute;
