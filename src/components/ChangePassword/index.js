import React, { useState } from 'react';
import axios from 'axios';
import { LOGO_URL, ADMIN_ChangePassword_URL, MessageAetTimeoutTime } from "../../common";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PasswordField } from '../CommonFields';

const ChangePassword = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
        isResetSuccessful: false,
        showOldPassword: false,
        showPassword: false,
        showConfirmPassword: false,
        error: null,
    });

    const handleOldPasswordChange = (event) => {
        setState({
            ...state,
            oldPassword: event.target.value,
        });
    };

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
    const togglePasswordVisibility = (field) => {
        setState({
            ...state,
            [field]: !state[field],
        });
    };
    const handleChangePassword = async (event) => {
        event.preventDefault();

        // Password validation
        if (state.password !== state.confirmPassword) {
            toast.error('Password and confirm password do not match.')

            return;
        }
        if (state.oldPassword.length > 0 && state.password.length > 0) {
            try {
                const response = await axios.post(ADMIN_ChangePassword_URL, {
                    currentPassword: state.oldPassword,
                    mewPassword: state.password,
                }, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                });

                var result = response.data;

                if (result.status) {
                    localStorage.clear();
                    toast.success(result.message);

                    setTimeout(() => {
                        navigate("/");
                    }, MessageAetTimeoutTime);

                } else {
                    setState({
                        ...state,
                        error: result.message,
                    });
                }
            } catch (error) {
                toast.error('An error occurred while resetting the password.');
            }
        }
        else {
            toast.error('Please enter current password and new password');
        }

    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-md-12 mx-auto my-5">
                    <div className="card mini-stat m-b-30">
                        <div className="p-3 bg-primary text-white">
                            <div className="mini-stat-icon">
                                <i className="mdi mdi-cube-outline float-right mb-0" />
                            </div>
                            <h6 className="text-uppercase mb-0">Change Password</h6>
                        </div>
                        <div className="card-body">
                            <form className="form-horizontal m-t-20" action="#" method="POST">
                                <div className="form-group row">
                                    <div className="col-12">
                                        <PasswordField
                                            name="oldPassword"
                                            value={state.oldPassword}
                                            onChange={handleOldPasswordChange}
                                            showPassword={state.showOldPassword}
                                            onToggle={() => togglePasswordVisibility('showOldPassword')}
                                            placeholder="Current Password"
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
                                            placeholder="New Password"
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-12">

                                        <PasswordField
                                            name="confirmPassword"
                                            value={state.confirmPassword}
                                            onChange={handleConfirmPasswordChange}
                                            showPassword={state.showConfirmPassword}
                                            onToggle={() => togglePasswordVisibility('showConfirmPassword')}
                                            placeholder="Confirm Password"
                                        />
                                    </div>
                                </div>


                                <div className="form-group text-center row m-t-20">
                                    <div className="col-12">
                                        <button
                                            className="btn btn-primary btn-block waves-effect waves-light"
                                            onClick={handleChangePassword}
                                            type="submit"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChangePassword;
