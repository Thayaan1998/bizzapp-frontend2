import React, { useEffect, useState, useRef } from 'react'

import Popup from "../controls/Popup";
import Controls from "../controls/Controls"


import { getSalesAction, deleteSalesAction, insertImportSales } from '../action/salesAction'
// import { CSVLink, CSVDownload } from "react-csv";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { read, utils, writeFile } from 'xlsx';
import SideBar from '../SideBar'
import dayjs from 'dayjs';

import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';


import AddOrEditSales from './AddOrEditSales'



const SalesList = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(false)
    const [title, setTitle] = useState("")

    const [sales, setSales] = useState([])

    const [importSales, setImportSales] = useState([])


    const [sale, setSale] = useState({})


    const closePopUp = () => {
        setOpenPopup(false);
        setSale(null);

    }

    const closePopUp2 = async () => {

        // var sales = await getSalesAction();

        // setSales(sales)
        // setOpenPopup(false);

        window.location.reload(false);

    }

    const getSales = async () => {

        var sales = await getSalesAction();

        setSales(sales)

    }

    useEffect(() => {
        getSales();
    }, []);

    const createOnClick = (event) => {
        setSale(null);
        setRecordForEdit(false)
        setTitle("Create Invoice")
        setOpenPopup(true);


    }
    const csvLink = useRef()

    function ExcelDateToJSDate(serial) {
        var utc_days = Math.floor(serial - 25569);
        var utc_value = utc_days * 86400;
        var date_info = new Date(utc_value * 1000);

        var fractional_day = serial - Math.floor(serial) + 0.0000001;

        var total_seconds = Math.floor(86400 * fractional_day);

        var seconds = total_seconds % 60;

        total_seconds -= seconds;

        return dayjs(new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate() + 1));
    }

    const handleImport = async ($event) => {
        
        // setOpen(true);
        const files = $event.target.files;
        if (window.confirm("Do you want to upload this file")) {
            setOpen(true);
            if (files.length) {
                const file = files[0];
                const reader = new FileReader();
                reader.onload = async (event) => {
                    const wb = read(event.target.result);
                    const sheets = wb.SheetNames;

                    if (sheets.length) {

                        const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                        //    console.log(rows)
                        // setMovies(rows)

                        for (var i = 0; i < rows.length; i++) {

                            var values = {
                                invoiceNo: rows[i]['Invoice No'],
                                customerRefNo: rows[i]['customer RefNo'],
                                masterConfigarationCode: rows[i]['Sales Person'],
                                invoiceDate: ExcelDateToJSDate(rows[i]['Invoice Date']),
                                total: rows[i]['Total']
                            };
                            //    console.log(values)
                            await insertImportSales(values);

                            //console.log(values)
                        }

                    }
                    await getSales();
                    alert("sales Details Added Successfully")
                    setOpen(false);


                }
                reader.readAsArrayBuffer(file);
                // window.location.reload();

            }

        }

    }


    const columns = [

        { field: 'invoiceNo', headerName: 'Invoice No', width: 100, valueGetter: (params) => `${params.row.invoiceNo || ''}` },

        { field: "invoiceDate", headerName: "Invoice Date", width: 100, valueGetter: (params) => `${params.row.invoiceDate1 || ''}` },


        { field: "customerRefNo", headerName: "Customer ", width: 320, valueGetter: (params) => `${params.row.customerRefNo + " | " + params.row.customerName || ''}` },

        { field: "salesPerson", headerName: "Sales Person", width: 120, valueGetter: (params) => `${params.row.code != null ? params.row.code : "" || ''}` },

        { field: "total", headerName: "Total", width: 100, align:'right', valueGetter: (params) => `${params.row.total.toFixed(2) || ''}` },

        {
            field: "edit",
            headerName: "Edit",
            // sortable: false,
            filter: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    setRecordForEdit(true)
                    setTitle("Edit Invoice")
                    setOpenPopup(true);
                    setSale(params.row);

                };

                return <Controls.But onClick={onClick} color="primary" text="Edit">Edit</Controls.But>;
            }
        },
        {
            field: "delete",
            headerName: "Delete",
            sortable: true,
            renderCell: (params) => {
                const onClick = async (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    console.log(params.row);

                    if (window.confirm("Do you want to delete this record")) {
                        // // dispatch(deleteCustomers(selected[0]))
                        // setSelected([]);
                        await deleteSalesAction(params.row);

                        alert("Sales detail deleted successfully");

                        await getSales();

                    }

                };

                return <Controls.But onClick={onClick} color="error" text="Delete">Delete</Controls.But>;
            }
        }
    ];

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };




    return (
        <div>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                // onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <SideBar heading="Sales"></SideBar>


            <div style={{ marginLeft: "260px", marginTop: "50px" }}>
            {/* <Button onClick={handleOpen}>Show backdrop</Button> */}

                <Controls.But
                    text="Create "
                    onClick={() => createOnClick()}
                    color="primary"
                    margin="20px"
                    style={{ height: "30px" }}


                />


                &nbsp;&nbsp;



                <Button
                    variant="contained"
                    component="label"
                    style={{ height: "40px", width: '150px' }}

                >
                    Upload File
                    <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden />
                </Button>
                {/* <Controls.But onClick={getTransactionData} text="Excel"></Controls.But>
            <CSVLink
                data={customers}
                filename='transactions.csv'
                className='hidden'
                ref={csvLink}
                target='_blank'
            /> */}
                {/* <Controls.But><CSVLink data={customers}>Download me</CSVLink></Controls.But> */}


                <br></br>

                <div style={{ height: '100%', width: '85%', margin: "20px" }}>
                    <DataGrid
                        rows={sales}
                        getRowId={(row) => row.salesId}
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
                        pageSizeOptions={[10, 20, 50, 100]}
                    />
                </div>
                <br></br>
                <br></br>





                <Popup
                    title={title}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    closePopUp={closePopUp}

                >

                    <AddOrEditSales
                        sale={sale}
                        recordForEdit={recordForEdit}
                        closePopUp={closePopUp2} />
                </Popup>
            </div>
        </div>
    );
}

export default SalesList;
