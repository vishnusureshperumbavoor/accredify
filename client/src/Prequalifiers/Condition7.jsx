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
import Navbar from "../Components/Navbar/Navbar";

function Condition7() {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem('condition5');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);

  const fac1 = (num1/25).toFixed();
  const fac2 = (num2/25).toFixed();
  const req1 = (fac1/10).toFixed()
  const req2 = (fac2/10).toFixed()

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
                  Number of available Ph.Ds in the department is greater than or equal to 10% of the required number of faculty averaged for previous and current academic year
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
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Total Number of students
              </TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num1} onChange={(e)=>handleNumChange(e,setNum1)} /></TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num2} onChange={(e)=>handleNumChange(e,setNum2)} /></TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Required Number of faculties
              </TableCell>
              <TableCell align="center">{fac1}</TableCell>
              <TableCell align="center">{fac2}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Required number of faculties with Ph.Ds
              </TableCell>
              <TableCell align="center">{req1}</TableCell>
              <TableCell align="center">{req2}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
               Total number of faculties with Ph.Ds
              </TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num3} onChange={(e)=>handleNumChange(e,setNum3)} /></TableCell>
              <TableCell align="center"><TextField id="outlined-basic" variant="outlined" type="number" value={num4} onChange={(e)=>handleNumChange(e,setNum4)} /></TableCell>
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
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition6")}>
                    Go Back
                  </Button>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition8")}>
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
