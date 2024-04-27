import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";

import { Breadcrumb } from "app/components";
import BrandForm from "./form";
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
                <Breadcrumb routeSegments={[{ name: "Add New Brand", path: "/brand-create" }, { name: "Brand" }]} />
            </Box>
            <SimpleCard title="Add Brand">
                <Stack spacing={3}>
                    <BrandForm id={null} stateVal={{
                        name: "",
                        meta_title: "",
                        meta_description: "",
                        meta_keyword: "",
                        image: null
                    }} />
                </Stack>
            </SimpleCard>
        </Container>
    </>);
}