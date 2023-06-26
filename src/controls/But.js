import React from 'react'
import { Button, makeStyles } from "@mui/material";
// import Button from '@material-ui/core/Button';
import styled from '@emotion/styled';



const useStyles = styled(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: 'none'
    }
}))

export default function But(props) {

       const classes = useStyles();
       const { size, color, variant,other,onClick,text,margin,starticon} = props

    return (
        <Button
            variant={variant || "contained"}
            size={size || "large"}
            color={color || "primary"}
            onClick={onClick}
            startIcon={starticon}
            classes={{ root: classes.root, label: classes.label }}
            {...other}
            style={{marginLeft:margin}}

            >
            {text}
        </Button>
    )
}