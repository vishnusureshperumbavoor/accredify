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

function Condition7() {
  const navigate = useNavigate();
  const [condition5Data, setCondition5Data] = useState({});
  const [data, setData] = useState({});

  
  useEffect(() => {
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    const condition5Data = localStorage.getItem('condition5');
    const storedData = localStorage.getItem('condition7');
    if (condition5Data) {
      setCondition5Data(JSON.parse(condition5Data));
    }
    if (storedData) {
      setData(JSON.parse(storedData));
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
    navigate("/condition8")
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
              <TableCell align="center">{condition5Data.num19}</TableCell>
              <TableCell align="center">{condition5Data.num20}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
               Number of faculties with Ph.Ds
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.num3}  name="num3"
                onChange={handleNumChange} onBlur={handleNumChange} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.num4} name="num4"
                onChange={handleNumChange} onBlur={handleNumChange} />
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </TableCell>
                </TableRow>
                {/* {phd < 10 ? (
                  <Typography color="error" style={{
                    textAlign: "center",paddingTop:"15px"
                  }}>
                    You cannot apply for NB Accreditation if the percentage of faculties with PhDs and total faculties is
                    lesser than 10%
                  </Typography>
            ) : null} */}
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
