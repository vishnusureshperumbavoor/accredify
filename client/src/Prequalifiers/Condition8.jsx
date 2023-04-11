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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
import Navbar from "../Components/Navbar/Navbar";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Condition7() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [num6, setNum6] = useState(0);

  const num7 = ((num4*100)/num1).toFixed(2)
  const num8 = ((num5*100)/num2).toFixed(2)
  const num9 = ((num6*100)/num3).toFixed(2)

  const handleNumChange = (event,setState) => {
    setState(parseInt(event.target.value));
  };

  return (
    <div style={{ backgroundColor: "#E7EBF0", height: "100vh",width:"100vw",margin:0,padding:0 }}>
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
            <TableCell align="center" style={{fontWeight:"bolder"}}>2020-23</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>2019-22</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>2018-21</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Total Number of students in department
              </TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num1} onChange={(e)=>handleNumChange(e,setNum1)} /></TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num2} onChange={(e)=>handleNumChange(e,setNum2)} /></TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num3} onChange={(e)=>handleNumChange(e,setNum3)} /></TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Total Number of students graduated without backlogs
              </TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num4} onChange={(e)=>handleNumChange(e,setNum4)} /></TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num5} onChange={(e)=>handleNumChange(e,setNum5)} /></TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num6} onChange={(e)=>handleNumChange(e,setNum6)} /></TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Percentage of graduates
              </TableCell>
              <TableCell align="center">{num7}</TableCell>
              <TableCell align="center">{num8}</TableCell>
              <TableCell align="center">{num9}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </TableCell>
                </TableRow>
                
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition7")}>
                    Go Back
                  </Button>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition7")}>
                    Submit
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
