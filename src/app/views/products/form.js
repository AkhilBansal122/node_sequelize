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

import { CustomSelect, headerValue, formDataheaderValue } from "app/components/custom/CommonComponent";
import { ADMIN_ACTIVE_SUB_CATEGORY_BY_CATEGORY_ID, ADMIN_ACTIVE_BRAND_STATUS, ADMIN_ACTIVE_SECTIONS_STATUS, ADMIN_PRODUCTS_CREATE, ADMIN_PRODUCTS_UPDATE, ADMIN_ACTIVE_CATEGORY_BY_SECTION_ID } from "apiurl";
import { axiosRequest } from "config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
    const [selectedCategoryValue, setSelectedCategoryValue] = useState('');
    const [selectedBrandValue, setSelectedBrandValue] = useState('');
    const [selectedSectionsValue, setSelectedSectionsValue] = useState('');
    const [selectedASubcategoryValue, setSelectedASubcategoryValue] = useState('');

    useEffect(() => {
        console.log(stateVal);
        setState({
            productId: stateVal.id ?? null,
            selectBrand: stateVal.brand_id ?? 'select Brand',
            selectSection: stateVal.section_id ?? 'select Section',
            selectOptions: stateVal.category_id ?? 'select Sections',
            selectSubCategory: stateVal.sub_category_id ?? 'select Sub Category',
            name: stateVal.name,
            meta_title: stateVal.meta_title,
            meta_description: stateVal.meta_description,
            meta_keywords: stateVal.meta_keywords,
            previewImage: stateVal.main_image,
            description: stateVal.description,

        });
        setSelectedCategoryValue(stateVal.category_id ?? 'select option');
        setSelectedBrandValue(stateVal.brand_id, "select Brand");
        setSelectedSectionsValue(stateVal.section_id, "select Section");
        setSelectedASubcategoryValue(stateVal.sub_category_id, "select sub category");

        if (stateVal.type === 'edit' && stateVal.section_id !== "select Section") {
            getActiveCategory(stateVal.section_id);
            getSectionData(stateVal.section_id);
            getCategorySelected(stateVal.sub_category_id);
        }
        getActiveCategory();
    }, [stateVal]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectActiveBrand, setselectActiveBrand] = useState([]);
    const [selectActiveSections, setselectActiveSections] = useState([]);
    const [selectActiveCategory, setselectActiveCategory] = useState([]);
    const [selectActiveSubCategory, setselectActiveSubCategory] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const [brandError, setBrandError] = useState(false);
    const [brandHelperText, setBrandHelperText] = useState('');
    const [sectionError, setSectionError] = useState(false);
    const [sectionHelperText, setSectionHelperText] = useState('');
    const [categoryError, setCategoryError] = useState(false);
    const [categoryHelperText, setCategoryHelperText] = useState('');
    const [subCategoryError, setSubCategoryError] = useState(false);
    const [subCategoryHelperText, setSubCategoryHelperText] = useState('');


    const getActiveCategory = async () => {
        try {
            const responseBrand = await axiosRequest(ADMIN_ACTIVE_BRAND_STATUS, {}, config);
            setselectActiveBrand(responseBrand.data.status === true ? responseBrand.data.data : []);
        } catch (errs) {
            setselectActiveBrand([]);
        }
        try {
            const responseSection = await axiosRequest(ADMIN_ACTIVE_SECTIONS_STATUS, {}, config);
            setselectActiveSections(responseSection.data.status === true ? responseSection.data.data : []);
        } catch (err) {
            setselectActiveSections([]);
        }
    }

    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };

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
            //  setLoading(true);
            event.persist();
            if (selectedBrandValue === 'select Brand' || selectedBrandValue === '') {
                setBrandError(true);
                setBrandHelperText("Please select a Brand");
            }
            else {
                setBrandError(false);
                setBrandHelperText("");
            }
            if (selectedSectionsValue === 'select Sections' || selectedSectionsValue === '') {
                setSectionError(true);
                setSectionHelperText("Please select a section");
            }
            else {
                setSectionError(false);
                setSectionHelperText("");
            }
            if (selectedCategoryValue === '' || selectedCategoryValue === 'select option') {
                setCategoryError(true);
                setCategoryHelperText("Please selct a category");
            }
            else {
                setCategoryError(false);
                setCategoryHelperText("");
            }
            if (selectedASubcategoryValue === 'select sub category' || selectedASubcategoryValue === '') {
                setSubCategoryError(true);
                setSubCategoryHelperText("Please select a sub category");
            }
            else {
                setSubCategoryError(false);
                setSubCategoryHelperText("");
            }


            if (selectedBrandValue !== 'select Brand' && selectedSectionsValue !== 'select Sections' && selectedCategoryValue !== 'select option' && selectedASubcategoryValue !== 'select sub category') {
                let data = {};


                data = {
                    id: id = state.productId,
                    brand_id: selectedBrandValue,
                    section_id: selectedSectionsValue,
                    category_id: selectedCategoryValue,
                    sub_category_id: selectedASubcategoryValue,
                    product_name: state.name, meta_description: state.meta_description,
                    meta_keywords: state.meta_keywords,
                    meta_title: state.meta_title,
                    main_image: selectedFile,
                    description: state.description
                };

                const conf = {
                    headers: formDataheaderValue()
                }
                try {
                    const response = await axiosRequest(id === null ? ADMIN_PRODUCTS_CREATE : ADMIN_PRODUCTS_UPDATE, data, conf);
                    if (response.data.status === true) {
                        navigate("/products-listing");
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

            // const response = await axiosRequest(id === null ? ADMIN_SUB_CATEGORY_CREATE : ADMIN_SUB_CATEGORY_UPDATE, data, config);
            // if (response.data.status === true) {
            //     navigate("/sub-category-listing");
            //     setLoading(false);
            // }
            // else {
            //     setLoading(false);
            // }
        } catch (error) {
            setLoading(false);
        }
    };


    const handleSelectSubCategoryChange = (event) => {
        if (event.target.value === 'select sub category' || event.target.value === '') {
            setSubCategoryError(true);
            setSubCategoryHelperText("Please select sub category");
        }
        else {
            setSubCategoryError(false);
            setSubCategoryHelperText("");
            setSelectedASubcategoryValue(event.target.value);
        }
    };
    const handleSelecBrandChange = (event) => {
        if (event.target.value === '' || event.target.value === 'select Brand') {
            setBrandError(true);
            setBrandHelperText('Please select a brand');
        } else {
            setBrandError(false);
            setBrandHelperText('');
            setSelectedBrandValue(event.target.value);
        }

    };
    const handleSelecSectionsChange = async (event) => {

        getSectionData(event.target.value);

    };
    const getSectionData = async (value) => {
        if (value === '' || value === 'select Sections') {
            setSectionError(true);
            setSectionHelperText('Please select a section');
        }
        else {
            setSectionError(false);
            setSectionHelperText('');

            try {
                const response = await axiosRequest(ADMIN_ACTIVE_CATEGORY_BY_SECTION_ID, { section_id: value }, config);
                setselectActiveCategory(response.data.status === true ? response.data.data : []);
            } catch (error) {
                setselectActiveCategory([]);
            }
            setSelectedSectionsValue(value);
        }
    }

    const handleSelectCategoryChange = async (event) => {
        getCategorySelected(event.target.value);
    };
    const getCategorySelected = async (value) => {
        if (value === '' || value === 'select option') {
            setCategoryError(true);
            setCategoryHelperText("Please selct category");
        }
        else {
            setCategoryError(false);
            setCategoryHelperText("");
            try {
                const response = await axiosRequest(ADMIN_ACTIVE_SUB_CATEGORY_BY_CATEGORY_ID, { category_id: value }, config);
                setselectActiveSubCategory(response.data.status === true ? response.data.data : []);
            } catch (error) {
                setselectActiveSubCategory([]);
            }
            setSelectedCategoryValue(value);
        }
    }

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <CustomSelect label="Brand"
                            value={selectedBrandValue}
                            onChange={handleSelecBrandChange}
                            items={selectActiveBrand}
                            defaultValue="select Brand"
                            error={brandError}
                            helperText={brandHelperText}
                        />
                        <CustomSelect
                            label="Section"
                            value={selectedSectionsValue}
                            onChange={handleSelecSectionsChange}
                            items={selectActiveSections}
                            defaultValue="select Sections"
                            error={sectionError}
                            helperText={sectionHelperText}

                        />
                        <CustomSelect
                            label="Category"
                            value={selectedCategoryValue}
                            onChange={handleSelectCategoryChange}
                            items={selectActiveCategory}
                            defaultValue="select option"
                            error={categoryError}
                            helperText={categoryHelperText}

                        />
                        <CustomSelect
                            label="Sub Category"
                            value={selectedASubcategoryValue}
                            onChange={handleSelectSubCategoryChange}
                            items={selectActiveSubCategory}
                            defaultValue="select sub category"
                            error={subCategoryError}
                            helperText={subCategoryHelperText}

                        />

                        <TextField
                            type="text"
                            name="name"
                            label="Enter Products Name"
                            onChange={handleChange}
                            value={state.name || ""}
                            autoComplete="off"
                            validators={["required"]}
                            errorMessages={["Product Name field is required"]}
                        />

                        <TextField
                            type="text"
                            autoComplete="off"
                            name="meta_keywords"
                            label="Enter Meta Keywords"
                            value={state.meta_keywords || ""}
                            onChange={handleChange}
                        />

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
                        <StyledTextarea
                            name="description"
                            autoComplete="off"
                            label="Enter Product Description"
                            value={state.description || ""}
                            onChange={handleChange}
                            multiline
                            rows={4} // Adjust the number of rows as needed
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
