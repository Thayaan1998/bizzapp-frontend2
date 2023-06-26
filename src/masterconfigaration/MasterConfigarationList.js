import React, { useEffect, useState, useRef } from 'react'

import Popup from "../controls/Popup";
import Controls from "../controls/Controls"

import Switch from '@mui/material/Switch';
import { getAllMasterCofigarationsActions, deleteMasterConfigartionAction } from '../action/masterConfigarionsAction'
// import { CSVLink, CSVDownload } from "react-csv";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SideBar from '../SideBar'




import AddOrEditMasterConfigaration from './AddOrEditMasterConfigaration'



const MasterConfigarationList = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(false)
    const [title, setTitle] = useState("")

    const [masterConfigarations, setMasterConfigarations] = useState([])

    const [masterConfigaration, setMasterConfigaration] = useState({})


    const closePopUp = () => {
        setOpenPopup(false);
        setMasterConfigaration(null);

    }

    const closePopUp2 = async () => {

        var masterConfigarations = await getAllMasterCofigarationsActions();

        setMasterConfigarations(masterConfigarations)
        setOpenPopup(false);

        //window.location.reload(false);

    }

    const getMasterConfigarations = async () => {

        var masterConfigarations = await getAllMasterCofigarationsActions();

        setMasterConfigarations(masterConfigarations)

    }

    useEffect(() => {
        getMasterConfigarations();
    }, []);

    const createOnClick = (event) => {
        setMasterConfigaration(null);
        setRecordForEdit(false)
        setTitle("Create MasterConfigaration")
        setOpenPopup(true);


    }
    const csvLink = useRef()

    // const getTransactionData = async () => {

    //     csvLink.current.link.click()
    // }



    const columns = [

        { field: 'code', headerName: 'Code', width: 100, valueGetter: (params) => `${params.row.code || ''}` },

        { field: 'type', headerName: 'type', width: 150, valueGetter: (params) => `${params.row.type || ''}` },

        { field: "name", headerName: "name", width: 300, valueGetter: (params) => `${params.row.name || ''}` },

        { field: "description", headerName: "Description", width: 300, valueGetter: (params) => `${params.row.description || ''}` },

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

                return <Switch checked={params.row.status == "available"} name="status" />;
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
                    setTitle("Edit MasterConfigartaion")
                    setOpenPopup(true);
                    setMasterConfigaration(params.row);

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
                        await deleteMasterConfigartionAction(params.row);

                        alert("Master Configaration details deleted successfully");

                        await getMasterConfigarations();

                    }

                };

                return <Controls.But onClick={onClick} color="error" text="Delete">Delete</Controls.But>;
            }
        },
        
    ];




    return (
        <div>
            <SideBar heading="Master Configaration"></SideBar>
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

                <div style={{ height: '100%', width: '95%', margin: '20px' }}>
                    <DataGrid
                        rows={masterConfigarations}
                        getRowId={(row) => row.masterConfigarationId}
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
                        pageSizeOptions={[10,25,50,100]}
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

                    <AddOrEditMasterConfigaration
                        masterConfigaration={masterConfigaration}
                        recordForEdit={recordForEdit}
                        closePopUp={closePopUp2} />
                </Popup>
            </div>

        </div>

    );
}

export default MasterConfigarationList;
