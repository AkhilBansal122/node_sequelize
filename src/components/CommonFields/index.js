import React from 'react';
export const TextField = ({ name, value, onChange, placeholder }) => (
    <div className="form-group row">
        <div className="col-12">
            <input
                className="form-control"
                name={name}
                onChange={onChange}
                value={value}
                type="text"
                required
                placeholder={placeholder}
            />
        </div>
    </div>
);


export const PasswordField = ({ name, value, onChange, showPassword, onToggle, placeholder }) => {
    return (

        <div className="input-group">
            <input
                className="form-control"
                name={name}
                onChange={onChange}
                value={value}
                type={showPassword ? 'text' : 'password'}
                required
                placeholder={placeholder}
            />
            <div className="input-group-append">
                <span className="input-group-text"
                    style={{ background: "#fd6e77", color: "#fff" }}
                    onClick={onToggle}>
                    <i className={showPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'} />
                </span>
            </div>
        </div>

    );
};
export const EmailField = ({ name, value, onChange, placeholder }) => (
    <input
        className="form-control"
        name={name}
        onChange={onChange}
        value={value}
        type="email"
        required
        placeholder={placeholder}
    />
);
export const CustomButton = ({ label, onClick, className }) => (
    <button
        className={`btn ${className}`}
        onClick={onClick}>
        {label}
    </button>

);

