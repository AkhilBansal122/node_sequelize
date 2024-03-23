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

import { ADMIN_ResetPassword_URL, MessageAetTimeoutTime } from '../../../../config';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });

  const handleNewPasswordChange = (e) => {
    setState({
      ...state,
      newPassword: e.target.value
    });
  };


  const handleConfirmNewPasswordChange = (e) => {
    setState({
      ...state,
      confirmNewPassword: e.target.value
    });
  };

  const handleResetPassword = async (event) => {
    event.preventDefault();
    // Implement password reset logic here
    const { newPassword, confirmNewPassword } = state;
    if (newPassword !== confirmNewPassword) {
      toast.error("Password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.post(ADMIN_ResetPassword_URL, {
        email: localStorage.getItem("email"),
        newPassword: newPassword,
      });

      var result = response.data;

      if (result.status) {
        localStorage.clear();
        toast.success(result.message);
        setTimeout(() => {
          navigate("/");
        }, MessageAetTimeoutTime);

      } else {
        toast.error(result.message);

      }
    } catch (error) {
      toast.error('An error occurred while resetting the password.');
    }
    // Reset password logic goes here
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
                    <h1>Reset Password</h1>
                    <p className="text-body-secondary">Enter your email and new password</p>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        required={true}
                        onChange={handleNewPasswordChange}
                        value={state.newPassword}
                        id="newPassword"
                        placeholder="New Password"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        required={true}
                        onChange={handleConfirmNewPasswordChange}
                        value={state.confirmNewPassword}
                        id="confirmNewPassword"
                        placeholder="Confirm New Password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={handleResetPassword} color="primary" className="px-4">
                          Reset Password
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

export default ResetPassword
