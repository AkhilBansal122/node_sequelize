import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LOGO_URL, ADMIN_LOGIN_URL, MessageAetTimeoutTime } from "../../common";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PasswordField, EmailField } from '../CommonFields';

const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: 'akhl@mailinator.com',
        password: 'New@2023',
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
        //  console.log("Sdda",state);    
        try {
            const response = await axios.post(ADMIN_LOGIN_URL, {
                email: state.email,
                password: state.password
            });

            var result = response.data;
            console.log(result.status);
            if (result.status == true) {
                var token = result.data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("isLogin", true);
                toast.success(result.message)
                setTimeout(() => {
                    navigate("/admin/dashboard");
                }, MessageAetTimeoutTime);
            } else {
                toast.error(result.message)

            }
        } catch (error) {
            toast.error("Something wan't wrong")

            //    console.log(error);
        }
    };





    return (<div className="accountbg">
        <div className="content-center">
            <div className="content-desc-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-5 col-md-8">
                            <div className="card">
                                <div className="card-body">
                                    <h3 className="text-center mt-0 m-b-15">
                                        <a href="#" className="logo logo-admin"><img src={LOGO_URL} height={30} alt="logo" /></a>
                                    </h3>
                                    <h4 className="text-muted text-center font-18"><b>Sign In</b></h4>
                                    <div className="p-2">
                                        <form className="form-horizontal m-t-20" action="#" method='POST'>
                                            <div className="form-group row">
                                                <div className="col-12">

                                                    <EmailField
                                                        name="email"
                                                        onChange={handleEmailChange}
                                                        value={state.email}
                                                        placeholder="Email"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-12">
                                                    <PasswordField
                                                        name="password"
                                                        value={state.password}
                                                        onChange={handlePasswordChange}
                                                        showPassword={state.showPassword}
                                                        onToggle={() => togglePasswordVisibility('showPassword')}
                                                        placeholder="Enter A Password"
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <div className="col-12">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group text-center row m-t-20">
                                                <div className="col-12">
                                                    <button className="btn btn-primary btn-block waves-effect waves-light" onClick={handleLogin} type="submit">Log In</button>
                                                </div>
                                            </div>
                                            <div className="form-group m-t-10 mb-0 row">
                                                <div className="col-sm-7 m-t-20">
                                                    <Link to="/admin/forgot-password" className="text-muted"><i className="mdi mdi-lock" /> Forgot your password?</Link>
                                                </div>
                                                {/* <div className="col-sm-5 m-t-20">
                                                    <Link to="/admin/forgot-password" className="text-muted"><i className="mdi mdi-account-circle" /> Create an account</Link>
                                                </div> */}
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end row */}
                </div>
            </div>
        </div>
    </div>)
}
export default Login;