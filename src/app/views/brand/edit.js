import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useState } from "react";


import { Breadcrumb, SimpleCard } from "app/components";
import BrandForm from "./form";
import { useEffect } from "react";
import { ADMIN_BRAND_EDIT } from "apiurl";
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
        name: "",
        meta_title: "",
        meta_description: "",
        meta_keyword: "",
        image: null
    })

    const getEditRecord = async (id) => {

        const headers = headerValue();
        const config = {
            headers: headers
        };
        const data = { id: id };
        const response = await axiosRequest(ADMIN_BRAND_EDIT, data, config);

        if (response.data.status === true) {
            const result = response.data.data;

            setData({
                name: result.name ?? '',
                meta_title: result.meta_title ?? '',
                meta_description: result.meta_description ?? '',
                meta_keyword: result.meta_keywords ?? '',
                image: result.brandImage
            });
        }
    }
    useEffect(() => {
        getEditRecord(id);
    }, [id]);



    return (<>
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Edit Brand", path: `/brand-edit/${id}` }, { name: "Brand" }]} />
            </Box>
            <SimpleCard title="Edit Brand">
                <Stack spacing={3}>
                    <BrandForm id={id} stateVal={data} />
                </Stack>
            </SimpleCard>
        </Container>
    </>);
}