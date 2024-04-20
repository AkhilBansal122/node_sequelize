import { useNavigate } from "react-router-dom";

import {
    Grid,
    Box,
    Table,
    styled,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Avatar,
    Button,
} from "@mui/material";


import { useState } from "react";
import { Breadcrumb } from "app/components";


import { SimpleCard } from "app/components";
import ModalComponent from "app/components/custom/ModalComponent";
import { axiosRequest } from "../../../config";
import { useEffect } from "react";
import { ADMIN_BRAND_LIST, ADMIN_BRAND_STATUS } from "apiurl";
import { ActiveInactiveComponent, EditButton, SwitchActiveInactive, headerValue } from "app/components/custom/CommonComponent";

import { CuustomPagination } from "app/components/custom/CommonComponent";
const Container = styled("div")(({ theme }) => ({
    margin: "30px",
    [theme.breakpoints.down("sm")]: { margin: "16px" },
    "& .breadcrumb": {
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: { marginBottom: "16px" }
    }
}));





export default function ChangePassword() {
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
        getBrandList(newPage * rowsPerPage, rowsPerPage);

    };
    const [total_record_count, set_total_record_count] = useState(0);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        getBrandList(0, event.target.value);
        setPage(0);
    };
    const handleSwitchChange = (event, index, id) => {
        statusChange(id, event.target.checked === true ? 1 : 0);
    };

    const [brandlist, setBrandList] = useState([]);
    const [initialValues, setinitialValues] = useState({
        name: "",
        meta_title: "",
        meta_description: "",
        meta_keywords: "",
        description: "",
        image: []
    });

    const getBrandList = async (page, rowsPerPage) => {

        const headers = headerValue();
        const config = {
            headers: headers
        };
        const data = { offset: page, limit: rowsPerPage };
        const response = await axiosRequest(ADMIN_BRAND_LIST, data, config);


        if (response.data.status === true) {
            set_total_record_count(response.data.total_record);

            setBrandList(response.data.data);
        }
        else {
            setBrandList([]);
        }
    }
    useEffect(() => {
        getBrandList(page, rowsPerPage);
    }, []);
    const statusChange = async (id, status) => {

        const headers = headerValue();
        const config = {
            headers: headers
        };
        const data = { id: id, status: status };
        const response = await axiosRequest(ADMIN_BRAND_STATUS, data, config);
        if (response.data.status === true) {
            getBrandList(page, rowsPerPage);
        }
    }
    const handleEditClick = (id) => {
        const editRecord = brandlist.filter((item) => item.id === id)[0];
        initialValues.name = editRecord.fullName;
        initialValues.meta_title = editRecord.meta_title;
        initialValues.meta_description = editRecord.meta_description;
        initialValues.meta_keywords = editRecord.meta_keywords;
        initialValues.image = editRecord.image;

    }

    return (
        <Container>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Brand", path: "/brand-listing" }, { name: "Home" }]} />
            </Box>
            <SimpleCard title="Brand">
                <Button variant="contained" size={"small"} style={{ float: 'right' }} color="primary" onClick={() => { navigate('/brand-create') }}>
                    Add New Record
                </Button>
                <Box width="100%" overflow="auto">
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Table >
                                <TableHead style={{ color: 'white', alignItem: 'center', fontWeight: 'bold' }}>
                                    <TableRow>
                                        <TableCell align="left">Sr No</TableCell>
                                        <TableCell style={{ fontWeight: 'bold' }} align="left">Image</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="center">Active/InActive</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {brandlist
                                        .map((subscriber, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <Avatar src={subscriber.brandImage} />
                                                </TableCell>
                                                <TableCell align="left">{subscriber.fullName}</TableCell>
                                                <TableCell align="right">
                                                    <ActiveInactiveComponent status={subscriber.status} />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <SwitchActiveInactive
                                                        checked={subscriber.status === 1}
                                                        handleChange={(event) => handleSwitchChange(event, index, subscriber.id)} />
                                                </TableCell>
                                                <TableCell align="right" style={{ float: 'right !importent' }}>
                                                    <Grid container spacing={1} alignItems="right">
                                                        <Grid item>
                                                            <EditButton label={'Edit'} onClick={() => { navigate(`/brand-edit/${subscriber.id}`) }} />
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    <CuustomPagination
                        page={page}
                        rowsPerPage={rowsPerPage}
                        count={total_record_count}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </SimpleCard>
        </Container>
    )
};