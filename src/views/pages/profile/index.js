import React, { useState, useEffect } from 'react';
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback
} from '@coreui/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { ADMIN_UPDATE_PROFILE, MessageAetTimeoutTime, authHeader } from '../../../../config';
import { useAuth } from '../../../Context/AuthContext';
import axios from 'axios';
const Profile = () => {
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [validated, setValidated] = useState(false)
  const { user, authlogin } = useAuth();
  const [fileupload, setFile] = useState(null);

  useEffect(() => {
    if (user != null) {
      setName(user.name);
      setEmail(user.email);
      setMobile(user.mobile);
      setProfileImage(user.image ?? null);
    }

  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const file = event.target.elements.profileImage.files[0];
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    else {
      try {
        if (email == '' || Name == '') {
          toast.error("Please enter valid details.")
          return false;
        }
        const formData = new FormData();
        formData.append("name", Name);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append('image', fileupload);
        //console.log(formData);
        const response = await axios.post(ADMIN_UPDATE_PROFILE, formData, {
          headers: authHeader(),
        });
        var result = response.data;
        if (result.status == true) {
          authlogin(result.data);
          toast.success(result.message)
          setTimeout(() => {
          }, MessageAetTimeoutTime);
        } else {
          toast.error(result.message)
        }
      } catch (error) {
        toast.error("Something wan't wrong")
      }

    }
    setValidated(true)
  }


  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Edit Profile Information</strong>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CCol md={4}>
                <CFormInput
                  type="text"
                  defaultValue={Name}
                  feedbackValid="Please Valid Name"
                  id="validationCustom01"
                  label="Name"
                  onChange={(event) => setName(event.target.value)} // Use an arrow function to pass a function reference                  required
                />
                <CFormFeedback invalid>Please provide a name.</CFormFeedback>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="validationCustomEmail">Email</CFormLabel>
                <CInputGroup className="has-validation">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    type="email"
                    defaultValue={email}
                    aria-describedby="inputGroupPrependFeedback"
                    feedbackValid="Please choose a Email."
                    id="validationCustomEmail"
                    onChange={(event) => setEmail(event.target.value)} // Use an arrow function to pass a function reference
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid email.</CFormFeedback>
                </CInputGroup>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="validationCustomMobile">Mobile</CFormLabel>
                <CInputGroup className="has-validation">
                  <CFormInput
                    type="tel"
                    defaultValue={mobile}
                    onChange={(event) => setMobile(event.target.value)} // Use an arrow function to pass a function reference
                    aria-describedby="inputGroupPrependFeedback"
                    feedbackValid="Please choose a mobile Number."
                    id="validationCustomMobile"
                    required
                  />
                  <CFormFeedback invalid>Please provide a valid mobile.</CFormFeedback>

                </CInputGroup>
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="profileImage">Profile Image</CFormLabel>
                <CInputGroup>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={handleImageUpload}
                  />
                </CInputGroup>
                {profileImage && (
                  <div className="preview-box">
                    <img src={profileImage} alt="Profile" className="preview-image" />
                  </div>
                )}
              </CCol>
              <CCol xs={12} className="d-flex justify-content-end">
                <CButton color="primary" type="submit">
                  Save
                </CButton>
              </CCol>
            </CForm>

          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Profile;
