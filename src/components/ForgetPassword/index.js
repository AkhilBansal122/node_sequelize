import React, { useState } from 'react';
import axios from 'axios';
import { LOGO_URL, ADMIN_ForgotPassword_URL } from "../../common";
import { useNavigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const history = useNavigate();

    const [state, setState] = useState({
        email: 'akhl@mailinator.com',
       });

    const handleEmailChange = (event) => {
        setState({
            ...state,
            email: event.target.value,
        });
    };


    const handleFOrgotPasssword = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post(ADMIN_ForgotPassword_URL, {
                email: state.email,
            });

            var result = response.data;
            if(result.status== true){
                localStorage.setItem('user_id',result.data.user_id);
                history("/admin/verify-otp");
            } else {

            }
        } catch (error) {
            console.log(error);
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
                                        <a href="index.html" className="logo logo-admin"><img src={LOGO_URL} height={30} alt="logo" /></a>
                                    </h3>
                                    <h4 className="text-muted text-center font-18"><b>Reset Password</b></h4>
                                    <div className="p-3">
                                        <form className="form-horizontal " method='POST'>
                                          
                                            <div className="form-group row">
                                                <div className="col-12">
                                                    <input className="form-control" type="email"  onChange={handleEmailChange}
                                                    value={state.email} required placeholder="Email" />
                                                </div>
                                            </div>
                                            <div className="form-group text-center row m-t-20">
                                                <div className="col-12">
                                                    <button className="btn btn-primary btn-block waves-effect waves-light" onClick={handleFOrgotPasssword} type="submit">Send Email</button>
                                                </div>
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
export default ForgotPassword;