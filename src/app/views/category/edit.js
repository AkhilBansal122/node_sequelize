import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useState } from "react";


import { Breadcrumb } from "app/components";
import SectionsForm from "./form";
import { useEffect } from "react";
import { ADMIN_SECTIONS_EDIT } from "apiurl";
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
        meta_keywords: "",
    })

    const getEditRecord = async (id) => {

        const headers = headerValue();
        const config = {
            headers: headers
        };
        const data = { id: id };
        const response = await axiosRequest(ADMIN_SECTIONS_EDIT, data, config);

        if (response.data.status === true) {
            const result = response.data.data;
            console.log(result);
            setData({
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
                <Breadcrumb routeSegments={[{ name: "Edit Sections", path: `/sections-edit/${id}` }, { name: "Sections" }]} />
            </Box>
            <Stack spacing={3}>
                <SectionsForm id={id} stateVal={data} />
            </Stack>
        </Container>
    </>);
}