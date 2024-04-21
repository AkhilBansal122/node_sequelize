
import { Button, TablePagination } from '@mui/material';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import React from 'react';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { TextField } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';




export const ActiveInactiveComponent = ({ status }) => {
    return (<Stack spacing={1} alignItems="center">
        <Stack direction="row" spacing={1}>
            <Chip label={status === 1 ? 'Active' : 'Inactive'} color={status === 1 ? 'primary' : 'success'} />
        </Stack>
    </Stack>
    )
}
export const AddButton = ({ size, style, onClick, label }) => {
    return (<>
        <Button variant="contained" size={size} style={style} color="primary" onClick={onClick}>
            {label}
        </Button></>);
}
export const EditButton = ({ label, onClick }) => {
    return (<Button variant="contained" size={"small"} color="primary" onClick={onClick}>{label}</Button>);
}
export const ViewButton = ({ label }) => {
    return (<Button variant="contained" size={"small"} color="success">{label}</Button>);
}
export const SwitchActiveInactive = ({ checked, handleChange }) => {
    return (<>
        <FormControlLabel
            control={<Switch checked={checked} onChange={handleChange} />}
            label=""
        />
    </>);
}
export const headerValue = () => {
    const headers = {
        Accept: 'application/json',
    };

    const token = localStorage.getItem('token');

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}

export const formDataheaderValue = () => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
    };

    const token = localStorage.getItem('token');

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    return headers;
}

export const InputTextField = ({ name, size, label, onBlur, value, variant, onChange, helperText, error, sx }) => {
    return (<TextField
        type="text"
        size={size}
        label={label}
        onBlur={onBlur}
        name={name}
        variant={variant}
        value={value}
        onChange={onChange}
        helperText={helperText}
        error={error}
        sx={sx}
    />)
}
export const FileUploadButton = ({ component, role, variant, tabIndex, startIcon, label, VisuallyHiddenInput }) => {
    return (<Button
        component={component}
        role={role}
        variant={variant}
        tabIndex={tabIndex}
        startIcon={startIcon}
    >
        {label}
        {VisuallyHiddenInput}
    </Button >)
}

export const CuustomPagination = ({ page, rowsPerPage, count, onPageChange, onRowsPerPageChange }) => {
    return (<TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={count}
        onPageChange={onPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={onRowsPerPageChange}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
    />);
}

export const stringToColor = (string) => {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

export const stringAvatar = (name) => {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}



export const SuccessMessage = ({ isOpemClose, message }) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    This is a success Alert inside a Snackbar!
                </Alert>
            </Snackbar>
        </div>
    );
};
export const SelectOption = ({ label, list, values, handleSelectChange }) => {

    return (
        <>
            <FormControl sx={{ mb: 1 }} fullWidth>
                <InputLabel id="demo-simple-select-helper-label">Select Selection</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={values}
                    onChange={handleSelectChange}
                >
                    <MenuItem value="select option"><em>select Section</em></MenuItem>
                    {list.map((item, index) => (
                        <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}

