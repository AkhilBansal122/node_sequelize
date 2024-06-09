import { createContext, useEffect, useReducer } from "react";
import axios from "axios";

// CUSTOM COMPONENT
import { MatxLoading } from "app/components";
import { ADMIN_ChangePassword_URL, ADMIN_ForgotPassword_URL, ADMIN_LOGIN_URL, ADMIN_LOGOUT, ADMIN_ResetPassword_URL, ADMIN_VERIFY_OTP, ADMIN__GET_PROFILE } from "apiurl";
import { useNavigate } from "react-router-dom";
const initialState = {
  user: null,
  token: null,
  isInitialized: false,
  isAuthenticated: false,
  forgotPasswordEmail: null,
  successMessage: false,
  failMessage: false,
  verifyotp: 0,
  newPassword: null,
  message: '',
  type: '',
  isOpen: false,


};

const reducer = (state, action) => {
  switch (action.type) {


    case "INIT": {
      const { isAuthenticated, user, token } = action.payload;
      return { ...state, isAuthenticated, isInitialized: true, user, token };
    }
    case "LOGIN": {
      return { ...state, isAuthenticated: action.payload.user !== null ? true : false, user: action.payload.user ?? null, token: action.payload.token ?? null, successMessage: action.payload.status ?? '' };
    }
    case "LOGOUT": {
      return { ...state, isAuthenticated: false, user: null, token: null };
    }

    case "REGISTER": {
      const { user } = action.payload;

      return { ...state, isAuthenticated: true, user };
    }

    case "SET_FORGOT_PASSWORD_EMAIL": {
      return { ...state, forgotPasswordEmail: action.payload };
    }

    case "SET_SUCCESS": {
      return { ...state, type: 'success', isOpen: true, successMessage: action.payload };
    }

    case "SET_FAIL": {
      return { ...state, type: 'fail', isOpen: true, failMessage: action.payload };
    }
    case "SET_VERIFY_OTP": {
      return { ...state, verifyotp: action.payload };
    }
    case "SET_RESET_PASSWORD": {
      return { ...state, newPassword: action.payload };
    }
    case "SET_CHANGE_PASSWORD": {
      return { ...state, newPassword: action.payload };
    }

    default:
      return state;
  }
};

