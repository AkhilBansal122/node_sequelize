import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";


import {
    Grid,
    Icon

} from "@mui/material";
import { Span } from "app/components/Typography";
import { TextField, InputAdornment, IconButton } from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";

import { Breadcrumb } from "app/components";
import { LoadingButton } from "@mui/lab";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuth from "app/hooks/useAuth";


// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
}));
const strongPasswordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/;

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current Password is required"),
    newPassword: Yup.string()
        .matches(
            strongPasswordRegex,
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 6 characters long"
        )
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password is required")
});




export default function ChangePassword() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false); // State to toggle password visibility
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility
    const { changePassword, logout } = useAuth(); // Assuming you have a ChangePassword function from useAuth



    //Current Password
    const handleBlurCurrentToggle = () => {
        setShowCurrentPassword(!showCurrentPassword);
    }
    //New Password
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    //Confirm Password
    const handleToggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleFormSubmit = async (values) => {
        setLoading(true);
        await changePassword(values.currentPassword, values.newPassword);
        setLoading(false);
        logout();
        navigate("/");
    }

    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    };


    return (
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Change Password", path: "/change-password" }, { name: "Home" }]} />
            </Box>
            <Stack spacing={3}>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={6}>
                                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
                                    <TextField
                                        fullWidth
                                        type={showCurrentPassword ? "text" : "password"} // Toggle password visibility
                                        name="currentPassword"
                                        size="small"
                                        label="Current Password"
                                        onBlur={handleBlur}
                                        value={values.currentPassword}
                                        variant="outlined"
                                        onChange={handleChange}
                                        helperText={touched.currentPassword && errors.currentPassword}
                                        error={Boolean(errors.currentPassword && touched.currentPassword)}
                                        InputProps={{
                                            // Add icon button to toggle password visibility
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleBlurCurrentToggle} edge="end">
                                                        {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ mb: 3, width: "100%" }}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
                                    <TextField
                                        fullWidth
                                        type={showPassword ? "text" : "password"} // Toggle password visibility
                                        name="newPassword"
                                        size="small"
                                        label="New Password"
                                        onBlur={handleBlur}
                                        value={values.newPassword}
                                        variant="outlined"
                                        onChange={handleChange}
                                        helperText={touched.newPassword && errors.newPassword}
                                        error={Boolean(errors.newPassword && touched.newPassword)}
                                        InputProps={{
                                            // Add icon button to toggle password visibility
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}

                                        sx={{ mb: 3, width: "100%" }}
                                    />
                                </Grid>
                                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
                                    <TextField
                                        fullWidth
                                        type={showConfirmPassword ? "text" : "password"} // Toggle password visibility
                                        name="confirmPassword"
                                        size="small"
                                        label="Confirm Password"
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                        variant="outlined"
                                        onChange={handleChange}
                                        helperText={touched.confirmPassword && errors.confirmPassword}
                                        error={Boolean(errors.confirmPassword && touched.confirmPassword)}
                                        InputProps={{
                                            // Add icon button to toggle password visibility
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={{ mb: 3, width: "100%" }}
                                    />
                                </Grid>

                            </Grid>
                            <LoadingButton color="primary"
                                loading={loading}
                                sx={{ float: 'right', marginTop: 2 }} // Add styles for right alignment
                                variant="contained" type="submit">
                                <Icon>send</Icon>
                                <Span sx={{ pl: 1, textTransform: "capitalize" }}>SAVE</Span>
                            </LoadingButton>
                        </form>
                    )}
                </Formik>
            </Stack>
        </Container>
    )
};