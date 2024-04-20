
import {
    Grid,
    Icon,
    styled,
    Button,
    Avatar
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { LoadingButton } from "@mui/lab";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { formDataheaderValue } from "app/components/custom/CommonComponent";
import { ADMIN_BRAND_CREATE, ADMIN_BRAND_EDIT, ADMIN_BRAND_UPDATE } from "apiurl";
import { axiosRequest } from "config";
import Message from "app/components/Message";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px"
}));

const StyledTextarea = styled(TextValidator)`
    width: 100%;
    margin-bottom: 16px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
`;

const SimpleForm = ({ stateVal, id }) => {
    const [state, setState] = useState({});

    useEffect(() => {
        setState({
            name: stateVal.name,
            meta_title: stateVal.meta_title,
            meta_description: stateVal.meta_description,
            meta_keyword: stateVal.meta_keyword,
            image: stateVal.image,
            previewImage: stateVal.image
        });
    }, [stateVal]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);


    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };


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

    // const {
    //     name,
    //     meta_title,
    //     meta_description,
    //     meta_keyword,
    //     image
    // } = state;

    const handleFileChange = (event) => {
        const file = event.target.files[0]; // Get the first file if multiple files are selected
        if (file) {
            state.image = file;
            setState({
                ...state,
                image: file
            });
            setSelectedFile(file);
        }

    };
    const handleSubmit = async (event) => {
        try {
            setLoading(true);
            event.persist();
            state.image = selectedFile;
            const headers = formDataheaderValue();

            const config = {
                headers: headers
            };
            const data = { id: id, name: state.name, meta_description: state.meta_description, meta_keyword: state.meta_keyword, meta_title: state.meta_title, image: selectedFile };
            const response = await axiosRequest(id === null ? ADMIN_BRAND_CREATE : ADMIN_BRAND_UPDATE, data, config);
            if (response.data.status === true) {
                navigate("/brand-listing");
                setLoading(false);
            }
        } catch (error) {
            //            <Message message={error.response.data.message} type={"fail"} isOpen={true} successMessage={false} failMessage={true} />
            setLoading(false);
            console.log('An error occurred:', error.response.data.message);
        }
    };


    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>


                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                        <TextField
                            type="text"
                            name="name"
                            label="Enter Brand Name"
                            onChange={handleChange}
                            value={state.name || ""}
                            autoComplete="off"
                            validators={["required"]}
                            errorMessages={["Brand Name field is required"]}

                        />

                        <TextField
                            type="text"
                            autoComplete="off"
                            name="meta_keyword"
                            label="Enter Meta Keywords"
                            value={state.meta_keyword || ""}
                            onChange={handleChange}
                        />
                        <Button
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                        >
                            Upload file
                            <VisuallyHiddenInput name="picture" type="file" accept="image/*" onChange={handleFileChange} />
                        </Button>
                        {state.previewImage ? <Avatar src={state.previewImage} sx={{ cursor: "pointer" }} /> : null}
                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="meta_title"
                            autoComplete="off"
                            label="Enter Meta Title"
                            value={state.meta_title || ""}
                            onChange={handleChange}
                        />
                        <StyledTextarea
                            name="meta_description"
                            autoComplete="off"
                            label="Enter Meta Description"
                            value={state.meta_description || ""}
                            onChange={handleChange}
                            multiline
                            rows={4} // Adjust the number of rows as needed
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
            </ValidatorForm>
        </div>
    );
};

export default SimpleForm;
