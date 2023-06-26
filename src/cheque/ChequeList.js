import React, { useEffect, useState, useRef } from 'react'

import Popup from "../controls/Popup";
import Controls from "../controls/Controls"

import Switch from '@mui/material/Switch';
import { chequeHeaderAction } from '../action/billwisereciptAction'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

import SideBar from '../SideBar'



import AddCheque from './AddCheque'



const ChequeList = () => {

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

        // var billwiseRecipts = await chequeHeaderAction();

        // setBillwiseRecipts(billwiseRecipts)
        setOpenPopup(false);

        //window.location.reload(false);

    }

   

  

    const createOnClick = (event) => {
        // getBillWiseRecipts(null);
        setRecordForEdit(false)
        setTitle("Create Cheque Return")
        setBillwiseRecipt(null)
        setOpenPopup(true);


    }
    const csvLink = useRef()

    // const getTransactionData = async () => {

    //     csvLink.current.link.click()
    // }



    


    return (
        <div>
            <SideBar heading="Cheque Return"></SideBar>


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
{/* 
                <div style={{ height: '100%', width: '90%', margin:"20px"}}>
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
                </div> */}
                <br></br>
                <br></br>





                <Popup
                    title={title}
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}
                    closePopUp={closePopUp}
                  

                >

                    <AddCheque
                        billwiseRecipt={billwiseRecipt}
                        recordForEdit={recordForEdit}
                        closePopUp={closePopUp2} />
                </Popup>
            </div>
        </div>
    );
}

export default ChequeList;
