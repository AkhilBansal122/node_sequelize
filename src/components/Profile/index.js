import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomButton, EmailField, TextField } from '../CommonFields';

const Profile = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        first_name: '',
        last_name: '',
        email: '',
        selectedImage: null,
        imagePreview: null,
    });

    const handleTextFieldChange = (event) => {
        const { name, value } = event.target;
        setState({
            ...state,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setState({
                    ...state,
                    selectedImage: file,
                    imagePreview: reader.result,
                });
            };

            reader.readAsDataURL(file);
        }
    };
    const handleSubmit = () => {
        // Implement your save logic here
        // For example, you can show a toast message
        toast.success('Profile details saved successfully!');
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-12 col-md-12 mx-auto ">
                    <div className="card mini-stat m-b-30">
                        <div className="p-3 bg-primary text-white">
                            <div className="mini-stat-icon">
                                <i className="mdi mdi-cube-outline float-right mb-0" />
                            </div>
                            <h6 className="text-uppercase mb-0">Profile Details</h6>
                        </div>
                        <div className="card-body">
                            <form className="form-horizontal m-t-20" action="#" method="POST">
                                <div className="form-group row">
                                    <div className="col-12">
                                        

                                        <div className="form-group text-center row m-t-20">
                                            <div className="col-4">
                                                <TextField
                                                    name="first_name"
                                                    placeholder="Enter First Name"
                                                    value={state.first_name}
                                                    onChange={handleTextFieldChange}
                                                />
                                            </div>
                                            <div className="col-4">
                                                <TextField
                                                    name="last_name"
                                                    placeholder="Enter Last Name"
                                                    value={state.last_name}
                                                    onChange={handleTextFieldChange}
                                                />
                                            </div>
                                            <div className='col-4'>
                                                <EmailField
                                                    name="email"
                                                    placeholder="Enter Email"
                                                    value={state.email}
                                                    onChange={handleTextFieldChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Image input and preview */}
                                <div className="form-group text-center row m-t-20">
                                    <div className="col-12">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        {state.imagePreview && (
                                            <img
                                                src={state.imagePreview}
                                                alt="Selected preview"
                                                style={{ maxWidth: '100%', marginTop: '10px' }}
                                            />
                                        )}
                                    </div>
                                </div>

                                <div className="form-group text-center row m-t-20">
                                    <div className="col-12">

                                        <CustomButton
                                            label="Send Email" onClick={() => { }} className="btn-primary btn-block waves-effect waves-light"
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            </div >
        </div >
    );
};

export default Profile;
