import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@mui/material';

export default function BookCategorySelect(props) {

    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="outlined"
        style={{marginLeft:"30px",width:"400px",marginTop:"20px"}}
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    options.map(
                        // item => (<MenuItem key={item.authorId} value={item.authorId}>{item.authorName}</MenuItem>)
                        item => (<MenuItem key={item.bookCategoryId} value={item.bookCategoryId}>{item.bookCategoryName}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}