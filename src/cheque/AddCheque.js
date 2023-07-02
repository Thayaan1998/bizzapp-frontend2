import React, { useEffect, useState, useRef } from 'react'
import { getActiveCustomersAction } from '../action/customerAction'
import { getSalesOutstandingbyCustomerCodeAction, updateSalesOutstandingAction } from '../action/salesOutstandingAction'
import { getPaymentTypeAction, getBanksAction } from '../action/masterConfigarionsAction'


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SideBar from '../SideBar'
import Controls from "../controls/Controls";
import { TextField } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';


import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import { getPericularlChequetDetailAction, getAllBillwiseReciptAction, postBillWiseReceiptHeaderAction, postBillWiseReceiptDetailAction, getPericularlBillWiseReceiptDetailAction } from '../action/billwisereciptAction'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@mui/material';
import styled from '@emotion/styled';


import Autocomplete from '@mui/material/Autocomplete';
import { Grid } from "@mui/material";

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



const AddCheque = (props) => {
    let { title, openPopup, recordForEdit, closePopUp } = props;

    const [customerNameAndCode, setCustomerNameAndCode] = useState('');
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    const [billwiseRecipt, setBillwiseRecipt] = useState({});

    //console.log(billwiseRecipt)


    const [paymentType, setPaymentType] = useState('');
    const [payemntTypes, setPayemntTypes] = useState([]);

    const [bank, setBank] = useState('');

    const [banks, setBanks] = useState([]);

    const [showCheque, setShowCheque] = useState(false)





    const [salesOutStanding, setSalesOutStanding] = React.useState([]);

    const [getAmount, setgetAmount] = React.useState([]);


    const [checkList, setCheckList] = React.useState([]);

    const [date, setDate] = React.useState(dayjs(new Date()));





    const loadData = async () => {

        var a = {
            "receiptNo": billwiseRecipt.receiptNo
        };
        var getBillWiseRecipts = await getPericularlBillWiseReceiptDetailAction(a);

        let arr1 = [];
        let arr2 = [];


        for (var i = 0; i < getBillWiseRecipts.length; i++) {
            arr1.push(getBillWiseRecipts[i].invoiceNo)
            // document.getElementById(getBillWiseRecipts[i].invoiceNo).value="1"
            arr2.push(getBillWiseRecipts[i])
        }

        setCheckList(arr1);
        setgetAmount(arr2)
    }

    useEffect(() => {
        if (Object.keys(billwiseRecipt).length != 0 && openPopup) {
            setBank(billwiseRecipt.bankId);

        }

    }, []);

    useEffect(() => {
        if (Object.keys(billwiseRecipt).length != 0 && openPopup) {
            setPaymentType(billwiseRecipt.paymentId);

        }

    }, []);

    useEffect(() => {
        if (Object.keys(billwiseRecipt).length != 0 && openPopup) {
            setDate(dayjs(billwiseRecipt.receiptDate));

        }

    }, []);


    useEffect(() => {
        if (Object.keys(billwiseRecipt).length != 0 && openPopup) {
            // document.getElementById("receiptNumber").value = billwiseRecipt.receiptNo;
            // document.getElementById("amount").value = billwiseRecipt.amount;



        }

    }, []);



    const getCustomers = async () => {

        var customers = await getActiveCustomersAction();

        setCustomers(customers)

    }

    const getPayemntTypes = async () => {

        var payemntTypes = await getPaymentTypeAction();

        setPayemntTypes(payemntTypes)

    }

    const getBanks = async () => {

        var banks = await getBanksAction();

        setBanks(banks)

    }

    useEffect(() => {
        getCustomers();

    }, []);

    useEffect(() => {
        getPayemntTypes();

    }, []);

    useEffect(() => {
        getBanks();

    }, []);

    const getSalesOutstansing2 = async (customerId, billwiseRecipt) => {
        
        var customers = await getActiveCustomersAction();
        var obj = customers.find(customer => customer.customerId == customerId);

        console.log(obj)
        setCustomer(obj);
        // setCustomerNameAndCode(obj.name + " | " + obj.customerCode + " | " + obj.address)


        var b = {
            "receiptNo": billwiseRecipt.receiptNo
        };
        var getBillWiseRecipts = await getPericularlBillWiseReceiptDetailAction(b);

        let arr1 = [];
        let arr2 = [];


        for (var i = 0; i < getBillWiseRecipts.length; i++) {
            arr1.push(getBillWiseRecipts[i].invoiceNo)
            // document.getElementById(getBillWiseRecipts[i].invoiceNo).value="1"
            arr2.push(getBillWiseRecipts[i])
        }

        setCheckList(arr1);
        setgetAmount(arr2)

        let value = {
            "receiptNo": billwiseRecipt.receiptNo
        };
        let a = await getSalesOutstandingbyCustomerCodeAction(value);

        setSalesOutStanding(a);

        // await loadData(billwiseRecipt.customerId);
        setBank(billwiseRecipt.bankId);
        setPaymentType(billwiseRecipt.paymentId);
        // document.getElementById("receiptNumber").value = billwiseRecipt.receiptNo;
        // document.getElementById("amount").value = billwiseRecipt.amount;


        setSubTotal(billwiseRecipt.subTotal.toFixed(2))

        // setstate(
        //     {reciptNo:billwiseRecipt.reciptNo,
        //      chequeNo:billwiseRecipt.chequeNo,
        //      amount:billwiseRecipt.amount
        //     }

        // )

        setAmount(billwiseRecipt.amount.toFixed(2))
        setReceiptNo(billwiseRecipt.receiptNo)

        if (billwiseRecipt.chequeNo != "") {
            // setShowCheque(true)
            // document.getElementById("chequeNumber").value = billwiseRecipt.chequeNo;

            setchequeNumber(billwiseRecipt.chequeNo)

        }

    }



    const getSalesOutstansing = async (customerId) => {
        var customers = await getActiveCustomersAction();
        var obj = customers.find(customer => customer.customerId == customerId);

        console.log(obj)
        setCustomer(obj);
        // setCustomerNameAndCode(obj.name + " | " + obj.customerCode + " | " + obj.address)

        let value = {
            "receiptNo": receiptNo
        };
        let a = await getSalesOutstandingbyCustomerCodeAction(value);


        setSalesOutStanding(a);

        await loadData(billwiseRecipt.customerId);
        await setBank(billwiseRecipt.bankId);
        await setPaymentType(billwiseRecipt.paymentId);
        // document.getElementById("receiptNumber").value = billwiseRecipt.receiptNo;
        // document.getElementById("amount").value = billwiseRecipt.amount;


        setSubTotal(billwiseRecipt.subTotal.toFixed(2))

        // setstate(
        //     {reciptNo:billwiseRecipt.reciptNo,
        //      chequeNo:billwiseRecipt.chequeNo,
        //      amount:billwiseRecipt.amount
        //     }

        // )

        if (billwiseRecipt.chequeNo != "") {
            // setShowCheque(true)
            // document.getElementById("chequeNumber").value = billwiseRecipt.chequeNo;

            setchequeNumber(billwiseRecipt.chequeNo)

        }

    }

    const handlePaymentTypeChange = async (event) => {



        setShowCheque(event.target.value == "8")

        setPaymentType(event.target.value);
    };

    const handleBanksChange = async (event) => {


        setBank(event.target.value);
    };

    useEffect(() => {

        //console.log()
        if (Object.keys(billwiseRecipt).length != 0 && openPopup) {

            getSalesOutstansing(billwiseRecipt.customerId);
            // loadData(billwiseRecipt.customerId);
            // setBank(billwiseRecipt.bankId);
            // setPaymentType(billwiseRecipt.paymentId);
            // document.getElementById("receiptNumber").value = billwiseRecipt.receiptNo;
            // document.getElementById("amount").value = billwiseRecipt.amount;
        }

    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault()


        try {


            if (document.getElementById("amount").value === subTotal.toString()) {

                // var values = {
                //     receiptNo: document.getElementById("receiptNumber").value,
                //     receiptDate: date,
                //     customerId: customer.customerId,
                //     paymentId: paymentType,
                //     bankId: bank,
                //     amount: document.getElementById("amount").value,
                //     subTotal: subTotal,
                //     chequeNo: showCheque ? document.getElementById("chequeNumber").value : ""
                // };



                // let insert = await postBillWiseReceiptHeaderAction(values);



            } else {
                alert("amount not equal to subtotal")
            }





        } catch (error) {

            throw error;

        }
    }

    const [subTotal, setSubTotal] = useState('');

    const [chequeNumber, setchequeNumber] = useState('');

    const [state, setstate] = useState({
        reciptNo: "",
        chequeNo: "",
        amount: ""
    });

    const [amount, setAmount] = useState('');
    const [receiptNo, setReceiptNo] = useState('');



    useEffect(() => {
        if (Object.keys(billwiseRecipt).length != 0 && openPopup) {

            setAmount(billwiseRecipt.amount.toFixed(2))
        }

    }, []);

    useEffect(() => {
        if (Object.keys(billwiseRecipt).length != 0 && openPopup) {

            setReceiptNo(billwiseRecipt.receiptNo)
        }

    }, []);

    // const { reciptNo, chequeNo, amount } = state
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setstate({ ...state, [name]: value })
        //  validate({ [name]: value })



    }


    const columns = [
        // {
        //     field: "checked",
        //     headerName: "",
        //     width: 50,
        //     // sortable: false,
        //     filter: false,
        //     renderCell: (params) => {
        //         const handleChange = (e) => {
        //             e.stopPropagation();
        //             let arr1 = checkList

        //             let found = checkList.find(element => element == params.row.invoiceNo);

        //             if (found == undefined) {
        //                 arr1.push(params.row.invoiceNo)
        //             } else {
        //                 const index = arr1.indexOf(params.row.invoiceNo);
        //                 if (index > -1) {
        //                     arr1.splice(index, 1);
        //                 }
        //                 document.getElementById(params.row.invoiceNo).value = "";
        //             }

        //             setCheckList(arr1)
        //             setSalesOutStanding(salesOutStanding);

        //         };

        //         if (billwiseRecipt != null && openPopup) {
        //             let found = checkList.find(element => element == params.row.invoiceNo);

        //             return <Checkbox
        //                 // checked={checked}
        //                 checked={found == undefined ? false : true}
        //                 id="checkbox"
        //                 onChange={handleChange}
        //                 inputProps={{ 'aria-label': 'controlled' }}
        //             />;
        //         } else {
        //             return <Checkbox
        //                 // checked={checked}
        //                 //checked={false}
        //                 id="checkbox"
        //                 onChange={handleChange}
        //                 inputProps={{ 'aria-label': 'controlled' }}
        //             />;
        //         }

        //     }
        // },

        { field: 'invoiceNo', headerName: 'Invoice No', width: 150, valueGetter: (params) => `${params.row.invoiceNo || ''}` },

        { field: "invoiceDate", headerName: "Invoice Date", width: 250, valueGetter: (params) => `${params.row.invoiceDate1 || ''}` },

        { field: "invoiceAmount", headerName: "Invoice Amount", width: 150, valueGetter: (params) => `${params.row.invoiceAmount.toFixed(2) || ''}` },

        { field: "receiptAmount", headerName: "Paid Amount", width: 200, valueGetter: (params) => `${params.row.receiptAmount != null ? params.row.receiptAmount.toFixed(2) : "0" || ''}` },

        { field: "balance", headerName: "Balance", width: 200, valueGetter: (params) => `${params.row.balance != null ? params.row.balance.toFixed(2) : "0" || ''}` },

        {
            field: "amount",
            headerName: "Amount",
            width: 200,
            // sortable: false,
            filter: false,
            renderCell: (params) => {
                const handleInputChange = (e) => {
                    e.stopPropagation();

                    let found = checkList.find(element => element == params.row.invoiceNo);


                    if (found == undefined) {
                        alert("please select the invoice");
                        e.target.value = "";
                        return;
                    } else {
                        if (e.target.value > params.row.balance) {
                            alert("entered amount is greaterthan balance amount");
                            e.target.value = "";
                            var total = 0;
                            for (var i = 0; i < checkList.length; i++) {
                                if (document.getElementById(checkList[i]).value != "") {

                                    total = parseFloat(document.getElementById(checkList[i]).value) + total;
                                }
                            }
                            setSubTotal(total.toFixed(2));
                            return;
                        } else {
                            var total = 0;

                            for (var i = 0; i < checkList.length; i++) {
                                if (document.getElementById(checkList[i]).value != "") {

                                    total = parseFloat(document.getElementById(checkList[i]).value) + total;
                                }
                            }
                            setSubTotal(total.toFixed(2));
                            return;
                        }
                    }


                };
                if (billwiseRecipt != null && openPopup) {
                    let found = getAmount.find(element => element.invoiceNo == params.row.invoiceNo);


                    return <TextField
                        type="number"
                        id={params.row.invoiceNo}
                        name="name"
                        label="Enter Amount"
                        height="10px"
                        size="small"
                        value={found == undefined ? "" : found.amount.toFixed(2)}
                        onChange={handleInputChange}
                        variant="standard"
                    />;
                } else {
                    return <TextField
                        type="number"
                        id={params.row.invoiceNo}
                        name="name"
                        label="Enter Amount"
                        height="10px"
                        size="small"
                        onChange={handleInputChange}
                        variant="standard"
                    />;
                }


            }
        },
    ];
    // const { children, openPopup} = props;
    const classes = useStyles();

    const handleInputChange2 = async (e) => {
        // console.log(e.target.value);
        if (e.target.value == '') {

        } else {
            var data = {
                chequeNo: e.target.value
            }
            var data = await getPericularlChequetDetailAction(data);
            console.log(data);
            setReceiptNo("")

            if (data.length != 0) {
                setBillwiseRecipt(data[0])
                await getSalesOutstansing2(data[0].customerId, data[0]);

            } else {

            }
        }



    }

    const zeroPad = (num, places) => String(num).padStart(places, '0')


    return (
        <Dialog open={openPopup} maxWidth="xl" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle style={{ marginLeft: "0px" }}>
                <div >
                    <Typography variant="h4" component="div" style={{ flexGrow: 1, marginLeft: "30px" }}>
                        {title}
                    </Typography>


                    <Grid container>
                        <Grid item>
                            <Controls.Input
                                type="text"
                                name="Cheque Number"
                                label="Cheque Number"
                                id="chequeNumber"
                                // value={chequeNumber}
                                onChange={handleInputChange2}

                            // error={errors.name}

                            />

                        </Grid>
                        {receiptNo === "" ? null :
                            <Grid item >

                                <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Select Customer</label>
                                <br />

                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    value={customer}
                                    onChange={async (event, newValue) => {

                                        setCustomer(newValue);

                                        // if (newValue != null) {
                                        //     let value = {
                                        //         "customerRefNo": newValue.customerRefNo
                                        //     };
                                        //     let a = await getSalesOutstandingbyCustomerCodeAction1(value);

                                        //     setSalesOutStanding(a);
                                        // } else {
                                        //     setSalesOutStanding([]);
                                        // }

                                    }}
                                    getOptionLabel={(option) => {
                                        return option != "" ? "C" + zeroPad(option.customerId-1, 4) + " | " + option.customerRefNo + " | " + option.label : "";

                                    }
                                    }
                                    options={customers}
                                    sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "370px", marginTop: "5px", marginRight: "30px" }}
                                    renderInput={(params) => <TextField {...params} />}

                                />

                            </Grid>
                        }
                        <Grid item alignItems="stretch" style={{ display: "flex" }}>
                        
                            {

                                receiptNo === "" ? null : <Controls.Input
                                    type="text"
                                    name="name"
                                    label="Amount"
                                    id="amount"
                                    value={amount}
                                // onChange={handleInputChange}


                                // value={name}
                                // error={errors.name}
                                // onChange={handleInputChange}
                                />
                            }
                        </Grid>
                    </Grid>
                    {receiptNo === "" ? null :

                        <Grid container>
                            <Grid item>
                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Date</label>
                                    <br />
                                    <DatePicker
                                        value={date}
                                        onChange={(newValue) => setDate(newValue)}
                                        sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "300px", marginTop: "5px", marginRight: "30px" }} />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item>
                                <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Payment Type</label>
                                <br />
                                <FormControl required sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "150px", marginTop: "5px", marginRight: "30px" }}>
                                    <InputLabel id="demo-simple-select-required-label"></InputLabel>

                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={paymentType}
                                        label="Select Payment Type"
                                        onChange={handlePaymentTypeChange}
                                    // style={{}}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                        {
                                            payemntTypes.map(
                                                // item => (<MenuItem key={item.authorId} value={item.authorId}>{item.authorName}</MenuItem>)
                                                paymentType => (<MenuItem key={paymentType.masterConfigarationId} value={paymentType.masterConfigarationId}>{paymentType.name}</MenuItem>)
                                            )
                                        }
                                    </Select>
                                    {/* <FormHelperText>{customerNameAndCode}</FormHelperText> */}
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <label style={{ marginLeft: "10px", width: "120px", marginTop: "10px", marginRight: "30px" }}>Bank</label>
                                <br />

                                <FormControl required sx={{ m: 1, minWidth: 120, marginLeft: "10px", width: "180px", marginTop: "5px", marginRight: "30px" }}>
                                    <InputLabel id="demo-simple-select-required-label"> </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-required-label"
                                        id="demo-simple-select-required"
                                        value={bank}
                                        label="Select Bank"
                                        onChange={handleBanksChange}
                                    // style={{}}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>

                                        {
                                            banks.map(
                                                // item => (<MenuItem key={item.authorId} value={item.authorId}>{item.authorName}</MenuItem>)
                                                bank => (<MenuItem key={bank.masterConfigarationId} value={bank.masterConfigarationId}>{bank.name}</MenuItem>)
                                            )
                                        }
                                    </Select>
                                    {/* <FormHelperText>{customerNameAndCode}</FormHelperText> */}
                                </FormControl>
                            </Grid>
                            <Grid item>
                                {receiptNo === "" ? null : <Controls.Input
                                    type="text"

                                    name="Receipt Number"
                                    label="Receipt Number"
                                    value={receiptNo}
                                // onChange={handleInputChange}


                                // value={name}
                                // error={errors.name}
                                // onChange={handleInputChange}
                                />
                                }


                            </Grid>
                        </Grid>
                    }








                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    {/* <SideBar heading="Bill wise Receipt"></SideBar> */}

                    <div >



                        <div style={{ height: '100%', width: '100%', margin: "20px" }}>
                            <DataGrid
                                rows={salesOutStanding}
                                getRowId={(row) => row.invoiceNo}
                                columns={columns}
                                disableRowSelectionOnClick
                                hideFooterPagination
                                hideFooterSelectedRowCount
                            />
                        </div>
                    </div>
                </div>

            </DialogContent>
            <DialogActions>
                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />


                {!recordForEdit &&
                    <Controls.But
                        type="Submit"
                        text="Save"
                        onClick={handleSubmit}
                    // style={{ margin: "20px" }}
                    // margin='20px'
                    >
                    </Controls.But>

                }
                <Controls.But onClick={closePopUp} sx={{ marginLeft: "50px" }} color="error" text="Close" margin='20px'>Close</Controls.But>
                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />


                <div style={{ flex: '1 0 0', justifyContent: 'space-around', }} />

                <div style={{ flex: '1 0 0' }} />
                <h3><b>sub Total:</b></h3>
                <TextField
                    style={{ marginLeft: "30px", width: "200px", marginRight: "30px" }}
                    type="text"
                    id="subTotal"
                    name="subTotal"
                    label="Sub Total"
                    value={subTotal}
                    // {...(errors.address && {error:true,helperText:errors.address})}
                    InputProps={{
                        readOnly: true,
                    }}
                >

                </TextField>
            </DialogActions>

        </Dialog >
    )
}
export default AddCheque;
