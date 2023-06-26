import React, { useEffect, useState, useRef } from 'react'

import Popup from "../controls/Popup";
import Controls from "../controls/Controls"

import Switch from '@mui/material/Switch';
import { getCustomersAction, deleteCustomersAction } from '../action/customerAction'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import SideBar from '../SideBar'
import DeleteIcon from '@mui/icons-material/Delete';

import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';


import AddOrEditCustomer from './AddOrEditCustomer'



const CustomerList = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(false)
    const [title, setTitle] = useState("")

    const [customers, setCustomers] = useState([])

    const [customer, setCustomer] = useState({})


    const closePopUp = () => {
        setOpenPopup(false);
        setCustomer(null);

    }

    const closePopUp2 = async () => {

        var customers = await getCustomersAction();

        setCustomers(customers)
        setOpenPopup(false);

        //window.location.reload(false);

    }

    const getCustomers = async () => {

        var customers = await getCustomersAction();

        setCustomers(customers)

    }

    useEffect(() => {
        getCustomers();
    }, []);

    const createOnClick = (event) => {
        setCustomer(null);
        setRecordForEdit(false)
        setTitle("Create Customer")
        setOpenPopup(true);


    }
    const csvLink = useRef()

    // const getTransactionData = async () => {

    //     csvLink.current.link.click()
    // }


    const zeroPad = (num, places) => String(num).padStart(places, '0')

    const columns = [

        { field: "customerId", headerName: "Customer Id", width: 150, valueGetter: (params) => `${"cu"+zeroPad(params.row.customerId ,4)|| ''}` },

        { field: 'customerRefNo', headerName: 'Customer RefNo', width: 150, valueGetter: (params) => `${params.row.customerRefNo || ''}` },

        { field: "name", headerName: "Name", width: 150, valueGetter: (params) => `${params.row.name || ''}` },

        { field: "tellNo", headerName: "Tel NO", width: 150, valueGetter: (params) => `${params.row.telephoneNumber || ''}` },

        { field: "address", headerName: "Address", width: 250, valueGetter: (params) => `${params.row.address || ''}` },

        
        { field: "createdDate", headerName: "Created Date", width: 200, valueGetter: (params) => `${params.row.createdDate || ''}` },

        { field: "UpdatedDate", headerName: "Updated Date", width: 200, valueGetter: (params) => `${params.row.updatedDate || ''}` },
        {
            field: "status",
            headerName: "Status",
            sortable: true,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    console.log(params.row);

                };

                return <Switch checked={params.row.STATUS == "available"} name="status" />;
            }
        },
        {
            field: "edit",
            headerName: "Edit",
            // sortable: false,
            filter: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    setRecordForEdit(true)
                    setTitle("Edit Customer")
                    setOpenPopup(true);
                    setCustomer(params.row);

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
                        await deleteCustomersAction(params.row);

                        alert("Custmer detail deleted successfully");

                        await getCustomers();

                    }

                };

                return    <Controls.But onClick={onClick} color="error" text="Delete" startIcon={<DeleteIcon />}></Controls.But>;
            }
        },
       
    ];




    return (
        <div>
            <SideBar heading="Customers"></SideBar>


            <div style={{ marginLeft: "260px",marginTop:"100px" }}>
                <Controls.But
                    text="Create "
                    onClick={() => createOnClick()}
                    color="primary"
                    margin="20px"


                />
                &nbsp;&nbsp;
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

                <div style={{ height: '100%', width: '95%', margin:"20px"}}>
                    <DataGrid
                        rows={customers}
                        getRowId={(row) => row.customerId}
                        columns={columns}
                        slots={{
                            toolbar: GridToolbar,
                        }}
                        disableRowSelectionOnClick
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
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

                    <AddOrEditCustomer
                        customer={customer}
                        recordForEdit={recordForEdit}
                        closePopUp={closePopUp2} />
                </Popup>
            </div>
        </div>
    );
}

export default CustomerList;
