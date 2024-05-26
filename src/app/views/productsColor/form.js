import {
    Grid,
    Icon,
    styled,
} from "@mui/material";

import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { LoadingButton } from "@mui/lab";

import { CustomSelect, headerValue, formDataheaderValue } from "app/components/custom/CommonComponent";
import { ADMIN_ACTIVE_PRODUCTS, ADMIN_PRODUCTS_COLOR_CREATE, ADMIN_PRODUCTS_COLOR_UPDATE } from "apiurl";
import { axiosRequest } from "config";
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

const ProductForm = ({ stateVal, id }) => {
    const headers = headerValue();
    const config = {
        headers: headers
    };

    const [state, setState] = useState({});
    const [selectedProductValue, setSelectedProductValue] = useState('');

    useEffect(() => {

        setState({
            productId: stateVal.id ?? null,
            selectBrand: stateVal.product_id ?? 'Select Product',
            name: stateVal.name,
        });
        setSelectedProductValue(stateVal.product_id, "Select Product");

        if (stateVal.type === 'edit' && stateVal.product_id !== "Select Product") {
            getActiveProduct(stateVal.product_id);
        }
        else {
            getActiveProduct();
        }


    }, [stateVal]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectActiveProduct, setselectActiveProduct] = useState([]);
    const [brandError, setProductError] = useState(false);
    const [brandHelperText, setProductHelperText] = useState('');


    const getActiveProduct = async () => {
        try {
            const responseBrand = await axiosRequest(ADMIN_ACTIVE_PRODUCTS, {}, config);
            setselectActiveProduct(responseBrand.data.status === true ? responseBrand.data.data : []);
        } catch (errs) {
            setselectActiveProduct([]);
        }

    }

    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        try {
            event.persist();
            if (selectedProductValue === 'Select Product' || selectedProductValue === '') {
                setProductError(true);
                setProductHelperText("Please select a product");
            }
            else {
                setProductError(false);
                setProductHelperText("");
            }


            if (selectedProductValue !== 'Select Product') {
                let data = {};


                data = {
                    id: id = state.productId,
                    product_id: selectedProductValue,
                    name: state.name,
                };
                console.log("::", data);
                const conf = {
                    headers: headerValue()
                }
                try {

                    console.log(data);
                    const response = await axiosRequest(id === null ? ADMIN_PRODUCTS_COLOR_CREATE : ADMIN_PRODUCTS_COLOR_UPDATE, data, conf);
                    if (response.data.status === true) {
                        navigate("/products-color-listing");
                        setLoading(false);
                    }
                    else {
                        setLoading(false);
                    }
                } catch (error) {
                    // Handle errors from axios request
                    console.error("Error:", error);
                    // You can set an error state here or handle the error in another way
                }
            }
            else { setLoading(false); }
        } catch (error) {
            setLoading(false);
        }
    };


    const handleSeleProductChange = (event) => {
        if (event.target.value === '' || event.target.value === 'Select Product') {
            setProductError(true);
            setProductHelperText('Please select a product');
        } else {
            setProductError(false);
            setProductHelperText('');
            setSelectedProductValue(event.target.value);
        }
    };

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <CustomSelect label="Product"
                            value={selectedProductValue}
                            onChange={handleSeleProductChange}
                            items={selectActiveProduct}
                            defaultValue="Select Product"
                            error={brandError}
                            helperText={brandHelperText}
                        />


                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="name"
                            label="Enter Products Color Name"
                            onChange={handleChange}
                            value={state.name || ""}
                            autoComplete="off"
                            validators={["required"]}
                            errorMessages={["Product Color Name field is required"]}
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
        </div >
    );
};

export default ProductForm;