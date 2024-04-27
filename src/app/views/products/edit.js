import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useState } from "react";


import { Breadcrumb } from "app/components";
import CategorysForm from "./form";
import { useEffect } from "react";
import { ADMIN_SUB_CATEGORY_EDIT } from "apiurl";
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
        category_id: '',
        name: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
    })

    const getEditRecord = async (id) => {

        const headers = headerValue();
        const config = {
            headers: headers
        };
        const data = { id: id };
        const response = await axiosRequest(ADMIN_SUB_CATEGORY_EDIT, data, config);

        if (response.data.status === true) {
            const result = response.data.data;
            setData({
                brand_id: result.category_id ?? '',
                sections_id: result.category_id ?? '',
                category_id: result.category_id ?? '',
                name: result.name ?? '',
                meta_title: result.meta_title ?? '',
                meta_description: result.meta_description ?? '',
                meta_keywords: result.meta_keywords ?? '',
            });
        }
    }
    useEffect(() => {
        getEditRecord(id);
    }, [id]);



    return (<>
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Edit Sub Category", path: `/sub-category-edit/${id}` }, { name: "Sub Category" }]} />
            </Box>
            <Stack spacing={3}>
                <CategorysForm id={id} stateVal={data} />
            </Stack>
        </Container>
    </>);
}