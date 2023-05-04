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
      console.log(response.data.user.details)
      if(response.data.user.details)
        setData(response.data.user.details);
    }).catch((err)=>{
      console.log(err)
    })
    
  },[])

  const total1 = Number(data.thirdYear2022) + Number(data.secondYear2022) 
  const total2 = Number(data.thirdYear2021) + Number(data.secondYear2021) 

  const num7 = ((Number(data.graduates2021)*100)/total1).toFixed(2)
  const num8 = ((Number(data.graduates2020)*100)/total2).toFixed(2)

  const handleNumChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    localStorage.setItem('condition8', JSON.stringify(data));
  };

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    const result = (num7>=80 && num8>=80)  ? "Yes" : "No";
    existingResults.page8 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
    axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, data).then((res)=>{
      if(res.status===200){;
        navigate('/condition')
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
                  PREQUALIFIERS (CONDITION 8)
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
                  At least 80% of the students in 2 batches should have passed among previous 2 batches and current batch 
                </TableCell>
                </TableRow>
                <TableRow >
                <TableCell align="center">
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bolder"}}>Designation</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>2021-22</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>2020-21</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Number of students in department
              </TableCell>
              <TableCell align="center">
              <Typography>{total1}</Typography>
              </TableCell>
              <TableCell align="center">
              <Typography>{total2}</Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Number of students graduated without backlogs
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.graduates2021} name="graduates2021" 
                onChange={handleNumChange} onBlur={handleNumChange} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.graduates2020} name="graduates2020" 
                onChange={handleNumChange} onBlur={handleNumChange} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Percentage of graduates
              </TableCell>
              <TableCell align="center">{num7}</TableCell>
              <TableCell align="center">{num8}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </TableCell>
                </TableRow>
                {(num7>=80 && num8>=80) ? null : (
                  <Typography color="error" style={{
                    textAlign: "center",paddingTop:"15px"
                  }}>
                    You cannot apply for NB Accreditaton if atleast 2 batches is not graduated with 80%
                  </Typography>
            )}
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition7")}>
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
