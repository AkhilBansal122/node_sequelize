import { Alert, Button, Snackbar } from "@mui/material";
import { amber, green } from "@mui/material/colors";
import { styled } from '@mui/material';
import React from 'react';

import useAuth from "app/hooks/useAuth";


const ContentRoot = styled("div")(({ theme }) => ({
    "& .icon": { fontSize: 20 },
    "& .success": { backgroundColor: green[600] },
    "& .warning": { backgroundColor: amber[700] },
    "& .error": { backgroundColor: theme.palette.error.main },
    "& .info": { backgroundColor: theme.palette.primary.main },
    "& .iconVariant": { opacity: 0.9, marginRight: theme.spacing(1) },
    "& .message": { display: "flex", alignItems: "center" },
    "& .margin": { margin: theme.spacing(1) }
}));

export default function Message({ message, type, isOpen, successMessage, failMessage }) {

    const [open, setOpen] = React.useState(isOpen);
    const [stype, setType] = React.useState(type);
    const [messages, setmessage] = React.useState(message);
    const [showSuccess, setSuccess] = React.useState(successMessage);
    const [showFail, setFail] = React.useState(failMessage);

    function handleClose(_, reason) {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    }


    return (
        <ContentRoot>
            {
                showSuccess === true && stype === 'success' && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }} variant="filled">
                        {message}
                    </Alert>
                </Snackbar>
            }


            {showFail === true && stype === 'fail' && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}>
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }} variant="filled">
                    {message}
                </Alert>
            </Snackbar>}
        </ContentRoot>

    );
}