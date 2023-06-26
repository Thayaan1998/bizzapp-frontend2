import React, { useState, useEffect } from "react";
import Controls from "../controls/Controls";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { postMasterConfigarationAction, updateMasterConfigarationAction } from "../action/masterConfigarionsAction";


import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const AddOrEditMasterConfigaration = (props) => {

    let { masterConfigaration, recordForEdit, closePopUp } = props;


    const [state, setstate] = useState({
        code: "",
        name: "",
        description: "",

    });

    const [status, setStatus] = useState(false);

    const [errors, setErrors] = useState({});
    const { code, name, description } = state

    const [type, setType] = React.useState('');


    useEffect(() => {
        if (masterConfigaration != null) {
            setstate({
                code: masterConfigaration.code,
                name: masterConfigaration.name,
                description: masterConfigaration.description,

            })
        }

    }, []);

    useEffect(() => {
        if (masterConfigaration != null) {
            setStatus(masterConfigaration.status == "available")
        }

    }, []);

    useEffect(() => {
        if (masterConfigaration != null) {
            setType(masterConfigaration.type)
        }

    }, []);


    const validate = (fieldValues = state) => {
        let temp = { ...errors }
        if ('code' in fieldValues)
            temp.code = fieldValues.code ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('description' in fieldValues)
            temp.description = fieldValues.description ? "" : "This field is required."







        setErrors({
            ...temp
        })

        if (fieldValues == state)
            return Object.values(temp).every(x => x == "")

    }

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setstate({ ...state, [name]: value })
        validate({ [name]: value })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (validate()) {
            if (type != ""&&type != null) {
                try {

                    var values = {
                        masterConfigarationId: masterConfigaration == null ? 0 : masterConfigaration.masterConfigarationId,
                        code: code,
                        name: name,
                        type: type.label,
                        description: description,
                        status: status ? "available" : "not available"
                    };

                    console.log(values);

                    if (masterConfigaration == null) {
                        await postMasterConfigarationAction(values);
                        alert("Master Configaration Details Added Successfully")

                    } else {
                        await updateMasterConfigarationAction(values);
                        alert("Master Configaration Details Updated Successfully")

                    }


                    closePopUp(false);
                } catch (error) {

                    throw error;

                }
            }else{
                alert("please select the type")
            }






        }
    }


    const handleSwitchChange = name => event => {
        setStatus(!name);
    };



    const typesName = [
        { label: 'Bank Name'},
        { label: 'Sales Person'},
        { label: 'Payment Type'},
        { label: 'Area Code'}
    ];

    return (
        <div style={{ float: 'left' }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>


                <Controls.Input
                    type="text"
                    name="code"
                    label="Code"
                    value={code}
                    error={errors.code}
                    onChange={handleInputChange}
                />
                <br></br>




                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={type}
                    onChange={(event, newValue) => {
                       // console.log(newValue)
                        setType(newValue);
                    }}
                    options={typesName}
                    sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "400px", marginTop: "20px", marginRight: "30px" }}
                    renderInput={(params) => <TextField {...params} label="Select Type" error={errors.type} />}

                />

          
                <Controls.Input
                    type="text"
                    name="name"
                    label="Name"
                    value={name}
                    error={errors.name}
                    onChange={handleInputChange}
                />
                <br></br>
              
                <TextField
                    style={{ marginLeft: "30px", width: "400px", marginTop: "20px", marginRight: "30px" }}
                    type="description"
                    name="description"
                    label="Description"
                    value={description}
                    error={errors.description}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    maxRows={4}
                />

                <br></br>
                <FormControlLabel
                    style={{ marginLeft: "20px", marginTop: "20px", marginRight: "30px" }}
                    control={
                        <Switch checked={status} onChange={handleSwitchChange(status)} name="status" />

                    }
                    label="Staus"
                />
                <br></br>
                <br></br>

                <Controls.But
                    type="Submit"
                    text="Save"
                    onClick={handleSubmit}
                    style={{ margin: "30px" }}
                    margin='40px'
                >
                </Controls.But>
                <Controls.But onClick={closePopUp} sx={{ marginLeft: "50px" }} color="error" text="Close" margin='20px'>Close</Controls.But>

            </form>
        </div>
    );


}

export default AddOrEditMasterConfigaration;
