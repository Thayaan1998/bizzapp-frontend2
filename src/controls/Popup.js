import React from 'react'
import { Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import styled from '@emotion/styled';


// import Controls from "./controls/Controls";
// import CloseIcon from '@material-ui/icons/Close';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const useStyles = styled(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup , closePopUp} = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="xl" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}  style={{marginLeft:"30px"}}>
                <div style={{ display: 'flex' }}>
                    <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
                        {title}
                    </Typography>
                    
                    {/* <IconButton  style={{marginRight:"40px"}} onClick={closePopUp}>
                        <CloseIcon />
                    </IconButton> */}
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}