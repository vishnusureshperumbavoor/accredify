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
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  {/*useEffect(()=>{
    if(localStorage.getItem("token")) navigate('/')
  },[])*/}

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
      axios.post(`${SERVER_URL}/states`)
        .then((response) => {
          setStates(response.data.states);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  const handleStateChange= ((e)=>{
    setSelectedStateId(e.target.value);
    setSelectedStateName(e.target.getAttribute("name"))
    setSelectedDistrict('')
  })

  useEffect(() => {
    const getDistrict=(async()=>{
      const getDis = await fetch(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedStateId}`
    );
    const res = await getDis.json();
    setDistricts(await res.districts);
    })
    if(selectedStateId){
      getDistrict()
    }
  }, [selectedStateId]);


  // const handleDistrict = (e) => {
  //   const getStateId = e.target.value;
  //   setStateId(getStateId);
  //   getDistrict();
  // };

  const [formData, setFormData] = useState({
    institute_type:"",
    institute_name:"",
    affiliated_by:"",
    year_of_establishment:"",
    aishe_code:"",
    first_approval:"",
    postal_address:"",
    state:selectedStateName,
    district:selectedDistrict,
    email:"",
    website:"",
    tan_pan_no:"",
    fax:"",
    mobile_no:"",
    phone:"",
    pin_code:"",
    status:"pending",
  });

  const handleChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${SERVER_URL}/signup`, formData).then((res)=>{
      if(res.status===200){
        localStorage.setItem("userToken",res.data.token)
        // alert("insertion successful")
        setIsLoading(false);
        // navigate('/')
      }
    }).catch((err)=>{
      alert("error")
      setIsLoading(false);
    })
  };

  return (
    <div style={{ backgroundColor: "#E7EBF0", height: "100vh",width:"100vw",margin:0,padding:0 }}>
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
                textDecoration: "none"
              }}
            >
              ACCREDITATION WORKFLOW MANAGEMENT SYSTEM
            </Typography> 
          </Toolbar>
        </Container>
      </AppBar>
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
                <TableCell align="right" colSpan={3}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="institute_type"
                    onChange={handleChange}
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
                <TableCell>
                  <TextField name="institute_name" onChange={handleChange}  id="outlined-basic" variant="outlined" />
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
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
                  Affiliated By
                </TableCell>
                <TableCell>
                  <TextField name="affiliated_by" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Re Enter Email
                </TableCell>
                <TableCell>
                <TextField name="email" onChange={handleChange} id="outlined-basic" variant="outlined" />
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
                  <TextField name="year_of_establishment" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Website
                </TableCell>
                <TableCell>
                <TextField name="website" onChange={handleChange} id="outlined-basic" variant="outlined" />
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
                  <TextField name="aishe_code" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    TAN/PAN No.
                </TableCell>
                <TableCell>
                <TextField name="tan_pan_no" onChange={handleChange} id="outlined-basic" variant="outlined" />
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
                  <TextField name="first_approval" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Fax
                </TableCell>
                <TableCell>
                <TextField name="fax" onChange={handleChange} id="outlined-basic" variant="outlined" />
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
                    name="postal_address"
                    onChange={handleChange}
                  />
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Mobile No.
                </TableCell>
                <TableCell>
                <TextField name="mobile_no" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
              <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    PIN Code
                </TableCell>
                <TableCell>
                <TextField name="pin_code" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell>
                
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Phone
                </TableCell>
                <TableCell>
                <TextField name="phone" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell>
              </TableRow>
              <TableRow>
                {/*<TableCell
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
                      onChange={handleStateChange}
                    >
                      {states.map((res) => (
                        <MenuItem key={res.state_id} value={res.state_id} name={res.state_name}>
                          {res.state_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                      </TableCell>
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
                      {districts.map((res) => (
                        <MenuItem key={res.district_id} value={res.district_id} name={res.district_name}>
                          {res.district_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                      </TableCell> */}
                
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  {/*<Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>Signup</Button>*/}
                  <Button disabled={isLoading} variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>
                    {isLoading ? <CircularProgress size={24} /> : 'Signup'}
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
export default Registration;
