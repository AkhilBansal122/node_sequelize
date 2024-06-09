import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";
import { useParams } from 'react-router-dom';
import { useState } from "react";


import { Breadcrumb } from "app/components";
import ProductColor from "./form";
import { useEffect } from "react";
import { ADMIN_PRODUCTS_COLOR_EDIT } from "apiurl";
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
        product_id: "Select Product",
        name: "",
    })

    const getEditRecord = async (id) => {

        const headers = headerValue();
        const config = {
            headers: headers
        };
        const data = { id: id };
        const response = await axiosRequest(ADMIN_PRODUCTS_COLOR_EDIT, data, config);

        if (response.data.status === true) {
            const result = response.data.data;
            console.log("::", result);
            setData({
                type: 'edit',
                id: result.id ?? null,
                product_id: result.product_id ?? "Select Product",
                name: result.name ?? "",
            });
        }
    }
    useEffect(() => {
        getEditRecord(id);
    }, [id]);



    return (<>
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Edit Products Color", path: `/products-color-edit/${id}` }, { name: "Products Color" }]} />
            </Box>
            <Stack spacing={3}>
                <ProductColor type={'edit'} id={id} stateVal={data} />
            </Stack>
        </Container>
    </>);
}