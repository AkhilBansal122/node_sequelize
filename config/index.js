export const MessageAetTimeoutTime = 5000;
export const BASE_URL = "http://localhost:5000/api/admin";
export const ADMIN_LOGIN_URL = `${BASE_URL}/login`;
export const ADMIN_ForgotPassword_URL = `${BASE_URL}/forgot-password`;
export const ADMIN_VERIFY_OTP = `${BASE_URL}/verify-otp`;
export const ADMIN_ResetPassword_URL = `${BASE_URL}/reset-password`;
export const ADMIN_LOGOUT = `${BASE_URL}/logout`;
export const ADMIN_ChangePassword_URL = `${BASE_URL}/change-password`;
export const ADMIN_UPDATE_PROFILE   = `${BASE_URL}/update-profile`;
export const authHeader = () => {
  const header = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };

  const token = localStorage.getItem('token');
  if (token) {
    header.Authorization = `Bearer ${token}`;
  }

  return header;
};

