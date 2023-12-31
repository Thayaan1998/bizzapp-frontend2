import React, { useState, useEffect } from "react";
import Controls from "../controls/Controls";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { insertSales, updateSalesAction } from '../action/salesAction'

import { getActiveCustomersAction } from '../action/customerAction'
import { getActivMasterConfigartionAction } from '../action/masterConfigarionsAction'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Grid } from "@mui/material";



import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const AddOrEditSales = (props) => {

    let { sale, recordForEdit, closePopUp } = props;


    const [state, setstate] = useState({
        total: "",
        invoiceNo: ""
        //  status: false
    });
    const [status, setStatus] = useState(false);

    const [errors, setErrors] = useState({});


    const [customer, setCustomer] = React.useState('');
    const [customerNameAndCode, setCustomerNameAndCode] = React.useState('');
    const [customers, setCustomers] = React.useState([]);


    const [salesPerson, setSalesPerson] = React.useState('');
    //const [customerNameAndCode, setCustomerNameAndCode] = React.useState('');
    const [salesPersons, setSalesPersons] = React.useState([]);
    const [date, setDate] = React.useState(dayjs(new Date()));
    const [address, setAddress] = React.useState('');


    useEffect(() => {
        if (sale != null) {
            setstate({
                total: sale.total,
                invoiceNo: sale.invoiceNo
            })
        }

    }, []);

    const getCustomers = async () => {

        var customers = await getActiveCustomersAction();

        setCustomers(customers)

        if (sale != null) {


            let found = customers.find(element => element.customerId == sale.customerId);


            setCustomer(found);

            setAddress(found.address)

        }

    }

    const getSalesPersons = async () => {

        var salesPersons = await getActivMasterConfigartionAction();

        setSalesPersons(salesPersons)

        if (sale != null) {


            let found = salesPersons.find(element => element.masterConfigarationId == sale.masterConfigarationId);


            setSalesPerson(found);

        }

    }

    useEffect(() => {
        getCustomers();

    }, []);

    useEffect(() => {
        if (sale != null) {
            setCustomer(sale.customerId);

        }

    }, []);

    useEffect(() => {
        if (sale != null) {
            setSalesPerson(sale.masterConfigarationId);

        }

    }, []);


    useEffect(() => {
        if (sale != null) {
            console.log(sale.invoiceDate1)
            const myArray = sale.invoiceDate1.split("/")
            setDate(dayjs(new Date(20 + myArray[0], myArray[1], myArray[2])));


        }

    }, []);

    useEffect(() => {
        if (sale != null) {

            setCustomerNameAndCode(sale.name + " | " + sale.customerCode + " | " + sale.address);
        }

    }, []);
    useEffect(() => {
        getSalesPersons();

    }, []);






    const validate = (fieldValues = state) => {
        let temp = { ...errors }
        if ('invoiceNo' in fieldValues)
            temp.invoiceNo = fieldValues.invoiceNo ? "" : "This field is required."

        if ('total' in fieldValues)
            temp.total = fieldValues.total ? "" : "This field is required."


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
            if (customer != "" && customer != null) {
                if(!(date > new Date())){
                    try {

                        var values = {
                            salesId: sale == null ? 0 : sale.salesId,
                            invoiceNo: invoiceNo,
                            customerId: customer.customerId,
                            customerRefNo: customer.customerRefNo,
                            masterConfigarationId:salesPerson != "" && salesPerson != null? salesPerson.masterConfigarationId:null,
                            invoiceDate: date,
                            total: total
                        };




                        if (sale == null) {
                            let insert = await insertSales(values);

                            alert(insert == "perticular Sales code already added" ? "perticular Sales code already exsist" : "sales Details Added Successfully")

                            if (insert != "perticular Sales code already added") {
                                closePopUp(false);
                            }

                        } else {
                            await updateSalesAction(values);
                            alert("sales Details Updated Successfully")
                            closePopUp(false);

                        }



                    } catch (error) {

                        throw error;

                    }
                } else {
                    alert("Selected Date is future date")

                }
            } else {
                alert("please select customer")
            }






        }
    }



    const handleChange = (event) => {

        var obj = customers.find(customer => customer.customerId == event.target.value);

        setCustomer(event.target.value);
        setCustomerNameAndCode(obj.name + " | " + obj.customerCode + " | " + obj.address)
    };

    const handleSalesChange = (event) => {

        setSalesPerson(event.target.value);
        // setCustomerNameAndCode(obj.name +" | "+obj.customerCode+" | "+obj.address)
    };


    const { total, invoiceNo } = state

    const zeroPad = (num, places) => String(num).padStart(places, '0')

    return (
        <div style={{ float: 'left' }}>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>

                <Grid container>
                    <Grid item>
                        <Controls.Input
                            type="text"
                            name="invoiceNo"
                            label="Invoice No"
                            value={invoiceNo}
                            error={errors.invoiceNo}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Invoice Date</label>
                        <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DatePicker
                                value={date}
                                onChange={(newValue) => setDate(newValue)}
                                sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "300px", marginTop: "5px", marginRight: "30px" }} />
                        </LocalizationProvider>
                    </Grid>
                </Grid>
                <br></br>

                <Grid container>
                    <Grid item>
                        <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Select Customer</label>
                        <br />

                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={customer}
                            onChange={(event, newValue) => {
                                //console.log(newValue)
                                setCustomer(newValue);

                                if (newValue != null) {
                                    setAddress(newValue.address)

                                } else {
                                    setAddress("")
                                }

                                // document.getElementById("address").value=newValue.address;
                            }}
                            getOptionLabel={(option) => {
                                return option != "" ? "C" + zeroPad(option.customerId-1, 4) + " | "+ option.customerRefNo + " | " + option.label : "";

                            }
                            }
                            options={customers}
                            sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "300px", marginTop: "5px", marginRight: "30px" }}

                            renderInput={(params) => <TextField {...params} />}

                        />
                    </Grid>
                    <Grid item>
                        <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Select Sales Person</label>
                        <br />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            value={salesPerson}
                            onChange={(event, newValue) => {
                                //console.log(newValue)
                                setSalesPerson(newValue);
                            }}
                            getOptionLabel={(option) => {
                                return option != "" ? option.code + " | " + option.label : "";

                            }}
                            options={salesPersons}
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
                            style={{ marginLeft: "30px", width: "300px", marginRight: "30px", marginTop: "5px" }}
                            type="text"
                            id="address"
                            name="address"
                            // label="Address"
                            rows={3}
                            maxRows={4}
                            value={address}
                            // {...(errors.address && {error:true,helperText:errors.address})}
                            InputProps={{
                                readOnly: true,
                            }}
                        // onChange={handleInputChange}

                        />
                    </Grid>
                    <Grid item>

                        {/* <br></br> */}
                        <Controls.Input
                            type="number"
                            name="total"
                            label="Total"
                            value={total}
                            error={errors.total}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>

                <br></br>

                <Controls.But
                    type="Submit"
                    text="Save"
                    onClick={handleSubmit}
                    // style={{ margin: "20px" }}
                    margin='40px'
                >



                </Controls.But>

                <Controls.But onClick={closePopUp} sx={{ marginLeft: "50px" }} color="error" text="Close" margin='20px'>Close</Controls.But>


            </form>
        </div>
    );


}

export default AddOrEditSales;
