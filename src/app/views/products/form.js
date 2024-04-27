
import {
    Grid,
    Icon,
    styled,

} from "@mui/material";

import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { LoadingButton } from "@mui/lab";

import { headerValue } from "app/components/custom/CommonComponent";
import { ADMIN_SUB_CATEGORY_CREATE, ADMIN_ACTIVE_CATEGORY_STATUS, ADMIN_ACTIVE_BRAND_STATUS, ADMIN_ACTIVE_SECTIONS_STATUS, ADMIN_SUB_CATEGORY_UPDATE, ADMIN_ACTIVE_CATEGORY_BY_SECTION_ID } from "apiurl";
import { axiosRequest } from "config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SelectOption } from "app/components/custom/CommonComponent";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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

const CategorysForm = ({ stateVal, id }) => {
    const [state, setState] = useState({});
    const [selectedCategoryValue, setSelectedCategoryValue] = useState('');
    const [selectedBrandValue, setSelectedBrandValue] = useState('');
    const [selectedSectionsValue, setSelectedSectionsValue] = useState('');

    useEffect(() => {
        setState({
            selectBrand: stateVal.brand_id ?? 'select Brand',
            selectSection: stateVal.section_id ?? 'select Section',
            selectOptions: stateVal.category_id ?? 'select Sections',
            name: stateVal.name,
            meta_title: stateVal.meta_title,
            meta_description: stateVal.meta_description,
            meta_keywords: stateVal.meta_keywords,
        });
        setSelectedCategoryValue(stateVal.category_id ?? 'select option');
        setSelectedBrandValue(stateVal.brand_id, "select Brand");
        setSelectedSectionsValue(stateVal.section_id, "select Section");
        getActiveCategory();
    }, [stateVal]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [selectActiveBrand, setselectActiveBrand] = useState([]);
    const [selectActiveSections, setselectActiveSections] = useState([]);

    const [selectActiveCategory, setselectActiveCategory] = useState([]);

    const getActiveCategory = async () => {
        const headers = headerValue();

        const config = {
            headers: headers
        };
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

    const handleSubmit = async (event) => {
        try {
            setLoading(true);
            event.persist();
            const headers = headerValue();

            const config = {
                headers: headers
            };
            const data = { category_id: selectedCategoryValue, id, name: state.name, meta_description: state.meta_description, meta_keywords: state.meta_keywords, meta_title: state.meta_title };
            const response = await axiosRequest(id === null ? ADMIN_SUB_CATEGORY_CREATE : ADMIN_SUB_CATEGORY_UPDATE, data, config);
            if (response.data.status === true) {
                navigate("/sub-category-listing");
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    const handleSelectChange = (event) => {
        setSelectedCategoryValue(event.target.value);
        state.selectOptions = event.target.value;
    };
    const handleSelecBrandChange = (event) => {
        setSelectedBrandValue(event.target.value);
    };
    const handleSelecSectionsChange = async (event) => {
        const headers = headerValue();

        const config = {
            headers: headers
        };
        try {
            const response = await axiosRequest(ADMIN_ACTIVE_CATEGORY_BY_SECTION_ID, { section_id: event.target.value }, config);
            setselectActiveCategory(response.data.status === true ? response.data.data : []);
        } catch (error) {
            setselectActiveCategory([]);
        }
        setSelectedSectionsValue(event.target.value);
    };

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>

                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <FormControl sx={{ mb: 1 }} fullWidth>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="select Brand"
                                value={selectedBrandValue}
                                onChange={handleSelecBrandChange}
                                required>

                                <MenuItem value="select Brand"><em>Select Brand</em></MenuItem>
                                {selectActiveBrand.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ mb: 1 }} fullWidth>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="select Section"
                                value={selectedSectionsValue}
                                onChange={handleSelecSectionsChange}
                                required>

                                <MenuItem value="select Sections"><em>Select Section</em></MenuItem>
                                {selectActiveSections.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl sx={{ mb: 1 }} fullWidth>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                label="select Category"
                                value={selectedCategoryValue}
                                onChange={handleSelectChange}
                                required>

                                <MenuItem value="select option"><em>Select Category</em></MenuItem>
                                {selectActiveCategory.map((item, index) => (
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <TextField
                            type="text"
                            name="name"
                            label="Enter Sub Category Name"
                            onChange={handleChange}
                            value={state.name || ""}
                            autoComplete="off"
                            validators={["required"]}
                            errorMessages={["Sub Category Name field is required"]}
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

export default CategorysForm;
