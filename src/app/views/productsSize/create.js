import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";

import { Breadcrumb } from "app/components";
import SectionsForm from "./form";
import { SimpleCard } from "app/components";

// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
}));

export default function create() {
    return (<>
        <Container>
            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Add New Product Color", path: "/products-color-create" }, { name: "Products Color" }]} />
            </Box>
            <SimpleCard title="Add New Product Color">
                <Stack spacing={3}>
                    <SectionsForm id={null} stateVal={{
                        type: 'add',
                        id: null,
                        product_id: "Select Product",
                        name: "",
                    }} />
                </Stack>
            </SimpleCard>
        </Container>
    </>);
}