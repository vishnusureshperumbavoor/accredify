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
    num1:0,
    num2:0,
  });

  
  useEffect(() => {
    const storedData = localStorage.getItem('condition5');
    const storedData2 = localStorage.getItem('condition7');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    if (storedData2) {
      setData2(JSON.parse(storedData2));
    }
  }, []);

  const total1 = Number(data.num1) + Number(data.num2) + Number(data.num7) + Number(data.num8);
  const total2 = Number(data.num3) + Number(data.num4) + Number(data.num9) + Number(data.num10);

  const fac1 = Math.ceil(total1/25)
  const fac2 = Math.ceil(total2/25)

  const req1 = Math.ceil(fac1/10)
  const req2 = Math.ceil(fac2/10)

  
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  
  const phd1 = ((num3*100)/Number(data.num19)).toFixed(2)
  const phd2 = ((num4*100)/Number(data.num20)).toFixed(2)

  const phd = ((Number(phd1)+Number(phd2))/2).toFixed(2);

  const handleNumChange = (e,setState) => {
    setState(parseInt(e.target.value));
    setData2({ ...data2, [e.target.name]: e.target.value });
    localStorage.setItem('condition7', JSON.stringify(data2));
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
    navigate("/condition8")
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
                  Number of available Ph.Ds in the department should be greater than or equal to 10% of the required number of faculty averaged for previous and current academic year
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
                Number of students in the department (3rd year + 2nd year)
              </TableCell>
              <TableCell align="center">
                {total1}
              </TableCell>
              <TableCell align="center">
                {total2}  
              </TableCell>
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
                  Actual Number of faculties
              </TableCell>
              <TableCell align="center">{data.num19}</TableCell>
              <TableCell align="center">{data.num20}</TableCell>
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
               Actual number of faculties with Ph.Ds
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={num3} 
                onChange={(e)=>handleNumChange(e,setNum3)} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={num4} 
                onChange={(e)=>handleNumChange(e,setNum4)} />
              </TableCell>
            </TableRow>


            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
               % of faculties with PhDs with total faculties
              </TableCell>
              <TableCell align="center">
                {phd1}
              </TableCell>
              <TableCell align="center">
                {phd2}
              </TableCell>
            </TableRow>


            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
               Average % 
              </TableCell>
              <TableCell align="center" colSpan={2}>
                {phd}
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell colSpan={2} style={{textAlign:"center"}}>
            {phd < 10 ? (
                  <Typography color="error" style={{
                    textAlign: "center",paddingTop:"15px"
                  }}>
                    You cannot apply for NB Accreditation if the percentage of faculties with PhDs and total faculties is
                    lesser than 10%
                  </Typography>
            ) : null}
              </TableCell>
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
