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
import TextField from "@mui/material/TextField"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  
  useEffect(()=>{
    if(localStorage.getItem("token")) navigate('/pending')
  },[])

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log("handlesubmit has been caled");
    console.log(formData);
    setIsLoading(true);
    e.preventDefault();
    axios
      .post(`${SERVER_URL}/adminLogin`, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          alert("welcome to the future");
          localStorage.setItem("token",res.data.token);
          // navigate('/')
          setIsLoading(false)
        }
      })
      .catch((err) => {
        alert("error");
        setIsLoading(false)
      });
  };

  return (
    <div style={{ backgroundColor: "#E7EBF0", height: "600px" }}>
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
      <Card sx={{ minWidth: 275 }} style={{ marginTop: "50px",marginLeft:'300px',marginRight:"300px" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ "& td": { border: 0 }, minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  className="fontLink"
                  colSpan={4}
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  ADMIN LOGIN
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                    name:"email"
                  }}>
                    Email
                </TableCell>
                <TableCell>
                <TextField id="outlined-basic" variant="outlined" name="email" onChange={handleChange} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                    name:"password"
                  }}>
                    Password
                </TableCell>
                <TableCell>
                <TextField name="password" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button disabled={isLoading} variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>
                    {isLoading ? <CircularProgress size={24} /> : 'Login'}
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
export default AdminLogin;
