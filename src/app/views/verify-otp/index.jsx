import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Grid, styled, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import useAuth from "app/hooks/useAuth";
import * as Yup from "yup";
import { Formik } from "formik";

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
  otp: Yup.string()
    .matches(/^[0-9]{6}$/, "Invalid OTP")
    .required("OTP is required!")
});
export default function VerifyOTP() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { verifyotp, forgotPasswordEmail } = useAuth();

  const initialValues = {
    otp: ""
  };

  const handleFormSubmit = async (values) => {
    setLoading(true);
    try {
      await verifyotp(values.otp, forgotPasswordEmail);
      navigate("/reset-password");
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
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
                      type="text"
                      name="otp"
                      size="small"
                      label="Enter OTP"
                      onBlur={handleBlur}
                      value={values.otp}
                      variant="outlined"
                      onChange={handleChange}
                      helperText={touched.otp && errors.otp}
                      error={Boolean(errors.otp && touched.otp)}
                      sx={{ mb: 3, width: "100%" }}
                    />

                    <LoadingButton
                      type="submit"
                      fullWidth
                      loading={loading}
                      variant="contained"
                      color="primary"
                    >
                      Verify OTP
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
