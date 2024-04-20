import { Button, Dialog, TextField, Card, Grid, styled, Box } from '@mui/material';
import React from 'react'

import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import * as Yup from "yup";
import { Formik } from "formik";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { InputTextField } from './CommonComponent';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
const ModalComponent = ({ isOpen, handleClose, initialValues }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });


    const ContentBox = styled("div")(({ theme }) => ({
        padding: 32,
        background: theme.palette.background.default
    }));
    const handleFormSubmit = (values) => {
        console.log(values);
    }
    // const initialValues = {
    //     name: "",
    //     meta_title: "",
    //     meta_description: "",
    //     meta_keywords: "",
    //     description: "",
    //     image: []
    // }
    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        const files = Array.from(event.target.files);
        console.log(files);
        setValues({ ...values, picture: files });
    };
    const [values, setValues] = useState(initialValues);

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required!"),
        meta_title: Yup.string().required("Meta title is required"),
        meta_description: Yup.string().required("Meta description is required"),
        meta_keywords: Yup.string().required("Meta keywords is required"),
        description: Yup.string().required("Description is required")

    });

    return (

        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add New Brand</DialogTitle>

            <DialogContent>
                <Card className="card">
                    <Grid item xs={12}>

                        <ContentBox>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                            >
                                {({ values, errors, touched, handleChange, setFieldValue, handleBlur, handleSubmit }) => (
                                    <form onSubmit={handleSubmit} >
                                        <InputTextField
                                            type="text"
                                            name="name"
                                            size="small"
                                            label="Enter Brand Name"
                                            onBlur={handleBlur}
                                            value={values.name}
                                            variant="outlined"
                                            onChange={handleChange}
                                            helperText={touched.name && errors.name}
                                            error={Boolean(errors.name && touched.name)}
                                            sx={{ mb: 3, width: "100%" }}
                                        />
                                        <InputTextField
                                            type="text"
                                            name="meta_title"
                                            size="small"
                                            label="Enter Meta Title"
                                            onBlur={handleBlur}
                                            value={values.meta_title}
                                            variant="outlined"
                                            onChange={handleChange}
                                            helperText={touched.meta_title && errors.meta_title}
                                            error={Boolean(errors.meta_title && touched.meta_title)}
                                            sx={{ mb: 3, width: "100%" }}
                                        />

                                        <TextField
                                            type="text"
                                            name="meta_description"
                                            size="small"
                                            label="Enter Meta Description"
                                            onBlur={handleBlur}
                                            value={values.meta_description}
                                            variant="outlined"
                                            onChange={handleChange}
                                            helperText={touched.meta_description && errors.meta_description}
                                            error={Boolean(errors.meta_description && touched.meta_description)}
                                            sx={{ mb: 3, width: "100%" }}
                                        />
                                        <TextField
                                            type="text"
                                            name="meta_keywords"
                                            size="small"
                                            label="Enter Meta Keyword"
                                            onBlur={handleBlur}
                                            value={values.meta_keywords}
                                            variant="outlined"
                                            onChange={handleChange}
                                            helperText={touched.meta_keywords && errors.meta_keywords}
                                            error={Boolean(errors.meta_keywords && touched.meta_keywords)}
                                            sx={{ mb: 3, width: "100%" }}
                                        />

                                        <Button
                                            component="label"
                                            role={undefined}
                                            variant="contained"
                                            tabIndex={-1}
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Picture
                                            <VisuallyHiddenInput name="picture" type="file" accept="image/*" onChange={(event) => setFieldValue('image', event.currentTarget.files)} />
                                        </Button>

                                        {
                                            initialValues.image.length > 0 ? <Stack direction="row" spacing={2}> <Avatar src={initialValues.image} /></Stack> : ''
                                        }
                                        <div style={{ marginTop: '16px', textAlign: 'right' }}>
                                            <Button onClick={handleClose} variant="outlined" color="error" style={{ marginRight: '8px' }}>
                                                Cancel
                                            </Button>

                                            <LoadingButton
                                                type="submit"

                                                loading={loading}
                                                variant="contained"
                                                color="primary"
                                            >
                                                Save
                                            </LoadingButton>

                                        </div>
                                    </form>
                                )}

                            </Formik>

                        </ContentBox>

                    </Grid>

                </Card>
            </DialogContent>


        </Dialog>
    );
}

export default ModalComponent;