const AuthContext = createContext({
  ...initialState,
  // method: "JWT",
  login: () => { },
  logout: () => { },
  register: () => { },
  forgotpassword: () => { },
  verifyotp: () => { },
  successMessage: () => { },
  failMessage: () => { },
  resetPassword: () => { },
  changePassword: () => { },

});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = async (email, password) => {
    const data = {
      email: email,
      password: password
    };
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    try {
      const response = await axios.post(ADMIN_LOGIN_URL, data);
      if (response.data.status === true) {
        dispatch({ type: "SET_SUCCESS", payload: response.data.message });
        dispatch({ type: "SET_FAIL", payload: false });
        localStorage.setItem("token", response.data.access_token);
        const token = response.data.access_token;
        const user = response.data.data;
        dispatch({ type: "LOGIN", payload: { user, token } });
      }
      else {
        dispatch({ type: "SET_SUCCESS", payload: false });
        dispatch({ type: "SET_FAIL", payload: response.data.message });
      }
    } catch (error) {
      dispatch({ type: "SET_SUCCESS", payload: false });
      if (error && error.response) {
        dispatch({ type: "SET_FAIL", payload: error.response.data.message });
      }
    }
  };

  const register = async (email, username, password) => {
    try {
      const response = await axios.post("/api/auth/register", { email, username, password });

      const { user } = response.data;
      dispatch({ type: "SET_SUCCESS", payload: response.data.message });
      dispatch({ type: "SET_FAIL", payload: false });

      dispatch({ type: "REGISTER", payload: { user } });
    }
    catch (error) {
      dispatch({ type: "SET_SUCCESS", payload: false });
      if (error && error.response) {
        dispatch({ type: "SET_FAIL", payload: error.response.data.message });
      }
    }
  };

  const logout = async () => {


    const headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data', // You may need to adjust this based on the actual content type
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      headers: headers
    };
    try {
      const response = await axios.post(ADMIN_LOGOUT, {}, config);

      localStorage.clear();
      localStorage.setItem("token", '');
      dispatch({ type: "SET_SUCCESS", payload: response.data.message });
      dispatch({ type: "SET_FAIL", payload: false });

      dispatch({ type: "LOGOUT", payload: { user: null, token: null } });
    } catch (error) {
      if (error && error) {
        dispatch({ type: "SET_SUCCESS", payload: false });
        dispatch({ type: "SET_FAIL", payload: error.response.data.message });
      }
    }
  };
  const forgotpassword = async (email) => {
    const data = {
      email: email,
    };
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    try {
      const response = await axios.post(ADMIN_ForgotPassword_URL, data, config);
      if (response.data.status === true) {
        dispatch({ type: "SET_SUCCESS", payload: response.data.message });
        dispatch({ type: "SET_FAIL", payload: false });
        dispatch({ type: 'SET_FORGOT_PASSWORD_EMAIL', payload: email });
      }
    } catch (error) {
      if (error && error.response)
      // Handle any errors that occur during the request
      {
        dispatch({ type: "SET_SUCCESS", payload: false });
        dispatch({ type: "SET_FAIL", payload: error.response.data.message });
      }
    }
  }

  const verifyotp = async (verifyotp, email) => {
    const data = {
      email: email,
      otp: verifyotp
    };

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
    try {
      const response = await axios.post(ADMIN_VERIFY_OTP, data, config);
      if (response.data.status === true) {
        dispatch({ type: "SET_SUCCESS", payload: response.data.message });
        dispatch({ type: "SET_FAIL", payload: false });
        dispatch({ type: 'SET_VERIFY_OTP', payload: { data } });
      }
    } catch (error) {
      dispatch({ type: "SET_SUCCESS", payload: false });
      if (error && error.response) {
        dispatch({ type: "SET_FAIL", payload: error.response.data.message });
      }

    }

  }
  const resetPassword = async (newPassword, email) => {

    const data = {
      email: email,
      newPassword: newPassword,
    };
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    try {
      const response = await axios.post(ADMIN_ResetPassword_URL, data, config);
      if (response.data.status === true) {
        dispatch({ type: "SET_SUCCESS", payload: response.data.message });
        dispatch({ type: "SET_FAIL", payload: false });

        dispatch({ type: 'SET_RESET_PASSWORD', payload: email });
      }
    } catch (error) {
      dispatch({ type: "SET_SUCCESS", payload: false });
      if (error && error.response) {
        dispatch({ type: "SET_FAIL", payload: error.response.data.message });
      }

    }


  }
  const changePassword = async (curremtPassword, newPassword) => {


    const data = {
      currentPassword: curremtPassword,
      newPassword: newPassword
    };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    };

    const token = localStorage.getItem('token');
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      headers: headers
    };
    try {
      const response = await axios.post(ADMIN_ChangePassword_URL, data, config);
      if (response.data.status === true) {
        dispatch({ type: 'SET_CHANGE_PASSWORD', payload: response.data.data });

        dispatch({ type: "SET_SUCCESS", payload: response.data.message });
        dispatch({ type: "SET_FAIL", payload: false });
      }

    } catch (error) {
      dispatch({ type: "SET_SUCCESS", payload: false });
      if (error && error.response) {
        dispatch({ type: "SET_FAIL", payload: error.response.data.message });
      }

    }

  }

  const successMessage = () => {
    console.log("test::", state.SET_SUCCESS);
  }
  const failMessage = () => {
    console.log(state.SET_FAIL);

  }
  const navigate = useNavigate();

  useEffect(() => {

    (async () => {
      try {
        var token = localStorage.getItem('token');
        if (token && token != null && token.length > 0) {
          const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Bearer ${token}`
            }
          };
          const response = await axios.get(ADMIN__GET_PROFILE, config);
          const user = response.data.data;
          navigate("/dashboard");
          dispatch({ type: "LOGIN", payload: { user, token } });
          dispatch({ type: "SET_SUCCESS", payload: false });
          dispatch({ type: "INIT", payload: { isAuthenticated: true, user: user } });
        }
        else {
          navigate("/");
          dispatch({ type: "LOGIN", payload: { user: null, token: null } });
          dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
        }

      } catch (error) {
        //     console.error(err);
        dispatch({ type: "SET_SUCCESS", payload: false });
        if (error && error.response) {

          dispatch({ type: "SET_FAIL", payload: error.response.data.message });
        }

        dispatch({ type: "INIT", payload: { isAuthenticated: false, user: null } });
      }
    })();
  }, []);

  // SHOW LOADER
  if (!state.isInitialized) return <MatxLoading />;

  return (
    <AuthContext.Provider value={{ ...state, method: "JWT", login, logout, register, forgotpassword, verifyotp, resetPassword, changePassword, successMessage, failMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
