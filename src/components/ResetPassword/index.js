import React, { useState } from 'react';
import axios from 'axios';
import { LOGO_URL, ADMIN_ResetPassword_URL,MessageAetTimeoutTime } from "../../common";
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ResetPassword = () => {
    const navigate  = useNavigate();
    const [state, setState] = useState({
        password: '',
        confirmPassword: '',
        isResetSuccessful: false,
        error: null,
    });

    

    const handlePasswordChange = (event) => {
        setState({
            ...state,
            password: event.target.value,
        });
    };

    const handleConfirmPasswordChange = (event) => {
        setState({
            ...state,
            confirmPassword: event.target.value,
        });
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();

        // Password validation
        if (state.password !== state.confirmPassword) {
            toast.error("Password and confirm password do not match.");
            return;
        }

        try {
            const response = await axios.post(ADMIN_ResetPassword_URL, {
                user_id :localStorage.getItem("user_id"),
                newPassword: state.password,
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
    };

    return (
        <div className="accountbg">
            <div className="content-center">
                <div className="content-desc-center">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-5 col-md-8">
                                <div className="card">
                                    <div className="card-body">
                                        <h3 className="text-center mt-0 m-b-15">
                                            <a href="index.html" className="logo logo-admin"><img src={LOGO_URL} height={30} alt="logo" /></a>
                                        </h3>
                                        <h4 className="text-muted text-center font-18"><b>Reset Password</b></h4>
                                        <div className="p-2">
                                            {state.isResetSuccessful ? (
                                                <p className="text-success">Password reset successful!</p>
                                            ) : (
                                                <form className="form-horizontal m-t-20" action="#" method="POST">
                                                    
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            <input
                                                                className="form-control"
                                                                name="password"
                                                                onChange={handlePasswordChange}
                                                                value={state.password}
                                                                type="password"
                                                                required
                                                                placeholder="New Password"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-12">
                                                            <input
                                                                className="form-control"
                                                                name="confirmPassword"
                                                                onChange={handleConfirmPasswordChange}
                                                                value={state.confirmPassword}
                                                                type="password"
                                                                required
                                                                placeholder="Confirm Password"
                                                            />
                                                        </div>
                                                    </div>
                                                    {state.error && (
                                                        <div className="form-group text-center row text-danger">
                                                            <div className="col-12">{state.error}</div>
                                                        </div>
                                                    )}
                                                    <div className="form-group text-center row m-t-20">
                                                        <div className="col-12">
                                                            <button
                                                                className="btn btn-primary btn-block waves-effect waves-light"
                                                                onClick={handleResetPassword}
                                                                type="submit"
                                                            >
                                                                Reset Password
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
