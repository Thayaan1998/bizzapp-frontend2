import React from 'react'
import { Dialog,  } from '@mui/material';
import styled from '@emotion/styled';


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

    const { children} = props;

    return (
        <div>
           {children}
        </div>
    )
}