import { Stack } from "@mui/material";
import { Box, styled } from "@mui/material";

import { Breadcrumb, SimpleCard } from "app/components";
import SectionsForm from "./form";
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
                <Breadcrumb routeSegments={[{ name: "Add New Category", path: "/category-create" }, { name: "Category" }]} />
            </Box>
            <SimpleCard title="Add New Category">
                <Stack spacing={3}>
                    <SectionsForm id={null} stateVal={{
                        section_id: "select option",
                        name: "",
                        meta_title: "",
                        meta_description: "",
                        meta_keywords: "",
                    }} />
                </Stack>
            </SimpleCard>
        </Container>
    </>);
}