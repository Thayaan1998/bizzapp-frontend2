import React, { useState, useEffect } from "react";
import Controls from "../controls/Controls";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { postCustomersAction, updateCustomersAction, getAutoIncrementIdAction } from '../action/customerAction'
import { getAreaCodesAction } from '../action/masterConfigarionsAction'
import { Grid } from "@mui/material";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const AddOrEditCustomer = (props) => {

    let { customer, recordForEdit, closePopUp } = props;


    const [state, setstate] = useState({
        customerRefNo: "",
        name: "",
        telephoneNumber: "",
        email: "",
        address: "",
        //  status: false
    });

    useEffect(() => {
        if (customer != null) {
            setstate({
                customerId: customer.customerId,
                customerRefNo: customer.customerRefNo,
                name: customer.name,
                telephoneNumber: customer.telephoneNumber,
                email: customer.email,
                address: customer.address
            })
        }

    }, []);

    useEffect(() => {
        if (customer != null) {
            setStatus(customer.STATUS == "available")
        }

    }, []);

    const [status, setStatus] = useState(false);

    const [errors, setErrors] = useState({});

    const [autoValue, setAutoValue] = useState("");

    const validate = (fieldValues = state) => {
        let temp = { ...errors }
        if ('customerRefNo' in fieldValues)
            temp.customerRefNo = fieldValues.customerRefNo ? "" : "This field is required."
        if ('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if ('email' in fieldValues)
            temp.email = fieldValues.email ? "" : "This field is required."
        if ('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."
        if ('telephoneNumber' in fieldValues)
            temp.telephoneNumber = fieldValues.telephoneNumber.length > 9 ? "" : "not valid phonenumber"


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
            if (areaCode != "" && areaCode != null) {
                try {

                    var values = {
                        customerId: customer == null ? 0 : customer.customerId,
                        customerRefNo: customerRefNo,
                        name: name,
                        telephoneNumber: telephoneNumber,
                        email: email,
                        areaCode: areaCode.masterConfigarationId,
                        address: address,
                        status: status ? "available" : "not available"
                    };

                    console.log(values);

                    if (customer == null) {
                        await postCustomersAction(values);
                        alert("custormer Details Added Successfully")

                    } else {
                        await updateCustomersAction(values);
                        alert("custormer Details Updated Successfully")

                    }


                    closePopUp(false);
                } catch (error) {

                    throw error;

                }
            } else {
                alert("please select Area Code")
            }





        }
    }


    const handleSwitchChange = name => event => {
        setStatus(!name);
    };

    const [areaCodes, setareaCodes] = useState([]);
    const [areaCode, setareaCode] = useState('');

    const getAreaCodes = async () => {

        var areaCodes = await getAreaCodesAction();

        console.log(areaCodes)

        setareaCodes(areaCodes)

        if (customer != null) {
            let found = areaCodes.find(element => element.masterConfigarationId == customer.areaCode);


            setareaCode(found)
        }

    }

    useEffect(() => {
        getAreaCodes();

    }, []);

    const zeroPad = (num, places) => String(num).padStart(places, '0')


    const getAutoIncrementId = async () => {

        var getAutoIncrementId = await getAutoIncrementIdAction();
        setAutoValue("CUST" + zeroPad(getAutoIncrementId[0].AUTO_INCREMENT, 4))
    }

    useEffect(() => {
        getAreaCodes();

    }, []);

    useEffect(() => {
        if (customer == null) {
            getAutoIncrementId();
        } else {
            setAutoValue("CUST" + zeroPad(customer.customerId, 4))
        }


    }, []);



    const { customerRefNo, name, email, address, telephoneNumber } = state


    return (
        <div style={{ float: 'left' }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Grid container>
                    <Grid item>
                        <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Customer RefNo</label>
                        <br />
                        <TextField
                            style={{ marginLeft: "30px", width: "300px", marginTop: "5px", marginRight: "30px" }}
                            type="text"
                            name="customerRefNo"
                            // label="Customer RefNo"
                            value={customerRefNo}
                            {...(errors.address && { error: true, helperText: errors.address })}
                            // error={errors.customerRefNo}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Customer Code</label>
                        <br />
                        <TextField
                            style={{ marginLeft: "30px", width: "300px", marginTop: "5px", marginRight: "30px" }}
                            type="text"
                            name="customerRefNo"
                            // label="Customer Code"
                            value={autoValue}
                            // {...(errors.address && {error:true,helperText:errors.address})}
                            InputProps={{
                                readOnly: true,
                            }}
                            onChange={handleInputChange}

                        />
                    </Grid>
                </Grid>

                <br></br>
                <Grid container>
                    <Grid item>
                        <Controls.Input
                            type="text"
                            name="name"
                            label="Name"
                            value={name}
                            error={errors.name}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <Controls.Input
                            type="email"
                            name="email"
                            label="Email"
                            value={email}
                            error={errors.email}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
                <br></br>

                <Grid container>
                    <Grid item>
                        <Controls.Input
                            type="number"
                            name="telephoneNumber"
                            label="TelephoneNumber"
                            value={telephoneNumber}
                            error={errors.telephoneNumber}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Select Area</label>
                        <br />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={areaCode}
                            onChange={(event, newValue) => {
                                //console.log(newValue)
                                setareaCode(newValue);
                            }}
                            options={areaCodes}
                            sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "300px", marginTop: "5px", marginRight: "30px" }}
                            renderInput={(params) => <TextField {...params} />}

                        />
                    </Grid>
                </Grid>
                <br></br>

                <Grid container>
                    <Grid item>
                        <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Address</label>
                        <br />

                        <TextField
                            style={{ marginLeft: "30px", width: "300px", marginTop: "5px", marginRight: "30px" }}
                            type="text"
                            name="address"
                            label="Address"
                            value={address}
                            {...(errors.address && { error: true, helperText: errors.address })}
                            onChange={handleInputChange}
                            multiline
                            rows={2}
                            maxRows={3}
                        />
                    </Grid>
                    <Grid item>

                        <FormControlLabel
                            style={{ marginLeft: "20px", marginTop: "20px", marginRight: "30px" }}
                            control={
                                <Switch checked={status} onChange={handleSwitchChange(status)} name="status" />

                            }
                            label="Staus"
                        />
                    </Grid>
                </Grid>



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

export default AddOrEditCustomer;
