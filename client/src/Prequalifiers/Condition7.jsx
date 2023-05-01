import React, { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Typography } from "@mui/material";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Condition7() {
  const navigate = useNavigate();
  const [condition5Data, setCondition5Data] = useState({});
  const [data, setData] = useState({});

  
  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    axios.post(`${SERVER_URL}/getUserDetails`,{userId}).then((response)=>{
      if(response.data.user.details)
        setData(response.data.user.details);
    }).catch((err)=>{
      console.log(err)
    })
    
  },[])
  
  const phd1 = ((data.phd2022*100)/Number(data.faculty2022)).toFixed(2)
  const phd2 = ((data.phd2021*100)/Number(data.faculty2021)).toFixed(2)

  const phd = ((Number(phd1)+Number(phd2))/2).toFixed(2);

  const handleNumChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    localStorage.setItem('condition7', JSON.stringify(data));
  };

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    const result = phd < 10 ? "No" : "Yes";
    existingResults.page7 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
    axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, data).then((res)=>{
      if(res.status===200){;
        navigate('/condition8')
      }
    }).catch((err)=>{
      alert("error")
    })
  };

  return (
    <div style={{ height: "100vh",width:"100vw",margin:0,padding:0, paddingTop: "30px" }}>
      <Navbar/>
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
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  PREQUALIFIERS (CONDITION 7)
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
                    textAlign: "center",
                  }}
                >
                  Number of available Ph.Ds in the department
                </TableCell>
                </TableRow>
                <TableRow >
                <TableCell align="center">
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bolder"}}>Designation</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>2022-23</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>2021-22</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                  Number of faculties in the department
              </TableCell>
              <TableCell align="center">{data.faculty2022}</TableCell>
              <TableCell align="center">{data.faculty2021}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
               Number of faculties with Ph.Ds
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.phd2022}  name="phd2022"
                onChange={handleNumChange} onBlur={handleNumChange} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.phd2021} name="phd2021"
                onChange={handleNumChange} onBlur={handleNumChange} />
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </TableCell>
                </TableRow>
                {phd < 10 ? (
                  <Typography color="error" style={{
                    textAlign: "center",paddingTop:"15px"
                  }}>
                    You cannot apply for NB Accreditation if the percentage of faculties with PhDs and total faculties is
                    lesser than 10%
                  </Typography>
            ) : null}
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition6")}>
                    Go Back
                  </Button>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>
                    Continue
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
export default Condition7;
