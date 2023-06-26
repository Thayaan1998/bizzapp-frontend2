import * as React from 'react';
import Button from '@mui/material/Button';
import { read, utils, writeFile } from 'xlsx';

import { postMasterConfigarationAction } from "./action/masterConfigarionsAction";
import { postCustomersAction} from './action/customerAction'

const HomeComponent = () => {
  const handleImport = async ($event) => {
    const files = $event.target.files;
    if (window.confirm("Do you want to upload this file")) {
      if (files.length) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = async (event) => {
          const wb = read(event.target.result);
          const sheets = wb.SheetNames;

          if (sheets.length) {

            const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);

            for (var i = 0; i < rows.length; i++) {

                 var values = {
                    customerId:0,
                    customerRefNo:  rows[i]['Outlet ID'],
                    name:  rows[i]['Name'],
                    telephoneNumber: "",
                    email: "",
                    areaCode:rows[i]['area Id'],
                    address: rows[i]['Street Address'],
                    status: "available" 
                };
              // var values = {
              //   masterConfigarationId: 0,
              //   code: rows[i][' Route Code '],
              //   name: rows[i][' Route Name '],
              //   type: "Area Code",
              //   description: "",
              //   status: "available"
              // };
              console.log(values);
              await postCustomersAction(values);
              console.log(i)

              //  await postMasterConfigarationAction(values);
            }


          }
          // await getSales();
        }
        reader.readAsArrayBuffer(file);
        // alert("sales Details Added Successfully")
        // window.location.reload();

      }
    }

  }
  return (
    <Button
      variant="contained"
      component="label"
      style={{ height: "44px" }}

    >
      Upload File
      <input type="file" name="file" className="custom-file-input" id="inputGroupFile" required onChange={handleImport}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" hidden />
    </Button>)

}
export default HomeComponent;