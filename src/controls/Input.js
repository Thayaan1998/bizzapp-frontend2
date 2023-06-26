import React from 'react'
import { TextField } from '@mui/material';

export default function Input(props) {

    const {type, name, label, value,error=null, onChange,id } = props;
    return (
        <TextField
            style={{marginLeft:"30px",width:"400px",marginTop:"20px",marginRight:"30px"}}
            type={type}
            variant="outlined"
            label={label}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}

       
        />
      
    )
}