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
import { Typography } from "@material-ui/core";

function Condition4() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    num1:0,
    num2:0,
    num3:0,
    num4:0,
    num5:0,
    num6:0,
    sum1:0,
    sum2:0,
    total:0,
  });

  useEffect(() => {
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    const storedData = localStorage.getItem('condition4');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const sum1 = Number(data.num1) + Number(data.num2) + Number(data.num3);
  const sum2 = Number(data.num4) + Number(data.num5) + Number(data.num6);
  const total = ((sum2*100) / sum1).toFixed(2);

  const handleNumChange = (event) => { 
    setData({ ...data, [event.target.name]: event.target.value });
    localStorage.setItem('condition4', JSON.stringify(data));
  };

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    const result = total < 50 ? "No" : "Yes";
    existingResults.page4 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
    navigate("/condition5")
  };


  return (
    <div style={{height: "100vh",width:"100vw",margin:0,padding:0, paddingTop: "30px" }}>
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
                  PREQUALIFIERS (CONDITION 4)
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
                  Student Admissions (Program level)
                </TableCell>
                </TableRow>
                <TableRow >
                <TableCell align="center">
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bolder"}}>Description</TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>2022-23</TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>2021-22</TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>2020-21</TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Sanctioned Intake in the 1st year
              </TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={data.num1} name="num1" onChange={handleNumChange} /></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={data.num2} name="num2" onChange={handleNumChange} /></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={data.num3} name="num3" onChange={handleNumChange} /></TableCell>
              <TableCell align="right">{sum1}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Number of Student admitted in the 1st year
              </TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={data.num4} name="num4" onChange={handleNumChange} /></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={data.num5} name="num5" onChange={handleNumChange} /></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={data.num6} name="num6" onChange={handleNumChange} /></TableCell>
              <TableCell align="right">{sum2}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </TableCell>
                </TableRow>
                <TableRow style={{textAlign:"center",fontWeight:"bold",fontSize:"40px"}}> 
                  % of students admitted over last 3 assessment years : {total}
                </TableRow>
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition3")}>
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
export default Condition4;
