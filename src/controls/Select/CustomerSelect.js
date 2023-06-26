import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

export default function CustomerSelect(props) {

    const { name, label, value, onChange, options } = props;

    return (
        <FormControl variant="outlined"
        style={{width:"400px",marginTop:"10px"}}
      >
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                {
                    options.map(
                        // item => (<MenuItem key={item.authorId} value={item.authorId}>{item.authorName}</MenuItem>)
                        item => (<MenuItem key={item.customerId} value={item.customerId}>{item.customerName}</MenuItem>)
                    )
                }
            </MuiSelect>
        
        </FormControl>
    )
}