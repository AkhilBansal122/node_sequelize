import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ADMIN_LOGIN_URL, MessageAetTimeoutTime } from '../../../../config'
import axios from 'axios'
import { useAuth } from '../../../Context/AuthContext'
const Login = () => {
  const navigate = useNavigate();

  const { user, authlogin, authlogout } = useAuth();

  const [state, setState] = useState({
    email: '',
    password: '',
    showPassword: false,
    isLoggedIn: false,
  });
  const handleEmailChange = (event) => {
    setState({
      ...state,
      email: event.target.value,
    });
  };
  const handlePasswordChange = (event) => {
    setState({
      ...state,
      password: event.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setState({
      ...state,
      [field]: !state[field],
    });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (state.email == '' || state.password == '') {
        toast.error("Please enter login details email and password.")
        return false;
      }
      const response = await axios.post(ADMIN_LOGIN_URL, {
        email: state.email,
        password: state.password
      });
      var result = response.data;
      if (result.status == true) {
      //  console.log(result.data);
        authlogin(result.data);
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("isLogin", true);
        toast.success(result.message)
        setTimeout(() => {
          navigate("/dashboard");
        }, MessageAetTimeoutTime);
      } else {
        toast.error(result.message)

      }
    } catch (error) {
      console.log(error);
      toast.error("Something wan't wrong")
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        required={true}
                        onChange={handleEmailChange}
                        value={state.email}
                        id="exampleFormControlInput1"
                        placeholder="name@example.com"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        required={true}
                        value={state.password}
                        onChange={handlePasswordChange}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={handleLogin}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link to="/forgot-password">

                          <CButton color="link" className="px-0">
                            Forgot password?
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
