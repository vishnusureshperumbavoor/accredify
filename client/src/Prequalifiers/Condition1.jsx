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
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

function Condition1() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('condition1') || '');
  const [result, setResult] = useState("Yes");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setResult(e.target.value === "Yes" ? "Yes" : "No");
  };

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    existingResults.page1 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
    navigate("/condition2")
  };


  useEffect(() => {
    localStorage.setItem('condition1', selectedOption);
  }, [selectedOption]);

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
                  colSpan={4}
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  PREQUALIFIERS (CONDITION 1)
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
                  <h3>
                    Vision, Mission and PEOs <br/>
                    Vision and mission and PEOs of the department should be stated in the prospectus / website.
                  </h3> <br/><br/>
                  <h4>
                    1. Are the vision and mission of the department stated in the prospectus / website?<br/>
                    2. Are the PEOs of the department stated in the prospectus / website?
                  </h4> 
                </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="institute_type"
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                      checked={selectedOption === 'Yes'}
                      onChange={handleOptionChange}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                      checked={selectedOption === 'No'}
                      onChange={handleOptionChange}
                    />
                    
                  </RadioGroup>
                  </TableCell>
                </TableRow>
                {selectedOption === 'No' && 
                  <Typography variant="body1" color="error" style={{textAlign:"center"}}>
                    You cannot apply for NB Accreditation if mission, vision and PEOs is not mentioned on the prospectus / website.
                  </Typography>
                }
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit} >Continue
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
export default Condition1;
