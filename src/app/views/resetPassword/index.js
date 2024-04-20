import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid, styled, TextField, InputAdornment, IconButton } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "app/hooks/useAuth";
import * as Yup from "yup";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// STYLED COMPONENTS
const StyledRoot = styled("div")(() => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A2038",
    minHeight: "100vh !important",

    "& .card": {
        maxWidth: 800,
        margin: "1rem",
        borderRadius: 12
    },

    ".img-wrapper": {
        display: "flex",
        padding: "2rem",
        alignItems: "center",
        justifyContent: "center"
    }
}));

const ContentBox = styled("div")(({ theme }) => ({
    padding: 32,
    background: theme.palette.background.default
}));
// form field validation schema
const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password is required")
});

export default function ResetPassword() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle password visibility

    const { resetPassword, forgotPasswordEmail } = useAuth(); // Assuming you have a resetPassword function from useAuth
    const handleToggleconfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const initialValues = {
        newPassword: "",
        confirmPassword: ""
    };

    const handleFormSubmit = async (values) => {

        setLoading(true);
        try {
            await resetPassword(values.newPassword, forgotPasswordEmail); // Call the resetPassword API endpoint
            // Assuming the API call was successful
            navigate("/"); // Navigate to a success page
        } catch (error) {
            // Handle error
            console.error("Error resetting password:", error);
            // Display an error message to the user
        }
        setLoading(false);
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <StyledRoot>
            <Card className="card">
                <Grid container>
                    <Grid item xs={12}>
                        <div className="img-wrapper">
                            <img width="300" src="/assets/images/illustrations/dreamer.svg" alt="" />
                        </div>

                        <ContentBox>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit}>
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
                                        <TextField
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
                                                        <IconButton onClick={handleToggleconfirmPasswordVisibility} edge="end">
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}

                                            sx={{ mb: 3, width: "100%" }}
                                        />

                                        <LoadingButton
                                            type="submit"
                                            fullWidth
                                            loading={loading}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Reset Password
                                        </LoadingButton>

                                        <Button
                                            fullWidth
                                            color="primary"
                                            variant="outlined"
                                            onClick={() => navigate(-1)}
                                            sx={{ mt: 2 }}
                                        >
                                            Go Back
                                        </Button>
                                    </form>

                                )}
                            </Formik>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </StyledRoot>
    );
}
