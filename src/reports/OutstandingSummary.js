
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
import { getDetailOutStanding } from '../action/salesOutstandingAction'

import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Controls from "../controls/Controls";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { Grid, Button } from "@mui/material";
import { CSVLink } from "react-csv";
import { getCustomersAction } from '../action/customerAction'


import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call



const OutstandingSummary = () => {

    const [fromDate, setFromDate] = useState(dayjs(new Date()));

    const [toDate, setToDate] = useState(dayjs(new Date()));


    const [dateType, setDateType] = useState(dayjs(new Date()));

    const [showDates, setShowDates] = React.useState(false)


    const [paymentType, setPaymentType] = useState('');
    //  const [paymentType2, setPaymentType2] = useState('');

    const [payemntTypes, setPayemntTypes] = useState([]);
    //const [salesPersons, setSalesPersons] = React.useState([]);

    const [recipts, setRecipts] = useState([])
    const [customers, setCustomers] = React.useState('');


    const handleDateTypeChange = async (event) => {
        setDateType(event.target.value);
        setShowDates(event.target.value == "Custom Range");
    };

    const getPayemntTypes = async () => {

        var payemntTypes = await getPaymentTypeAction();

        setPayemntTypes(payemntTypes)

    }

    const getCustomers = async () => {

        var customers = await getCustomersAction();

        setCustomers(customers)
    }

    useEffect(() => {
        getPayemntTypes();

    }, []);
    useEffect(() => {
        getCustomers();

    }, []);



    const generatePDF = () => {
        const doc = new jsPDF('l', 'mm', [297, 210]);

        const tableColumn1 = ["Invoice No", "Invoice Date", "Customer", "Customer RefNo", "0-7 Days", "8-15 Days", "16-30 Days", "30-60 Days", "Above 60 Days"];
        const tableColumn2 = ["Customer", "Customer RefNo", "0-7 Days", "8-15 Days", "16-30 Days", "30-60 Days", "Above 60 Days"];

        const tableRows1 = [];
        const tableRows2 = [];


        const date = Date().split("OutStanding Summary");
        // we use a date string to generate our filename.
        const dateStr = date[0] + date[1] + date[2] + date[3] + date[4];
        doc.text(15, 20, 'OutStanding Report');


        doc.setFontSize(11);
        doc.text(20, 30, 'Report Generated As ' + dayjs(fromDate).format('YYYY-MM-DD'));

        recipts.forEach(recipt => {

            const ticketData = [
                recipt.invoiceNo,
                recipt.invoiceDate,
                customers.find(customer => customer.customerRefNo == recipt.customerRefNo).name,
                recipt.customerRefNo,
                recipt.datediff <= 7 ? recipt.balance.toFixed(2) : '',
                recipt.datediff > 8 && recipt.datediff <= 15 ? recipt.balance.toFixed(2) : '',
                recipt.datediff > 15 && recipt.datediff <= 30 ? recipt.balance.toFixed(2) : '',
                recipt.datediff > 30 && recipt.datediff <= 60 ? recipt.balance.toFixed(2) : '',
                recipt.datediff > 60 ? recipt.balance.toFixed(2) : ''

            ];
            tableRows1.push(ticketData);


            const ticketData2 = [
                customers.find(customer => customer.customerRefNo == recipt.customerRefNo).name,
                recipt.customerRefNo,
                recipt.datediff <= 7 ? recipt.balance.toFixed(2) : '',
                recipt.datediff > 8 && recipt.datediff <= 15 ? recipt.balance.toFixed(2) : '',
                recipt.datediff > 15 && recipt.datediff <= 30 ? recipt.balance.toFixed(2) : '',
                recipt.datediff > 30 && recipt.datediff <= 60 ? recipt.balance.toFixed(2) : '',
                recipt.datediff > 60 ? recipt.balance.toFixed(2) : ''

            ];
            tableRows2.push(ticketData2);
        });
        if (paymentType != '') {
            doc.text(20, 40, 'Report Type:');
            doc.text(50, 40, paymentType);
            doc.autoTable(paymentType == "Detail" ? tableColumn1 : tableColumn2, paymentType == "Detail" ? tableRows1 : tableRows2, { startY: 50,   styles: {
                halign: 'right'
            }, });

        } else {
            doc.autoTable(paymentType == "Detail" ? tableColumn1 : tableColumn2, paymentType == "Detail" ? tableRows1 : tableRows2, { startY: 40,   styles: {
                halign: 'right'
            }, },);

        }

        // else if (dateType == "Last 7 Days") {
        //     doc.setFontSize(11); doc.text(20, 30, 'Report Generated By Last 7 Days');
        //     if (paymentType != '') {
        //         doc.text(20, 40, 'Report Type:');
        //         doc.text(50, 40, paymentType);
        //     }
        // } else if (dateType == "Last 15 Days") {
        //     doc.setFontSize(11); doc.text(20, 30, 'Report Generated By Last 15 Days');
        //     if (paymentType != '') {
        //         doc.text(20, 40, 'Report Type:');
        //         doc.text(50, 40, paymentType);
        //     }
        // } else if (dateType == "Last 1 Month") {
        //     doc.setFontSize(11);
        //     doc.text(20, 30, 'Report Generated By Last 1 Month');
        //     if (paymentType != '') {
        //         doc.text(20, 40, 'Report Type:');
        //         doc.text(50, 40, paymentType);
        //     }
        // } else if (dateType == "Custom Range") {
        //     doc.setFontSize(11);
        //     doc.text(20, 30, 'From Date:');
        //     doc.text(50, 30, dayjs(fromDate).format('YYYY-MM-DD'));

        //     doc.text(20, 40, 'To Date:');
        //     doc.text(50, 40, dayjs(toDate).format('YYYY-MM-DD'));
        //     if (paymentType != '') {
        //         doc.text(20, 50, 'Report Type:');
        //         doc.text(50, 50, paymentType);
        //     }
        // }








        // startY is basically margin-top


        // doc.text("ss", 14, 15);
        // we define the name of our PDF file.
        doc.save(`outstanding report_${dateStr}.pdf`);
    };
    // const csvLink = useRef()

    //  const getTransactionData = async () => {

    //     csvLink.current.link.click()
    // }
    const zeroPad = (num, places) => String(num).padStart(places, '0')


    const getDateByWithoutRangeSales = async () => {

        var date = ""
        if (dateType == "Last 1 Day") {
            date = "invoiceDate > now() - INTERVAL 24 hour"
        }
        else if (dateType == "Last 7 Days") {
            date = "invoiceDate > now() - INTERVAL 7 day"
        } else if (dateType == "Last 15 Days") {
            date = "invoiceDate > now() - INTERVAL 15 day"
        } else if (dateType == "Last 1 Month") {
            date = "invoiceDate > now() - INTERVAL 1 month"
        } else if (dateType == "Custom Range") {
            date = " invoiceDate >=  CONVERT('" + dayjs(fromDate).format('YYYY-MM-DD') + "', DATE) AND invoiceDate <=  CONVERT('" + dayjs(toDate).format('YYYY-MM-DD') + "', DATE)";

        }
        var values = {
            dateType: date,
            reportType: paymentType == undefined ? '' : paymentType,
        }


        var sales = await getDetailOutStanding(values);

        for (var i = 0; i < sales.length; i++) {
            console.log(i)
            if(i==101){
                debugger
                sales[i]["customerName"] = customers.find(customer => customer.customerRefNo == sales[i].customerRefNo).name;
                sales[i]["customerRefNo"] = customers.find(customer => customer.customerRefNo == sales[i].customerRefNo).customerRefNo;
            }
               

        }
        console.log(sales);

        //     let already=[]
        //     for(var j=0;j<sales.length;j++){

        //        let a= already.find(e=>e==sales[j]["customerName"])

        //        if(a==null){
        //         already.push(sales[j]["customerName"])
        //         sales.push({"customerName":sales[j]["customerName"],"invoiceDate":"a","invoiceNo":"a"+j,"customerRefNo":"a"+j})
        //        }

        //     }

        //     console.log(already)

        //  //   sales.sort((a,b) => a.customerName - b.customerName);


        //     let sales2=sales.sort(dynamicSortMultiple("customerName","invoiceNo"))
        //     console.log(sales2 )
        setRecipts(sales)

    }

    function dynamicSortMultiple() {
        /*
         * save the arguments object as it will be overwritten
         * note that arguments object is an array-like object
         * consisting of the names of the properties to sort by
         */
        var props = arguments;
        return function (obj1, obj2) {
            var i = 0, result = 0, numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
             * as long as we have extra properties to compare
             */
            while (result === 0 && i < numberOfProperties) {
                result = dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        }
    }

    function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a, b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }


    const columns = [


        { field: 'invoiceNo', headerName: 'Invoice No', width: 100, valueGetter: (params) => `${params.row.invoiceDate != "a" ? params.row.invoiceNo : "" || ''}` },

        { field: "invoiceDate", headerName: "Invoice Date", width: 100, valueGetter: (params) => `${params.row.invoiceDate != "a" ? params.row.invoiceDate : "" || ''}` },

        { field: "customerCode", headerName: "Customer RefNo", width: 130, valueGetter: (params) => `${params.row.customerRefNo}` },

        { field: "customerRefNo", headerName: "Customer", width: 200, valueGetter: (params) => `${customers.find(customer => customer.customerRefNo == params.row.customerRefNo).name}` },

        { field: "7days", headerName: "0-7Days", align: 'right', width: 120, valueGetter: (params) => `${params.row.invoiceDate != "a" ? (params.row.datediff <= 7 ? params.row.balance.toFixed(2) : '') : '' || ''}` },

        { field: "30days", headerName: "8-15days", align: 'right', width: 120, valueGetter: (params) => `${params.row.invoiceDate != "a" ? (params.row.datediff > 7 && params.row.datediff <= 14 ? params.row.balance.toFixed(2) : '') : '' || ''}` },

        { field: "60days", headerName: "16-30days", align: 'right', width: 120, valueGetter: (params) => `${params.row.invoiceDate != "a" ? (params.row.datediff > 14 && params.row.datediff <= 30 ? params.row.balance.toFixed(2) : '') : '' || ''}` },

        { field: "90days", headerName: "31-60days", align: 'right', width: 120, valueGetter: (params) => ` ${params.row.invoiceDate != "a" ? (params.row.datediff > 30 && params.row.datediff <= 60 ? params.row.balance.toFixed(2) : '') : '' || ''}` },

        { field: "above90", headerName: "Above 60 Days", align: 'right', width: 120, valueGetter: (params) => ` ${params.row.invoiceDate != "a" ? (params.row.datediff > 60 ? params.row.balance.toFixed(2) : '') : '' || ''}` },



    ];

    const columns2 = [


        // { field: 'invoiceNo', headerName: 'Invoice No', width: 150, valueGetter: (params) => `${params.row.invoiceNo || ''}` },

        // { field: "invoiceDate", headerName: "invoice Date", width: 150, valueGetter: (params) => `${params.row.invoiceDate || ''}` },


        { field: "customerRefNo", headerName: "Customer", width: 200, valueGetter: (params) => `${customers.find(customer => customer.customerRefNo == params.row.customerRefNo).name}` },

        { field: "customerCode", headerName: "Customer RefNo", width: 200, valueGetter: (params) => `${params.row.customerRefNo}` },

        { field: "7days", headerName: "0-7Days", width: 200, align: 'right', valueGetter: (params) => `${params.row.invoiceDate != "a" ? (params.row.datediff <= 7 ? params.row.balance.toFixed(2) : '') : '' || ''}` },

        { field: "30days", headerName: "8-15days", width: 120, align: 'right', valueGetter: (params) => `${params.row.invoiceDate != "a" ? (params.row.datediff > 7 && params.row.datediff <= 14 ? params.row.balance.toFixed(2) : '') : '' || ''}` },

        { field: "60days", headerName: "16-30days", width: 120, align: 'right', valueGetter: (params) => `${params.row.invoiceDate != "a" ? (params.row.datediff > 14 && params.row.datediff <= 30 ? params.row.balance.toFixed(2) : '') : '' || ''}` },

        { field: "90days", headerName: "31-60days", width: 120, align: 'right', valueGetter: (params) => ` ${params.row.invoiceDate != "a" ? (params.row.datediff > 30 && params.row.datediff <= 60 ? params.row.balance.toFixed(2) : '') : '' || ''}` },

        { field: "above90", headerName: "Above 60 Days", width: 120, align: 'right', valueGetter: (params) => ` ${params.row.invoiceDate != "a" ? (params.row.datediff > 60 ? params.row.balance.toFixed(2) : '') : '' || ''}` },



    ];


    const handleReportTypeChange = async (event) => {

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
            <SideBar heading="OutStanding Summary"></SideBar>

            <div style={{ marginLeft: "260px", marginTop: "50px" }}>


                <Grid container>
                    <Grid item>
                        <label style={{ marginLeft: "30px", width: "200px", marginTop: "10px", marginRight: "30px" }}>Date</label>
                        <br />
                        <FormControl required sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "200px", marginTop: "5px", marginRight: "30px" }}>
                            <InputLabel id="demo-simple-select-required-label"></InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={dateType}
                                label="Select Payment Type"
                                onChange={handleDateTypeChange}
                            // style={{}}
                            >
                                <MenuItem key="1 Day" value="Last 1 Day">As  Today</MenuItem>
                                {/* <MenuItem key="7 Days" value="Last 7 Days">Last 7 Days</MenuItem>
                                <MenuItem key="15 Days" value="Last 15 Days">Last 15 Days</MenuItem>
                                <MenuItem key="1 Month" value="Last 1 Month">Last 1 Month</MenuItem>
                                <MenuItem key="custom Range" value="Custom Range">Custom Range</MenuItem> */}
                            </Select>

                        </FormControl>
                    </Grid>

                    <Grid item >
                        <label style={{ marginLeft: "30px", width: "300px", marginTop: "10px", marginRight: "30px" }}>Report Type</label>
                        <br />
                        <FormControl required sx={{ m: 1, minWidth: 120, marginLeft: "30px", width: "220px", marginTop: "5px", marginRight: "30px" }}>
                            <InputLabel id="demo-simple-select-required-label"></InputLabel>
                            <Select
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                value={paymentType}
                                label="Select Report Type"
                                onChange={handleReportTypeChange}
                            // style={{}}
                            >
                                <MenuItem key="detail" value="Detail">Detail</MenuItem>
                                <MenuItem key="summary" value="Summary">Summary</MenuItem>
                            </Select>

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
                        getRowId={(row) => paymentType != 'Summary' ? row.invoiceNo : row.customerRefNo}
                        columns={paymentType != 'Summary' ? columns : columns2}
                        disableRowSelectionOnClick
                        slots={{
                            toolbar: GridToolbar,
                        }}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        pageSizeOptions={[10, 20, 50, 100]}
                    />
                </div>


            </div>
        </div>
    );


}

export default OutstandingSummary;
