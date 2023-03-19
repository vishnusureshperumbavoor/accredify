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
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Home2() {
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState("");
  const [district, setDistrict] = useState([]);

  useEffect(() => {
    const getState = async () => {
      axios.post(`${SERVER_URL}/countries`).then((res) => {
        setState(res.data.states);
      });
    };
    getState();
  }, []);

  const handleDistrict = (e) => {
    const getStateId = e.target.value;
    setStateId(getStateId);
    getDistrict();
  };

  const getDistrict = async () => {
    console.log(`stateid = ${stateId}`);
    const getDis = await fetch(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateId}`
    );
    const res = await getDis.json();
    console.log(res.districts);
    setDistrict(await res.districts);
  };

  return (
    <div style={{ backgroundColor: "#E7EBF0", height: "700px" }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              ACCREDITATION WORKFLOW MANAGEMENT SYSTEM
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Card sx={{ minWidth: 275 }} style={{ margin: "30px" }}>
        <TableContainer component={Paper}>
          <Table
            sx={{ "& td": { border: 0 }, minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  className="fontLink"
                  colSpan={3}
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  INSTITUTE REGISTRATION
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
                  }}
                >
                  Institute type
                </TableCell>
                <TableCell align="right" colSpan={2}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Government Institute"
                      control={<Radio />}
                      label="Government Institute"
                    />
                    <FormControlLabel
                      value="Government Aided Institute"
                      control={<Radio />}
                      label="Government Aided Institute"
                    />
                    <FormControlLabel
                      value="Self-Supported Institute"
                      control={<Radio />}
                      label="Self-Supported Institute"
                    />
                    <FormControlLabel
                      value="Deemed University"
                      control={<Radio />}
                      label="Deemed University"
                    />
                    <FormControlLabel
                      value="University"
                      control={<Radio />}
                      label="University"
                    />
                    <FormControlLabel
                      value="NIT"
                      control={<Radio />}
                      label="NIT"
                    />
                    <FormControlLabel
                      value="Others"
                      control={<Radio />}
                      label="Others"
                    />
                  </RadioGroup>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Institute Name
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Affiliated By
                </TableCell>
                <TableCell colSpan={2}>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Year of establishment
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  AISHE Code
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Year of obtaining 1st approval letter from AICTE
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Postal Address
                </TableCell>
                <TableCell>
                  <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    style={{ width: 200 }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  State
                </TableCell>
                <TableCell>
                  <FormControl sx={{ m: 1, minWidth: 140 }}>
                    <InputLabel id="demo-simple-select-label">
                      Select State
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="state"
                      onChange={(e) => handleDistrict(e)}
                    >
                      {state.map((res) => (
                        <MenuItem key={res.state_id} value={res.state_id}>
                          {res.state_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  District
                </TableCell>
                <TableCell>
                  <FormControl sx={{ m: 1, minWidth: 140 }}>
                    <InputLabel id="demo-simple-select-label">
                      Select District
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Age"
                    >
                      {district.map((res) => (
                        <MenuItem key={res.district_id} value={res.district_id}>
                          {res.district_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  PIN Code
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Phone
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Mobile No.
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Fax
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  TAN/PAN No.
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Website
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Email
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Re Enter Email
                </TableCell>
                <TableCell>
                  <TextField id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Button variant="contained">Signup</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
export default Home2;
