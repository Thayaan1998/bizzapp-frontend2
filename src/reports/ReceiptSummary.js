
import React, { useEffect, useState, useRef } from 'react'

import SideBar from '../SideBar'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { getPaymentTypeAction } from '../action/masterConfigarionsAction'
import { getBillWiseReciptWithDateRangeAction } from '../action/billwisereciptAction'

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Controls from "../controls/Controls";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Grid, Button } from "@mui/material";
import { CSVLink } from "react-csv";

import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call



const ReceiptSummary = () => {

    const [fromDate, setFromDate] = useState(dayjs(new Date()));

    const [toDate, setToDate] = useState(dayjs(new Date()));


    const [dateType, setDateType] = useState(dayjs(new Date()));

    const [showDates, setShowDates] = React.useState(false)


    const [paymentType, setPaymentType] = useState('');
    const [paymentType2, setPaymentType2] = useState('');

    const [payemntTypes, setPayemntTypes] = useState([]);
    //const [salesPersons, setSalesPersons] = React.useState([]);

    const [recipts, setRecipts] = useState([])

    const handleDateTypeChange = async (event) => {
        setDateType(event.target.value);
        setShowDates(event.target.value == "Custom Range");
    };

    const getPayemntTypes = async () => {

        var payemntTypes = await getPaymentTypeAction();

        setPayemntTypes(payemntTypes)

    }
    useEffect(() => {
        getPayemntTypes();

    }, []);



    const generatePDF = () => {
        const doc = new jsPDF('l', 'mm', [297, 210]);

        const tableColumn = ["Receipt No", "Receipt Date", "customer Name", "Bank", "ChequeNo", "Payment", "Amount"];
        const tableRows = [];


        const date = Date().split(" ");
        // we use a date string to generate our filename.
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        // ticket title. and margin-top + margin-left
        // doc.text("Sales Details", 14, 15);
        doc.text(15, 20, 'Receipt Summary');
        
        if (dateType == "Last 1 Day") {
            doc.setFontSize(11);
            doc.text(20, 30, 'Report Generated By Last 1 Day');
            // if (paymentType != '') {
            //     doc.text(20, 40, 'Payment Type:');
            //     doc.text(50, 40,  payemntTypes.find(paymentType => paymentType.masterConfigarationId == paymentType).name);
            // }
        }
        else if (dateType == "Last 7 Days") {
            doc.setFontSize(11); doc.text(20, 30, 'Report Generated By Last 7 Days');
            // if (paymentType != '') {
            //     doc.text(20, 40, 'Payment Type:');
            //     doc.text(50, 40,  payemntTypes.find(paymentType => paymentType.masterConfigarationId == paymentType).name);
            // }
        } else if (dateType == "Last 15 Days") {
            doc.setFontSize(11); doc.text(20, 30, 'Report Generated By Last 15 Days');
            // if (paymentType != '') {
            //     doc.text(20, 40, 'Report Type:');
            //     doc.text(50, 40,  payemntTypes.find(paymentType => paymentType.masterConfigarationId == paymentType).name);
            // }
        } else if (dateType == "Last 1 Month") {
            doc.setFontSize(11);
            doc.text(20, 30, 'Report Generated By Last 1 Month');
            // if (paymentType != '') {
            //     doc.text(20, 40, 'Payment Type:');
            //     doc.text(50, 40,  payemntTypes.find(paymentType => paymentType.masterConfigarationId == paymentType).name);
            // }
        } else if (dateType == "Custom Range") {
            doc.setFontSize(11);
            doc.text(20, 30, 'From Date:');
            doc.text(50, 30, dayjs(fromDate).format('YYYY-MM-DD'));

            doc.text(20, 40, 'To Date:');
            doc.text(50, 40, dayjs(toDate).format('YYYY-MM-DD'));
            
            // if (paymentType != '') {
            //     doc.text(20, 50, 'Payment Type:');
            //     doc.text(50, 50,  payemntTypes.find(paymentType => paymentType.masterConfigarationId == paymentType).name);
            // }
        }

        recipts.forEach(recipt => {

            const ticketData = [
                recipt.receiptNo,
                recipt.receiptDate,
                recipt.customerName,
                recipt.bank,
                recipt.chequeNo,
                payemntTypes.find(paymentType => paymentType.masterConfigarationId == recipt.paymentId).name,
                recipt.amount,

            ];
            tableRows.push(ticketData);
        });


        // startY is basically margin-top
        doc.autoTable(tableColumn, tableRows, { startY: 50 });

        // doc.text("ss", 14, 15);
        // we define the name of our PDF file.
        doc.save(`report_${dateStr}.pdf`);
    };
    // const csvLink = useRef()

    //  const getTransactionData = async () => {

    //     csvLink.current.link.click()
    // }


    const getDateByWithoutRangeSales = async () => {

        var date = ""
        if (dateType == "Last 1 Day") {
            date = "receiptDate > now() - INTERVAL 24 hour"
        }
        else if (dateType == "Last 7 Days") {
            date = "receiptDate > now() - INTERVAL 7 day"
        } else if (dateType == "Last 15 Days") {
            date = "receiptDate > now() - INTERVAL 15 day"
        } else if (dateType == "Last 1 Month") {
            date = "receiptDate > now() - INTERVAL 1 month"
        } else if (dateType == "Custom Range") {
            date = " receiptDate >=  CONVERT('" + dayjs(fromDate).format('YYYY-MM-DD') + "', DATE) AND receiptDate <=  CONVERT('" + dayjs(toDate).format('YYYY-MM-DD') + "', DATE)";

        }
        var values = {
            dateType: date,
            paymentId: paymentType,
        }


        var sales = await getBillWiseReciptWithDateRangeAction(values);
        //    console.log(sales)
        setRecipts(sales)

    }


    const columns = [

        { field: 'receiptNo', headerName: 'Receipt No', width: 150, valueGetter: (params) => `${params.row.receiptNo || ''}` },

        { field: "receiptDate", headerName: "invoice Date", width: 150, valueGetter: (params) => `${params.row.receiptDate || ''}` },


        { field: "customerName", headerName: "customer", width: 200, valueGetter: (params) => `${params.row.customerName}` },

        { field: "bank", headerName: "Bank", width: 200, valueGetter: (params) => `${params.row.bank || ''}` },

        { field: "chequeNo", headerName: "Cheque No", width: 150, valueGetter: (params) => `${params.row.chequeNo || ''}` },

        { field: "paymentType", headerName: "Payment Type", width: 150, valueGetter: (params) => `${payemntTypes.find(paymentType => paymentType.masterConfigarationId == params.row.paymentId).name || ''}` },


        { field: "amount", headerName: "Amount", width: 150, valueGetter: (params) => `${params.row.amount || ''}` },




    ];


    const handlePaymentTypeChange = async (event) => {

        setPaymentType(event.target.value);
    };

    const Results = () => (
        <div id="results" className="search-results">
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                    label="From Date"
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)}
                    sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "220px", marginTop: "20px", marginRight: "30px" }} />

            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DatePicker
                    label="To Date"
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "220px", marginTop: "20px", marginRight: "30px" }} />

            </LocalizationProvider>
        </div>
    )

    return (
        <div>
            <SideBar heading="Receipt Summary"></SideBar>

            <div style={{ marginLeft: "260px", marginTop: "50px" }}>


                <Grid container>
                    <Grid item>
                        <FormControl required sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "220px", marginTop: "20px", marginRight: "30px" }}>
                            <InputLabel id="demo-simple-select-required-label">Date</InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={dateType}
                                label="Select Payment Type"
                                onChange={handleDateTypeChange}
                            // style={{}}
                            >
                                <MenuItem key="1 Day" value="Last 1 Day">Last 1 Day</MenuItem>
                                <MenuItem key="7 Days" value="Last 7 Days">Last 7 Days</MenuItem>
                                <MenuItem key="15 Days" value="Last 15 Days">Last 15 Days</MenuItem>
                                <MenuItem key="1 Month" value="Last 1 Month">Last 1 Month</MenuItem>
                                <MenuItem key="custom Range" value="Custom Range">Custom Range</MenuItem>
                            </Select>

                        </FormControl>
                    </Grid>

                    <Grid item alignItems="stretch" style={{ display: "flex" }}>
                        <FormControl required sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "220px", marginTop: "20px", marginRight: "30px" }}>
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

                    </Grid>
                    <Grid item alignItems="stretch" style={{ display: "flex" }}>
                        <Button
                            type="Submit"
                            text="Save"
                            onClick={getDateByWithoutRangeSales}
                            style={{ height: '55px', width: '100px', marginTop: "20px" }}
                            color="primary"
                            variant="contained"
                            margin='40px'
                        >search</Button>
                    </Grid>
                </Grid>



                {showDates ? <Results /> : null}

                <br></br>
                <Button
                    type="Submit"
                    text="Save"
                    onClick={generatePDF}
                    style={{ height: '40px', width: '150px', marginLeft: "25px" }}
                    color="primary"
                    variant="contained"
                    margin='40px'
                >Generate PDF</Button>
                {/* <Controls.But onClick={getTransactionData} text="Excel"></Controls.But> */}

                {/* <Controls.But><CSVLink data={sales}>Download me</CSVLink></Controls.But> */}

                <div style={{ height: '100%', width: '95%', margin: "20px" }}>
                    <DataGrid
                        rows={recipts}
                        getRowId={(row) => row.receiptNo}
                        columns={columns}
                        disableRowSelectionOnClick
                        slots={{
                            toolbar: GridToolbar,
                        }}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 20]}
                    />
                </div>


            </div>
        </div>
    );


}

export default ReceiptSummary;
