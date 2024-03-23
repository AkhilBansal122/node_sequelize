import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Pages

import ForgotPassword from './views/pages/forgotPassword'
import Login from './views/pages/login/Login'
import Page404 from './views/pages/page404/Page404'
import Page500 from './views/pages/page500/Page500'
import DefaultLayout from './layout/DefaultLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VerifyOTP from './views/pages/verifyOtp'
import ResetPassword from './views/pages/resetPassword'
import ChangePassword from './views/pages/changePassword'
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <ToastContainer />

      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/" name="Login Page" element={<Login />} />
          <Route exact path="/forgot-password" name="Login Page" element={<ForgotPassword />} />
          <Route exact path='/Verify-otp' name="VerifyOTP" element={<VerifyOTP />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
