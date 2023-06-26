import React, { useEffect, useState, useRef } from 'react'

import Controls from "../controls/Controls"

import { getAllBillwiseReciptAction } from '../action/billwisereciptAction'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import SideBar from '../SideBar'



import AddBillWiseRecipt from './AddBillWiseRecipt'



const BillWiseReciptList = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(false)
    const [title, setTitle] = useState("")

    const [billwiseRecipts, setBillwiseRecipts] = useState([])

    const [billwiseRecipt, setBillwiseRecipt] = useState({})


    const closePopUp = () => {
        setOpenPopup(false);
        setBillwiseRecipt(null);

    }

    const closePopUp2 = async () => {

        var billwiseRecipts = await getAllBillwiseReciptAction();

        setBillwiseRecipts(billwiseRecipts)
        setOpenPopup(false);

        window.location.reload(false);

    }

    const getBillWiseRecipts = async () => {

        var billwiseRecipts = await getAllBillwiseReciptAction();

        setBillwiseRecipts(billwiseRecipts)

    }

    useEffect(() => {
        getBillWiseRecipts();
    }, []);

    const createOnClick = (event) => {
        getBillWiseRecipts(null);
        setRecordForEdit(false)
        setTitle("Create Bill Wise Recipt")
        setBillwiseRecipt(null)
        setOpenPopup(true);


    }
    const csvLink = useRef()

    // const getTransactionData = async () => {

    //     csvLink.current.link.click()
    // }



    const columns = [

        { field: 'receiptNo', headerName: 'Receipt No', width: 150, valueGetter: (params) => `${params.row.receiptNo || ''}` },

        { field: 'customerId', headerName: 'Customer Name', width: 150, valueGetter: (params) => `${params.row.customerName || ''}` },

        { field: "receiptDate", headerName: "Receipt Date", width: 250, valueGetter: (params) => `${params.row.receiptDate1 || ''}` },


        { field: "bankName", headerName: "Bank Name", width: 200, valueGetter: (params) => `${params.row.bankName || ''}` },

        { field: "amount", headerName: "Amount", width: 150, valueGetter: (params) => `${params.row.amount || ''}` },

        {
            field: "view",
            headerName: "View",
            // sortable: false,
            filter: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    setRecordForEdit(true)
                    setTitle("View Bill Wise Recipt")
                    setOpenPopup(true);
                    setBillwiseRecipt(params.row);

                };

                return <Controls.But onClick={onClick} color="primary" text="View">View</Controls.But>;
            }
        },

        {
            field: "print",
            headerName: "Print",
            // sortable: false,
            filter: false,
            renderCell: (params) => {
                const onClick = (e) => {
                    e.stopPropagation();
                    // setRecordForEdit(true)
                    // setTitle("Edit Bill Wise Recipt")
                    // setOpenPopup(true);
                    // setBillwiseRecipt(params.row);

                };

                return <Controls.But onClick={onClick} color="primary" text="Print">Print</Controls.But>;
            }
        },
    ];




    return (
        <div>
            <SideBar heading="Bill Wise Recipt"></SideBar>


            <div style={{ marginLeft: "260px", marginTop: "100px" }}>
                <Controls.But
                    text="Create "
                    onClick={() => createOnClick()}
                    color="primary"
                    margin="20px"


                />
                &nbsp;&nbsp;
             

                <br></br>

                <div style={{ height: '100%', width: '80%', margin: "20px" }}>
                    <DataGrid
                        rows={billwiseRecipts}
                        getRowId={(row) => row.receiptNo}
                        columns={columns}
                        slots={{
                            toolbar: GridToolbar,
                        }}
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




                {openPopup &&
                    <AddBillWiseRecipt
                        title={title}
                        openPopup={openPopup}
                        billwiseRecipt={billwiseRecipt}
                        recordForEdit={recordForEdit}
                        closePopUp={closePopUp2} />

                }


                {/* <Popup
                // openPopup={openPopup}
                >


                </Popup> */}
            </div>
        </div>
    );
}

export default BillWiseReciptList;
