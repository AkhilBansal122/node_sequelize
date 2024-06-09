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
import { ADMIN_ACTIVE_PRODUCTS, ADMIN_PRODUCTS_SIZE_CREATE, ADMIN_PRODUCTS_SIZE_UPDATE, ADMIN_ACTIVE_PRODUCT_COLOR_BY_PRODUCT_ID } from "apiurl";
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

const ProductSize = ({ stateVal, id }) => {
    const headers = headerValue();
    const config = {
        headers: headers
    };

    const [state, setState] = useState({});
    const [selectedProductValue, setSelectedProductValue] = useState('');
    const [selectedProductColorValue, setSelectedProductColorValue] = useState('');

    useEffect(() => {
        setState({
            type: stateVal.type,
            productId: stateVal.id ?? null,
            selectProduct: stateVal.product_id ?? 'Select Product',
            selectProductColor: stateVal.product_id ?? 'Select COlor',
            name: stateVal.name,
            qty: stateVal.qty,
            sale_price: stateVal.sale_price,
            pid: stateVal.pid

        });
        setSelectedProductValue(stateVal.product_id, "Select Product");
        setSelectedProductColorValue(stateVal.color_id, "Select Color");

        if (stateVal.type === 'edit' && stateVal.product_id !== "Select Product") {
            getActiveProduct(stateVal.product_id);
        }
        else {
            getActiveProduct();
        }
        if (stateVal.type === 'edit' && stateVal.color_id !== "Select Color") {
            getActiveProductColor(stateVal.product_id);
        }
        else {
            getActiveProductColor();
        }


    }, [stateVal]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectActiveProduct, setselectActiveProduct] = useState([]);

    const [selectActiveProductColor, setselectActiveProductColor] = useState([]);
    const [brandError, setProductError] = useState(false);
    const [productColorError, setProductColorError] = useState(false);

    const [productQtyError, setProductQtyError] = useState(false);
    const [productSalePriceError, setProductSalePriceError] = useState(false);

    const [brandHelperText, setProductHelperText] = useState('');
    const [productColorHelperText, setProductColorHelperText] = useState('');

    const [qtyHelperText, setProductQtyHelperText] = useState('');
    const [productSalePriceHelperText, setProductSalePriceHelperText] = useState('');

    const [product_id, setproduct_id] = useState();

    const getActiveProduct = async (product_id) => {
        try {
            setproduct_id(product_id)

            const responseBrand = await axiosRequest(ADMIN_ACTIVE_PRODUCTS, {}, config);
            setselectActiveProduct(responseBrand.data.status === true ? responseBrand.data.data : []);
        } catch (errs) {
            setselectActiveProduct([]);
        }

    }
    const getActiveProductColor = async (product_id) => {
        console.log(":", product_id);
        try {
            const headers = headerValue();
            const config = {
                headers: headers
            };
            const data = { product_id: product_id };
            const responseBrand = await axiosRequest(ADMIN_ACTIVE_PRODUCT_COLOR_BY_PRODUCT_ID, data, config);
            console.log(responseBrand.data.data);
            setselectActiveProductColor(responseBrand.data.status === true ? responseBrand.data.data : []);
        } catch (errs) {
            setselectActiveProductColor([]);
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
            if (selectedProductColorValue === 'Select Color' || selectedProductColorValue === '') {
                productColorError(true);
                setProductColorHelperText("Please select a product");
            }
            else {
                productColorError(false);
                setProductColorHelperText("");
            }
            if (state.qty === 0 || state.qty === '') {
                setProductQtyError(true);
                setProductQtyHelperText("Please enter product qty");
            }
            else {
                setProductQtyError(false);
                setProductQtyHelperText("");
            }
            if (state.sale_price === 0 || state.sale_price === '') {
                setProductSalePriceError(true);
                setProductSalePriceHelperText("Please enter product qty");
            }
            else {
                setProductSalePriceError(false);
                setProductSalePriceHelperText("");
            }


            if (selectedProductValue !== 'Select Product' && selectedProductColorValue === 'Select Color' && state.name.length > 0 && state.qty !== 0 && state.sale_price !== 0) {
                let data = {};


                data = {
                    id: id = state.productId,
                    product_id: selectedProductValue,
                    color_id: selectedProductColorValue,
                    name: state.name,
                    qty: state.qty,
                    sale_price: state.sale_price,

                };
                const conf = {
                    headers: headerValue()
                }
                try {
                    const response = await axiosRequest(id === null ? ADMIN_PRODUCTS_SIZE_CREATE : ADMIN_PRODUCTS_SIZE_UPDATE, data, conf);
                    if (response.data.status === true) {
                        navigate("/products-size-listing");
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
            getActiveProductColor(event.target.value);
        }
    }
    const handleSeleProductColorChange = (event) => {
        if (event.target.value === '' || event.target.value === 'Select Color') {
            setProductColorError(true);
            setProductColorHelperText('Please select a color');
        } else {
            setProductColorError(false);
            setProductColorHelperText('');
            setSelectedProductColorValue(event.target.value);
        }
    }

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
                        <CustomSelect label="Color"
                            value={selectedProductColorValue}
                            onChange={handleSeleProductColorChange}
                            items={selectActiveProductColor}
                            defaultValue="Select Color"
                            error={productColorError}
                            helperText={productColorHelperText}
                        />

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="number"
                            name="qty"
                            label="Enter Products Qty"
                            onChange={handleChange}
                            value={state.qty}
                            autoComplete="off"

                            validators={["required"]}
                            errorMessages={[productQtyError]}
                        />

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="number"
                            name="sale_price"
                            label="Enter Products Sale Price"
                            onChange={handleChange}
                            value={state.sale_price}
                            autoComplete="off"
                            validators={["required"]}
                            errorMessages={productSalePriceHelperText}
                        />

                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            type="text"
                            name="name"
                            label="Enter Products Size Name"
                            onChange={handleChange}
                            value={state.name || ""}
                            autoComplete="off"
                            validators={["required"]}
                            errorMessages={["Product Size Name field is required"]}
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

export default ProductSize;