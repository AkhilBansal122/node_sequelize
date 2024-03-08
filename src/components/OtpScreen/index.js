import React, { useState, useRef } from 'react';
import axios from 'axios';
import { LOGO_URL, ADMIN_VERIFY_OTP } from "../../common";

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const OTPScreen = () => {

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
                    user_id : localStorage.getItem("user_id")
                });

                var result = response.data;
             //   console.log(result.status);

                if (result.status) {
                    window.location.href = "/reset-password";

                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.log(error);
            }
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
                                    <h4 className="text-muted text-center font-18"><b>Reset Password</b></h4>
                                    <div className="p-3">
                                        <form className="form-horizontal " action="#">

                                            <div className="form-group row">
                                                {otp.map((digit, index) => (
                                                    <div className="col-2" key={index}>
                                                        <input
                                                            className="form-control"
                                                            type="text"
                                                            required={"true"}
                                                            maxLength={1}
                                                            value={digit}
                                                            onChange={(e) => handleChange(index, e.target.value)}
                                                            ref={(ref) => (inputRefs.current[index] = ref)}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="form-group text-center row m-t-20">
                                                <div className="col-12">
                                                    <button className="btn btn-primary btn-block waves-effect waves-light" onClick={handelVerifyOtp} type="submit">Verify OTP</button>
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
export default OTPScreen