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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Typography } from "@mui/material";
function Condition6() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('condition6') || '');
  const [result, setResult] = useState("Yes");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
    setResult(e.target.value === "Yes" ? "Yes" : "No");
  };

  useEffect(() => {
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    localStorage.setItem('condition6', selectedOption);
  }, [selectedOption]);

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    existingResults.page6 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
    navigate("/condition7")
  };

  return (
    <div style={{ height: "100vh",width:"100vw",margin:0,padding:0 , paddingTop: "30px"}}>
      
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
                  PREQUALIFIERS (CONDITION 6)
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
                  Is at least one Professor or one Assistant Professor on regular basis with Ph.D degree is available in the previous and current academic year?
                </TableCell>
                </TableRow>
                <TableRow >
                <TableCell>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="institute_type"
                    
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      checked={selectedOption === 'Yes'}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      checked={selectedOption === 'No'}
                      label="No"
                    />
                    
                  </RadioGroup>
                  </div>
                </TableCell>
                </TableRow>
                {/* {selectedOption === 'No' && 
                  <Typography variant="body1" color="error" style={{textAlign:"center"}}>
                    You cannot apply for NB Accreditation, if there is no Professor or Assistant Professor on regular basis with Ph.D 
                    degree, available in the previous and current academic year.
                  </Typography>
                } */}
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition5")}>
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
export default Condition6;
