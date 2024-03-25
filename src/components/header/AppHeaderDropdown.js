import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
  cilLockUnlocked,
  cilSettings,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import avatar8 from './../../assets/images/avatars/8.jpg'
import axios from 'axios';
import { ADMIN_LOGOUT,authHeader } from "../../../config/";
import { useAuth } from '../../Context/AuthContext';
const AppHeaderDropdown = () => {
  const navigate = useNavigate();

  const { user, authlogin, authlogout } = useAuth();
  const Logout = async (event) => {

    event.preventDefault();
    // Your logout logic here
    const checked = localStorage.getItem('token');
    try {
      if (checked.length > 0) {

        const response = await axios.post(ADMIN_LOGOUT,
          {}, // here is supposed to be `data`
          {
            headers: authHeader()
          });
        var result = response.data;
        if (result.status == true) {
          authlogout(null);
          toast.success("Logout Successfully");
          setTimeout(() => {
            navigate('/');
          }, 1000);
          localStorage.clear();
        }
      }

    } catch (error) {
      navigate("/");

    }
  }
  const handleChangePassword = async (event) => {
    event.preventDefault();
    navigate('/change-password')
  }
  const profile = async (event) => {
    event.preventDefault();
    navigate('/profile')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={localStorage.getItem('image')!=null ? localStorage.getItem('image') : avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">

        <CDropdownHeader className="bg-body-secondary fw-semibold my-2">Settings</CDropdownHeader>
        <CDropdownItem href="#" onClick={profile}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#" onClick={handleChangePassword}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Change Password
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem href="#" onClick={Logout}>
          <CIcon icon={cilLockUnlocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
