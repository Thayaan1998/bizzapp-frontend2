import React from 'react'
import { TextField } from '@mui/material';

export default function Input(props) {

    const {type, name, label, value,error=null, onChange,id } = props;
    return (
        <div>
        <label  style={{marginLeft:"30px",width:"300px",marginTop:"10px",marginRight:"30px"}}>{label}</label>
        <br />
        <TextField
            style={{marginLeft:"30px",width:"300px",marginRight:"30px",marginTop:"5px"}}
            type={type}
            // variant="standard"
            // label={label}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            {...(error && {error:true,helperText:error})}

       
        />
        </div>
      
    )
}