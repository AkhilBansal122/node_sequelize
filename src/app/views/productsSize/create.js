import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";

import { Breadcrumb } from "app/components";
import ProductSize from "./form";
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
                <Breadcrumb routeSegments={[{ name: "Add New Product Size", path: "/products-color-size" }, { name: "Products Size" }]} />
            </Box>
            <SimpleCard title="Add New Product Size">
                <Stack spacing={3}>
                    <ProductSize id={null} stateVal={{
                        product_id: "Select Product",
                        color_id: "Select Color",
                        name: "",
                        pid: 0,
                        type: 'add',
                        id: null,
                        qty: 0,
                        sale_price: 0,
                    }} />
                </Stack>
            </SimpleCard>
        </Container>
    </>);
}