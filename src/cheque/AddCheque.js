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

import { postChequeHeaderAction,postChequeDetailAction,getPericularlChequetDetailAction} from '../action/billwisereciptAction'



const AddCheque = (props) => {
    let { billwiseRecipt, recordForEdit, closePopUp } = props;
    const [customerNameAndCode, setCustomerNameAndCode] = useState('');
    const [customer, setCustomer] = useState('');
    const [customers, setCustomers] = useState([]);

    const [paymentType, setPaymentType] = useState('');
    const [payemntTypes, setPayemntTypes] = useState([]);

    const [bank, setBank] = useState('');

    const [banks, setBanks] = useState([]);



    const [salesOutStanding, setSalesOutStanding] = React.useState([]);

    const [getAmount, setgetAmount] = React.useState([]);


    const [checkList, setCheckList] = React.useState([]);

    const [date, setDate] = React.useState(dayjs(new Date()));

    useEffect(() => {

        debugger
        if (billwiseRecipt != null) {
            getSalesOutstansing(billwiseRecipt.customerId);

        }

    }, []);


    useEffect(() => {
        if (billwiseRecipt != null) {
            loadData(billwiseRecipt.customerId);
        }
    }, []);
    const loadData = async () => {

        var a = {
            "receiptNo": billwiseRecipt.receiptNo
        };
        var getBillWiseRecipts = await getPericularlChequetDetailAction(a);

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
        if (billwiseRecipt != null) {
            setBank(billwiseRecipt.bankId);

        }

    }, []);

    useEffect(() => {
        if (billwiseRecipt != null) {
            setPaymentType(billwiseRecipt.paymentId);

        }

    }, []);

    useEffect(() => {
        if (billwiseRecipt != null) {
            document.getElementById("receiptNumber").value = billwiseRecipt.receiptNo;
            document.getElementById("amount").value = billwiseRecipt.amount;



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

    const handleCustomerChange = async (event) => {


        getSalesOutstansing(event.target.value)
    };

    const getSalesOutstansing = async (customerId) => {
        var customers = await getActiveCustomersAction();
        var obj = customers.find(customer => customer.customerId == customerId);

        console.log(obj)
        setCustomer(customerId);
        // setCustomerNameAndCode(obj.name + " | " + obj.customerCode + " | " + obj.address)

        let value = {
            "customerCode": obj.customerCode
        };
        let a = await getSalesOutstandingbyCustomerCodeAction(value);

        setSalesOutStanding(a);

    }

    const handlePaymentTypeChange = async (event) => {


        setPaymentType(event.target.value);
    };

    const handleBanksChange = async (event) => {


        setBank(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            var values = {
                receiptNo: document.getElementById("receiptNumber").value,
                receiptDate: date,
                customerId: customer,
                paymentId: paymentType,
                bankId: bank,
                amount: document.getElementById("amount").value
            };



            let insert = await postChequeHeaderAction(values);

            // alert(insert=="perticular Sales code already added"?"perticular Sales code already exsist":"sales Details Added Successfully")


            if (insert == "Added Successfully") {
                for (var i = 0; i < checkList.length; i++) {
                    values = {
                        receiptNo: document.getElementById("receiptNumber").value,
                        invoiceNo: checkList[i],
                        amount: document.getElementById(checkList[i]).value

                    }
                    await postChequeDetailAction(values)

                    var getBalane = salesOutStanding.find(customer => customer.invoiceNo == checkList[i]).balance;

                    const result = parseFloat(getBalane) - parseFloat(document.getElementById(checkList[i]).value);

                    var values2 = {
                        invoiceNo: checkList[i],
                        balance: result
                    }

                    await updateSalesOutstandingAction(values2);
                    alert("Cheque details added successfully")
                }
                closePopUp(false);
            }




        } catch (error) {

            throw error;

        }
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

                if (billwiseRecipt != null) {
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

        { field: "paidAmount", headerName: "Paid Amount", width: 200, valueGetter: (params) => `${params.row.paidAmount != null ? params.row.paidAmount : "0" || ''}` },

        { field: "balance", headerName: "Balance", width: 200, valueGetter: (params) => `${params.row.balance || ''}` },

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
                            return;
                        }
                    }


                };
                if (billwiseRecipt != null) {
                    let found = getAmount.find(element => element.invoiceNo == params.row.invoiceNo);

                    console.log(found)
                    return <TextField
                        type="number"
                        id={params.row.invoiceNo}
                        name="name"
                        label="Enter Amount"
                        height="10px"
                        size="small"
                        value={found == undefined ?"":found.amount}
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

    return (
        <div>
            {/* <SideBar heading="Bill wise Receipt"></SideBar> */}

            <div >
                <Controls.Input
                    type="text"
                    name="Receipt Number"
                    label="Cheque Number"
                    id="receiptNumber"
                // value={name}
                // error={errors.name}
                // onChange={handleInputChange}
                />


                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DatePicker
                        value={date}
                        onChange={(newValue) => setDate(newValue)}
                        sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "400px", marginTop: "20px", marginRight: "30px" }} />
                </LocalizationProvider>

                <br></br>
                <FormControl required sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "400px", marginTop: "20px", marginRight: "30px" }}>
                    <InputLabel id="demo-simple-select-required-label"> Select Customer</InputLabel>
                    <Select
                        labelId="demo-simple-select-required-label"
                        id="demo-simple-select-required"
                        value={customer}
                        label="Select Customer"
                        onChange={handleCustomerChange}
                    // style={{}}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>

                        {
                            customers.map(
                                // item => (<MenuItem key={item.authorId} value={item.authorId}>{item.authorName}</MenuItem>)
                                customer => (<MenuItem key={customer.customerId} value={customer.customerId}>{customer.name}</MenuItem>)
                            )
                        }
                    </Select>
                    <FormHelperText>{customerNameAndCode}</FormHelperText>
                </FormControl>
                <Controls.Input
                    type="text"
                    name="name"
                    label="Amount"
                    id="amount"
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


                <div style={{ height: '100%', width: '100%', margin: "20px" }}>
                    <DataGrid
                        rows={salesOutStanding}
                        getRowId={(row) => row.invoiceNo}
                        columns={columns}
                        disableRowSelectionOnClick
                        // slots={{
                        //     toolbar: GridToolbar,
                        // }}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15]}
                    />
                </div>

                <Controls.But
                    type="Submit"
                    text="Save"
                    onClick={handleSubmit}
                    // style={{ margin: "20px" }}
                    margin='20px'
                >



                </Controls.But>
            </div>
        </div>)
}
export default AddCheque;
