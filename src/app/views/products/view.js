import { Stack } from "@mui/material";
import { Box, styled, Typography, Paper, Grid } from "@mui/material";
import { ADMIN_PRODUCTS_VIEW } from "apiurl"; // You need to define this constant or import it correctly
import { Breadcrumb, SimpleCard } from "app/components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { axiosRequest } from "config";
import { headerValue } from "app/components/custom/CommonComponent";
// STYLED COMPONENTS
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
}));

const ProductDetails = ({ product }) => {
    console.log(product);
    return (
        <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom>
                        Brand Name: {product.brandName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Section Name: {product.sectionName}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Category Name: {product.category}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Sub Category Name: {product.subCategory}
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" gutterBottom>
                        Product Name: {product.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Main Image: {product.mainImage}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        Description: {product.description}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default function View() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Assuming you have a function to fetch product details from API
        const fetchProductDetails = async () => {
            try {
                const headers = headerValue();
                const config = {
                    headers: headers
                };
                const data = { id: id };
                const response = await axiosRequest(ADMIN_PRODUCTS_VIEW, data, config);
                console.log("::", response);
                if (response.data.status === true) {
                    const result = response.data.data;
                    console.log(result);
                    setProduct({
                        brandName: result.Brand.name,
                        sectionName: result.Section.name,
                        category: result.Category.name,
                        subCategory: result.SubCategory.name,
                        name: result.name,
                        mainImage: result.main_image,
                        description: result.description,
                    })
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();

    }, [id]);

    return (
        <>
            <Container>
                <Box className="breadcrumb">
                    <Breadcrumb routeSegments={[{ name: "View Product", path: "/products-listing" }, { name: "View" }]} />
                </Box>
                <SimpleCard title="View Products">
                    <Stack spacing={3}>
                        {product && <ProductDetails product={product} />}
                    </Stack>
                </SimpleCard>
            </Container>
        </>
    );
}
