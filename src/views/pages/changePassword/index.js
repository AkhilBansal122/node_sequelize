import React, { useState } from 'react';
import { CRow, CCol, CCard, CCardHeader, CCardBody, CForm, CFormLabel, CFormInput, CFormTextarea, CButton } from '@coreui/react';

import {
  cilEyedropper,
  cilEqualizer,
  cilLineStyle
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ADMIN_ChangePassword_URL, authHeader,MessageAetTimeoutTime } from '../../../../config';
import axios from "axios";
const ChangePassword = () => {
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState('');


  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const [showOldPassword, setShowoldPassword] = useState(false);

  const handleChangeOldPassword = (e) => {
    setOldPassword(e.target.value);
  };



  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordOldVisibility = () => {
    setShowoldPassword(!showOldPassword);
  };



  const handleConfirmTogglePasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Destructuring state variables

    // Password validation
    if (password !== confirmPassword) {
      toast.error('Password and confirm password do not match.');
      return;
    }

    if (oldPassword.length > 0 && password.length > 0) {
      try {
        const response = await axios.post(ADMIN_ChangePassword_URL, {
          currentPassword: oldPassword,
          newPassword: password,
        }, {
          headers: authHeader()
        });

        const result = response.data;

        if (result.status === true) {
          localStorage.clear();
          toast.success(result.message);

          setTimeout(() => {
            navigate("/");
          }, MessageAetTimeoutTime);

        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred while resetting the password.');
      }
    } else {
      toast.error('Please enter current password and new password');
    }

    console.log('Submitted');
  };


  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Change Password</strong>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>

            <div className="mb-3">
                <CFormLabel htmlFor="password">Old Password</CFormLabel>
                <div className="input-group">
                  <CFormInput
                    type={showOldPassword ? 'text' : 'password'}
                    id="password"
                    value={oldPassword}
                    onChange={handleChangeOldPassword}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={handleTogglePasswordOldVisibility}>
                    <CIcon icon={cilLineStyle} className="me-2" />

                  </button>
                </div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="password">New Password</CFormLabel>
                <div className="input-group">
                  <CFormInput
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={handleChangePassword}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={handleTogglePasswordVisibility}>
                    <CIcon icon={cilEyedropper} className="me-2" />

                  </button>
                </div>
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="confirmPassword">Confirm New Password</CFormLabel>
                <div className="input-group">

                  <CFormInput
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChangeConfirmPassword}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={handleConfirmTogglePasswordVisibility}>
                    <CIcon icon={cilEqualizer} className="me-2" />

                  </button>
                </div>
              </div>
              <CButton type="submit" color="primary">Change Password</CButton>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ChangePassword;
