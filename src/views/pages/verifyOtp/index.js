import React, { useState, useRef } from 'react';
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

import { ADMIN_VERIFY_OTP, MessageAetTimeoutTime } from '../../../../config';

const VerifyOTP = () => {
  const navigate  = useNavigate();


  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const handleChange = (index, value) => {
      // Allow only numeric input
      if (/^\d*$/.test(value)) {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
          // Move to the next input field
          if (index < otp.length - 1 && value !== '') {
              inputRefs.current[index + 1].focus();
          }
      }
  };
  const handelVerifyOtp = async (event) => {
      event.preventDefault();
      if(otp.length == 6){
          let newotps = otp.toString();

          try {
              const response = await axios.post(ADMIN_VERIFY_OTP, {
                  otp: newotps.replace(',','').replace(",",'').replace(",",'').replace(",",'').replace(",",'').replace(",",''),
                  email : localStorage.getItem("email")
              });

              var result = response.data;
           //   console.log(result.status);

              if (result.status) {
                  toast.success(result.message)
                  setTimeout(() => {
                      navigate("/reset-password");
                    }, MessageAetTimeoutTime);


              } else {
                  toast.error(result.message)

              }
          } catch (error) {
              toast.error(error)

          }
      }
  };
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Verify OTP</h1>
                    <p className="text-body-secondary">OTP Send Your Email Id {localStorage.getItem('email')}</p>

                    {/* Render input fields for OTP */}
                    <CRow>
                      {otp.map((digit, index) => (
                        <CCol key={index} xs={2}>
                          <CFormInput
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            ref={(ref) => (inputRefs.current[index] = ref)}

                          />
                        </CCol>
                      ))}
                    </CRow>

                    <CRow className="mt-4">
                      <CCol xs={6}>
                        <CButton onClick={handelVerifyOtp} color="primary" className="px-4">
                          Send OTP
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

export default VerifyOTP
