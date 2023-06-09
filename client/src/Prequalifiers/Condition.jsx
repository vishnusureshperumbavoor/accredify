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
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Typography } from "@mui/material";

function Condition() {
  const navigate = useNavigate();
  const [results, setResults] = useState({});

  const questions = {
    page1: "Vision and Mission and PEOs of the program should be listed in the website and approval of aicte obtained for program under construction?",
    // page2: "Approval of AICTE for the program under consideration has been obtained for the years including current year?",
    // page2: "Admissions in the undergraduate programs at the institue level has been more than or equal to 50% (average of the previous 3 academic years including the current year)",
    page2: "Admissions in the undergraduate programs at the department level has been more than or equal to 50% (average of the previous 3 academic years including the current year)",
    page3: "Faculty student ratio in the department under consideration is better than or equal to 1:25 averaged over previous 3 academic years including current academic year",
    page4: "Atleast one professor or one Assistant professor on regular basis with Ph.D degress is available in the respective Department during previous two academic years including current academic year",
    page5: "Number of available PhDs in the department is greater than or equal to 10% of the required number of faculty averaged for previous two years including the current academic year",
    page6: "2 batches should have passed out in the programs under consideration",
  };

  useEffect(() => {
    const storedResults = JSON.parse(localStorage.getItem("results"));
    if (storedResults) {
      setResults(storedResults);
    }
  }, []);

  const renderRows = () => {
    return Object.entries(results).map(([page, result], index) => {
      const rowStyle = result === "No" ? { bgcolor: "error.main" } : {};
      return (
        <TableRow key={page} sx={rowStyle}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{questions[page]}</TableCell>
          <TableCell>{result}</TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div style={{ margin:0,padding:0, paddingTop: "30px" }}>
      <Navbar/>
      <Card sx={{ minWidth: 275 }} style={{ margin: "50px" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ "& td": { border: 0 }, minWidth: 650 }}
            aria-label="simple table"
          >
            <TableBody>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  All 6 conditions have to satisfy before submitting SAR.
                </TableCell>
                </TableRow>
                <TableRow >
                <TableCell align="center">
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bolder"}}>Sl.No</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>Discipline</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder"}}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {renderRows()}
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
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/pricing")}>
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
export default Condition;
