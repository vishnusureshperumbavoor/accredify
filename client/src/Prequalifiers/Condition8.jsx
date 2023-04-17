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
import { Typography } from "@mui/material";

function Condition7() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [data2, setData2] = useState({
    num4:0,
    num5:0,
    num6:0,
  });

  useEffect(() => {
    const storedData = localStorage.getItem('condition5');
    const storedData2 = localStorage.getItem('condition8');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    if (storedData2) {
      setData2(JSON.parse(storedData2));
    }
  }, []);

  const total1 = Number(data.num1) + Number(data.num2);
  const total2 = Number(data.num3) + Number(data.num4);
  const total3 = Number(data.num5) + Number(data.num6);

  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [num6, setNum6] = useState(0);

  const num7 = ((Number(data2.num4)*100)/total1).toFixed(2)
  const num8 = ((Number(data2.num5)*100)/total2).toFixed(2)
  const num9 = ((Number(data2.num6)*100)/total3).toFixed(2)

  const handleNumChange = (e,setState) => {
    setState(parseInt(e.target.value));
    setData2({ ...data2, [e.target.name]: e.target.value });
    localStorage.setItem('condition8', JSON.stringify(data2));
  };

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    const result = ((num7 >= 80 && num8 >= 80) || (num7 >= 80 && num9 >= 80) || (num8 >= 80 && num9 >= 80))  ? "Yes" : "No";
    existingResults.page8 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
    navigate("/condition")
  };

  return (
    <div style={{ height: "100vh",width:"100vw",margin:0,padding:0 }}>
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
            <TableCell align="center" style={{fontWeight:"bolder"}}>2022-23</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>2021-22</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>2020-21</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Number of students in department (3rd year)
              </TableCell>
              <TableCell align="center">
                {total1}
              </TableCell>
              <TableCell align="center">
                  {total2}
              </TableCell>
              <TableCell align="center">
                  {total3}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Number of students graduated without backlogs
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data2.num4} name="num4" 
                onChange={(e)=>handleNumChange(e,setNum4)} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data2.num5} name="num5" 
                onChange={(e)=>handleNumChange(e,setNum5)} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data2.num6} name="num6" 
                onChange={(e)=>handleNumChange(e,setNum6)} /> 
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
              <TableCell align="center">{num9}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </TableCell>
                </TableRow>

                <TableRow>
              <TableCell colSpan={2} style={{textAlign:"center"}}>
            {((num7 >= 80 && num8 >= 80) || (num7 >= 80 && num9 >= 80) || (num8 >= 80 && num9 >= 80)) ? null : (
                  <Typography color="error" style={{
                    textAlign: "center",paddingTop:"15px"
                  }}>
                    You cannot apply for NB Accreditaton if atleast 2 batches is not graduated with 80%
                  </Typography>
            )}
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
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>
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
