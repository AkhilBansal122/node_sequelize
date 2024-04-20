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
    Button,
} from "@mui/material";


import { useState } from "react";
import { Breadcrumb } from "app/components";


import { SimpleCard } from "app/components";
import { axiosRequest } from "../../../config";
import { useEffect } from "react";
import { ADMIN_SECTIONS_LIST, ADMIN_SECTIONS_STATUS } from "apiurl";
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
        getSectionsList(newPage * rowsPerPage, rowsPerPage);

    };
    const [total_record_count, set_total_record_count] = useState(0);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        getSectionsList(0, event.target.value);
        setPage(0);
    };
    const handleSwitchChange = (event, index, id) => {
        statusChange(id, event.target.checked === true ? 1 : 0);
    };

    const [Sectionslist, setSectionsList] = useState([]);

    const getSectionsList = async (page, rowsPerPage) => {

        const headers = headerValue();
        const config = {
            headers: headers
        };
        const data = { offset: page, limit: rowsPerPage };
        const response = await axiosRequest(ADMIN_SECTIONS_LIST, data, config);


        if (response.data.status === true) {
            set_total_record_count(response.data.total_record);

            setSectionsList(response.data.data);
        }
        else {
            setSectionsList([]);
        }
    }
    useEffect(() => {
        getSectionsList(page, rowsPerPage);
    }, []);
    const statusChange = async (id, status) => {

        const headers = headerValue();
        const config = {
            headers: headers
        };
        const data = { id: id, status: status };
        const response = await axiosRequest(ADMIN_SECTIONS_STATUS, data, config);
        if (response.data.status === true) {
            getSectionsList(page, rowsPerPage);
        }
    }

    return (
        <Container>

            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: "Sections", path: "/sections-listing" }, { name: "Home" }]} />
            </Box>
            <SimpleCard title="Sections">
                <Button variant="contained" size={"small"} style={{ float: 'right' }} color="primary" onClick={() => { navigate('/sections-create') }}>
                    Add New Record
                </Button>
                <Box width="100%" overflow="auto">
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Table >
                                <TableHead style={{ color: 'white', alignItem: 'center', fontWeight: 'bold' }}>
                                    <TableRow>
                                        <TableCell align="left">Sr No</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="center">Active/InActive</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Sectionslist
                                        .map((subscriber, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left">
                                                    {index + 1}
                                                </TableCell>

                                                <TableCell align="left">{subscriber.name}</TableCell>
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
                                                            <EditButton label={'Edit'} onClick={() => { navigate(`/Sections-edit/${subscriber.id}`) }} />
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