import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  {/*useEffect(()=>{
    if(localStorage.getItem("token")) navigate('/')
  },[])*/}

  const [formData, setFormData] = useState({
    userId: "",
    username:"",
    password:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    const userId = localStorage.getItem("userId");
    setFormData({ ...formData, [userId]: userId });
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${SERVER_URL}/signup`, formData).then((res)=>{
      if(res.status===200){
        localStorage.setItem("userToken",res.data.token)
        setIsLoading(false);
        // alert("Registration Successful")
        navigate('/waitforapproval')
      }
    }).catch((err)=>{
      alert("error")
      setIsLoading(false);
    })
  };

  return (
    <div style={{ backgroundColor: "#E7EBF0", height: "100vh",width:"100vw",margin:0,padding:0 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              ACCREDITATION WORKFLOW MANAGEMENT SYSTEM
            </Typography> 
          </Toolbar>
        </Container>
      </AppBar>
      <Card sx={{ minWidth: 275 }} style={{ margin: "50px" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ "& td": { border: 0 }, minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  className="fontLink"
                  colSpan={2}
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  INSTITUTE SIGNUP
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Enter Username
                </TableCell>
                <TableCell>
                  <TextField name="username" onChange={handleChange}  id="outlined-basic" variant="outlined" />
                </TableCell>
                
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Enter password
                </TableCell>
                <TableCell>
                  <TextField type="password" id="outlined-basic" variant="outlined" />
                </TableCell>
                
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Re enter password
                </TableCell>
                <TableCell>
                  <TextField type="password" name="password" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell>
                
              </TableRow>
              
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  {/*<Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>Signup</Button>*/}
                  <Button disabled={isLoading} variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>
                    {isLoading ? <CircularProgress size={24} /> : 'Signup'}
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
export default Signup;
