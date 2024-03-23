import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
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

import { ADMIN_ForgotPassword_URL, MessageAetTimeoutTime } from '../../../../config';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
  });
  const handleEmailChange = (event) => {
    setState({
      ...state,
      email: event.target.value,
    });
  };



  const handleFOrgotPasssword = async (event) => {
    event.preventDefault();
    try {
      if(state.email.length == 0){
        toast.error("Plese Enter Email Address")

        return false;
      }
      const response = await axios.post(ADMIN_ForgotPassword_URL, {
        email: state.email,
      });

      var result = response.data;
      if (result.status == true) {
        localStorage.setItem("email",state.email);
        localStorage.setItem('user_id', result.data.user_id);
        toast.success(result.message)
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/verify-otp');
        }, MessageAetTimeoutTime);
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("something want wrong!")
    }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Forgot Password</h1>
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

                    <CRow>
                      <CCol xs={6}>
                        <CButton
                        onClick={handleFOrgotPasssword}


                          color="primary" className="px-4">
                          Send
                        </CButton>
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

export default ForgotPassword
