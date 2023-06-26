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

import { getAllBillwiseReciptAction, postBillWiseReceiptHeaderAction, postBillWiseReceiptDetailAction, getPericularlBillWiseReceiptDetailAction } from '../action/billwisereciptAction'
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions } from '@mui/material';
import styled from '@emotion/styled';


import Autocomplete from '@mui/material/Autocomplete';

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



const AddBillWiseRecipt = (props) => {
    let { title, openPopup, billwiseRecipt, recordForEdit, closePopUp } = props;

    const [customerNameAndCode, setCustomerNameAndCode] = useState('');
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([]);
    console.log(billwiseRecipt)


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
        if (billwiseRecipt != null && openPopup) {
            setBank(billwiseRecipt.bankId);

        }

    }, []);

    useEffect(() => {
        if (billwiseRecipt != null && openPopup) {
            setPaymentType(billwiseRecipt.paymentId);

        }

    }, []);

    useEffect(() => {
        if (billwiseRecipt != null && openPopup) {
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



    const getSalesOutstansing = async (customerId) => {
        var customers = await getActiveCustomersAction();
        var obj = customers.find(customer => customer.customerId == customerId);

        console.log(obj)
        setCustomer(obj);
        // setCustomerNameAndCode(obj.name + " | " + obj.customerCode + " | " + obj.address)

        let value = {
            "customerRefNo": obj.customerRefNo
        };
        let a = await getSalesOutstandingbyCustomerCodeAction(value);

        setSalesOutStanding(a);

        await loadData(billwiseRecipt.customerId);
        await setBank(billwiseRecipt.bankId);
        await setPaymentType(billwiseRecipt.paymentId);
        document.getElementById("receiptNumber").value = billwiseRecipt.receiptNo;
        document.getElementById("amount").value = billwiseRecipt.amount;


        setSubTotal(billwiseRecipt.subTotal)

        // setstate(
        //     {reciptNo:billwiseRecipt.reciptNo,
        //      chequeNo:billwiseRecipt.chequeNo,
        //      amount:billwiseRecipt.amount
        //     }

        // )

        if (billwiseRecipt.chequeNo != "") {
            setShowCheque(true)
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
        if (billwiseRecipt != null && openPopup) {

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
               
                var values = {
                    receiptNo: document.getElementById("receiptNumber").value,
                    receiptDate: date,
                    customerId: customer.customerId,
                    paymentId: paymentType,
                    bankId: bank,
                    amount: document.getElementById("amount").value,
                    subTotal: subTotal,
                    chequeNo: showCheque?document.getElementById("chequeNumber").value:""
                };



                let insert = await postBillWiseReceiptHeaderAction(values);

                // alert(insert=="perticular Sales code already added"?"perticular Sales code already exsist":"sales Details Added Successfully")


                if (insert == "Added Successfully") {
                    for (var i = 0; i < checkList.length; i++) {
                        if (document.getElementById(checkList[i]).value != "") {
                            values = {
                                receiptNo: document.getElementById("receiptNumber").value,
                                invoiceNo: checkList[i],
                                amount: document.getElementById(checkList[i]).value

                            }
                            await postBillWiseReceiptDetailAction(values)

                            var getBalane = salesOutStanding.find(customer => customer.invoiceNo == checkList[i]).balance;

                            const result = parseFloat(getBalane) - parseFloat(document.getElementById(checkList[i]).value);

                            var getreceiptAmount = salesOutStanding.find(customer => customer.invoiceNo == checkList[i]).receiptAmount;
                            const result2 = parseFloat(getreceiptAmount) + parseFloat(document.getElementById(checkList[i]).value);

                            var values2 = {
                                invoiceNo: checkList[i],
                                balance: result,
                                receiptAmount: result2
                            }

                            await updateSalesOutstandingAction(values2);
                            alert("Bill Wise Recipt details added successfully")
                        }

                    }
                    closePopUp(false);
                }
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

    const { reciptNo, chequeNo, amount } = state
    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setstate({ ...state, [name]: value })
        //  validate({ [name]: value })

    }


    const columns = [
        {
            field: "checked",
            headerName: "",
            width: 50,
            // sortable: false,
            filter: false,
            renderCell: (params) => {
                const handleChange = (e) => {
                    e.stopPropagation();
                    let arr1 = checkList

                    let found = checkList.find(element => element == params.row.invoiceNo);

                    if (found == undefined) {
                        arr1.push(params.row.invoiceNo)
                    } else {
                        const index = arr1.indexOf(params.row.invoiceNo);
                        if (index > -1) {
                            arr1.splice(index, 1);
                        }
                        document.getElementById(params.row.invoiceNo).value = "";
                    }

                    setCheckList(arr1)
                    setSalesOutStanding(salesOutStanding);

                };

                if (billwiseRecipt != null && openPopup) {
                    let found = checkList.find(element => element == params.row.invoiceNo);

                    return <Checkbox
                        // checked={checked}
                        checked={found == undefined ? false : true}
                        id="checkbox"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />;
                } else {
                    return <Checkbox
                        // checked={checked}
                        //checked={false}
                        id="checkbox"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />;
                }

            }
        },

        { field: 'invoiceNo', headerName: 'Invoice No', width: 150, valueGetter: (params) => `${params.row.invoiceNo || ''}` },

        { field: "invoiceDate", headerName: "Invoice Date", width: 250, valueGetter: (params) => `${params.row.invoiceDate1 || ''}` },

        { field: "invoiceAmount", headerName: "Invoice Amount", width: 150, valueGetter: (params) => `${params.row.invoiceAmount || ''}` },

        { field: "receiptAmount", headerName: "Paid Amount", width: 200, valueGetter: (params) => `${params.row.receiptAmount != null ? params.row.receiptAmount : "0" || ''}` },

        { field: "balance", headerName: "Balance", width: 200, valueGetter: (params) => `${params.row.balance != null ? params.row.balance : "0" || ''}` },

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
                            setSubTotal(total);
                            return;
                        } else {
                            var total = 0;

                            for (var i = 0; i < checkList.length; i++) {
                                if (document.getElementById(checkList[i]).value != "") {

                                    total = parseFloat(document.getElementById(checkList[i]).value) + total;
                                }
                            }
                            setSubTotal(total);
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
                        value={found == undefined ? "" : found.amount}
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


    return (
        <Dialog open={openPopup} maxWidth="xl" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle style={{ marginLeft: "0px" }}>
                <div >
                    <Typography variant="h4" component="div" style={{ flexGrow: 1, marginLeft: "30px" }}>
                        {title}
                    </Typography>

                    {/* <IconButton  style={{marginRight:"40px"}} onClick={closePopUp}>
                        <CloseIcon />
                    </IconButton> */}
                    <br></br>
                    <Controls.Input
                        type="text"
                        name="Receipt Number"
                        label="Receipt Number"
                        id="receiptNumber"
                        //value={reciptNo}
                        onChange={handleInputChange}

                    // value={name}
                    // error={errors.name}
                    // onChange={handleInputChange}
                    />
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        value={customer}
                        onChange={async (event, newValue) => {

                            setCustomer(newValue);

                            if (newValue != null) {
                                let value = {
                                    "customerRefNo": newValue.customerRefNo
                                };
                                let a = await getSalesOutstandingbyCustomerCodeAction(value);

                                setSalesOutStanding(a);
                            } else {
                                setSalesOutStanding([]);
                            }

                        }}
                        getOptionLabel={(option) => {
                            return option != "" ? option.customerRefNo + " | " + option.label : "";

                        }
                        }
                        options={customers}
                        sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "400px", marginTop: "20px", marginRight: "30px" }}
                        renderInput={(params) => <TextField {...params} label="Select Customer" />}

                    />




                    {/* <br></br> */}
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <DatePicker
                            value={date}
                            onChange={(newValue) => setDate(newValue)}
                            sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "400px", marginTop: "20px", marginRight: "30px" }} />
                    </LocalizationProvider>
                    <Controls.Input
                        type="text"
                        name="name"
                        label="Amount"
                        id="amount"
                        //value={amount}
                        onChange={handleInputChange}


                    // value={name}
                    // error={errors.name}
                    // onChange={handleInputChange}
                    />


                    <br></br>


                    <FormControl required sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "400px", marginTop: "20px", marginRight: "30px" }}>
                        <InputLabel id="demo-simple-select-required-label">Select Payment Type</InputLabel>
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

                    <FormControl required sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "400px", marginTop: "20px", marginRight: "30px" }}>
                        <InputLabel id="demo-simple-select-required-label"> Select Bank</InputLabel>
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
                    {showCheque &&
                        <Controls.Input
                            type="text"
                            name="Cheque Number"
                            label="Cheque Number"
                            id="chequeNumber"
                            //  value={chequeNo}
                            onChange={handleInputChange}

                        // error={errors.name}
                        // onChange={handleInputChange}
                        />
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
export default AddBillWiseRecipt;
