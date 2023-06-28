import React, { useState, useEffect } from "react";
import axios from "axios";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import logo from './logo.jpeg'; // Tell webpack this JS file uses this image

const Login = () => {
    // const [userType, setUserType] = React.useState('');

    const navigate = useNavigate();


    const [input, setInput] = useState({
        userName: "",
        password: ""
    })

    const { userName, password } = input


    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);



    localStorage.setItem("userType", "");
    localStorage.setItem("userName", "");

    localStorage.setItem("userId", "");






    const validate = (fieldValues = input) => {
        let temp = { ...errors }

        if ('userName' in fieldValues)
            temp.userName = fieldValues.userName ? "" : "This field is required."


        if ('password' in fieldValues)
            temp.password = fieldValues.password ? "" : "This field is required."




        setErrors({
            ...temp
        })
        if (fieldValues == input)
            return Object.values(temp).every(x => x == "")


    }

    // const handleChange = e => setUserType(e.target.value);

    const handleInputChange = (e) => {

        let { name, value } = e.target;
        setInput({ ...input, [name]: value })
        validate({ [name]: value })

    }



   

    const handleSubmit = async (e) => {
        e.preventDefault()

       if(userName=="1000"&&password=="1000"){
           navigate('/masterConfigaration')
       }else{
           alert("Invalid username or password")
       }

    }




    return (
        <div style={{ height: '100vh', backgroundColor: 'rgba(32,56,100,255)' }}>
            <div style={{ marginTop: "80px", float: 'left', marginLeft: "550px" }}>
                <Card sx={{ height: 400, width: 400 }}>
                    <CardContent>
                        {/* <h3 style={{ marginLeft: '50px' }}>Welcome To Service Hub</h3> */}
                        <img style={{ marginLeft: "90px" }} src={logo} alt="Logo" />


                        <TextField
                            style={{ marginLeft: "10px", width: "350px", marginTop: "40px", marginRight: "30px" }}
                            type="text"
                            name="userName"
                            label="UserName"
                            value={userName}

                            onChange={handleInputChange}

                        />
                        <br></br>

                        <TextField
                            style={{ marginLeft: "10px", width: "350px", marginTop: "40px", marginRight: "30px" }}
                            type="password"
                            name="password"
                            label="Password"
                            value={password}

                            onChange={handleInputChange}

                        />
                        <br></br>

                        <Button
                            type="Submit"
                            text="Save"
                            onClick={handleSubmit}
                        style={{ marginLeft: "10px", width: "350px", marginTop: "40px", marginRight: "30px"  }}
                        color="primary"
                        variant="contained"
                        // margin='20px'
                        >
                            Login
                        </Button>




                    </CardContent>
                </Card>
            </div>
        </div>



    );


}
export default Login;
