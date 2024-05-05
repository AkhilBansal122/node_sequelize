import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useState } from "react";


import { Breadcrumb } from "app/components";
import CategorysForm from "./form";
import { useEffect } from "react";
import { ADMIN_PRODUCTS_EDIT, ADMIN_SUB_CATEGORY_EDIT, BASE_IMAGE_URL } from "apiurl";
import { headerValue } from "app/components/custom/CommonComponent";
import { axiosRequest } from "config";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
}));


export default function Edit() {
    const { id } = useParams();

    const [data, setData] = useState({
        brand_id: "select Brand",
        section_id: "select Sections",
        category_id: "select option",
        sub_category_id: "select sub category",
        name: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        main_image: "",
        description: ""
    })

    const getEditRecord = async (id) => {

        const headers = headerValue();
        const config = {
            headers: headers
        };
        const data = { id: id };
        const response = await axiosRequest(ADMIN_PRODUCTS_EDIT, data, config);

        if (response.data.status === true) {
            const result = response.data.data;
            setData({
                type: 'edit',
                id: result.id ?? null,
                brand_id: result.brand_id ?? "select Brand",
                section_id: result.section_id ?? "select Sections",
                category_id: result.category_id ?? "select option",
                sub_category_id: result.subcategory_id ?? "select sub category",
                name: result.name ?? "",
                meta_title: result.meta_title ?? "",
                meta_description: result.meta_description ?? "",
                meta_keywords: result.meta_keywords ?? "",
                main_image: BASE_IMAGE_URL + result.main_image ?? "",
                description: result.description ?? ""
            });
        }
    }
    useEffect(() => {
        getEditRecord(id);
    }, [id]);



    return (<>
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Edit Products", path: `/products-edit/${id}` }, { name: "Products" }]} />
            </Box>
            <Stack spacing={3}>
                <CategorysForm id={id} stateVal={data} />
            </Stack>
        </Container>
    </>);
}