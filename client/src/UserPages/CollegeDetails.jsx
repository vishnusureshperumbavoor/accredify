import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
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
import Navbar from "../Components/Navbar";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function CollegeDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [formData, setFormData] = useState({
    state:selectedStateName,
    district:selectedDistrict,
    status:"pending",
  });

  const [genderData, setGenderData] = useState({})
  const handleGenderData=((event)=>{ 
    setGenderData({...genderData, [event.target.name]: event.target.value})
  })
  const [facultyData, setFacultyData] = useState({})
  const handleFacultyData=((event)=>{ 
    setFacultyData({...facultyData, [event.target.name]: event.target.value})
  })
  
  const [infrastructureData, setInfrastructureData] = useState({})
  const handleInfrastructureData=((event)=>{
    setInfrastructureData({...infrastructureData, [event.target.name]: event.target.value})
  })
  const [financeData, setFinanceData] = useState({})
  const handleFinanceData=((event)=>{
    setFinanceData({...financeData, [event.target.name]: event.target.value})
  })

  const [laboratoriesData, setLaboratoriesData] = useState({})
  const handleLaboratoriesData=((event)=>{
    setLaboratoriesData({...laboratoriesData, [event.target.name]: event.target.value})
  })

  useEffect(() => {
    localStorage.setItem('lastVisitedPage', window.location.pathname);
      axios.post('https://cdn-api.co-vin.in/api/v2/admin/location/states')
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const generalDataObj = { general: formData };
    const genderDataObj = { gender: genderData };
    const facultyDataObj = { faculty: facultyData };
    const infrastructureDataObj = { infrastructure: infrastructureData };
    const financeDataObj = { finance: financeData };
    const laboratoriesDataObj = { laboratories: laboratoriesData };
    const dataObj = {
      ...generalDataObj,
      ...genderDataObj,
      ...facultyDataObj,
      ...infrastructureDataObj,
      ...financeDataObj,
      ...laboratoriesDataObj,
    };
    axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, dataObj).then((res)=>{
      console.log(res.data)
      if(res.status===200){
        setIsLoading(false);
        // navigate('/condition1')
      }
    }).catch((err)=>{
      alert("error")
      setIsLoading(false);
    })
  };


  const handleEmailChange = (event) => {
    const input = event.target.value;
    setEmail(input);
    setEmailError(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input));
    handleChange(event);
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
                  colSpan={4}
                  style={{
                    fontSize: "15px",
                    textAlign: "center",
                  }}
                >
                  To initiate the accreditation process, institutions are required to provide their college details.
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
                <TableCell align="left">
                <Select
        labelId="institution-type-select-label"
        id="institution-type-select"
        onChange={handleChange}
        label="Institution Type"
        name="institutionType"
      >
        <MenuItem value={"government-institute"}>Government Institute</MenuItem>
        <MenuItem value={"government-aided-institute"}>Government Aided Institute</MenuItem>
        <MenuItem value={"self-supported-institute"}>Self Supported Institute</MenuItem>
        <MenuItem value={"deemed-university"}>Deemed University</MenuItem>
        <MenuItem value={"university"}>University</MenuItem>
        <MenuItem value={"nit"}>NIT</MenuItem>
      </Select>
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Program
                </TableCell>
                <TableCell align="left">
                <Select
        labelId="course-select-label"
        id="course-select"
        onChange={handleChange}
        label="Course"
        name="program"
      >
        <MenuItem value="diploma">Diploma</MenuItem>
        <MenuItem value="btech">B.Tech</MenuItem>
        <MenuItem value="mtech">M.Tech</MenuItem>
      </Select>

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
                <Select
        labelId="organization-select-label"
        id="organization-select"
        onChange={handleChange}
        label="Organization"
        name="organization"
      >
        <MenuItem value="AICTE">AICTE</MenuItem>
        <MenuItem value="UGC">UGC</MenuItem>
        <MenuItem value="MCI">MCI</MenuItem>
        <MenuItem value="NCTE">NCTE</MenuItem>
        <MenuItem value="BCI">BCI</MenuItem>
        <MenuItem value="INC">INC</MenuItem>
      </Select>
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Phone No.
                </TableCell>
                <TableCell>
                <TextField name="phone" type="tel" onChange={handleChange} id="outlined-basic" variant="outlined" />
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
                  <TextField name="year_of_establishment" onChange={handleChange} id="outlined-basic" variant="outlined" type="number"/>
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
                  Year of obtaining 1st approval letter from AICTE
                </TableCell>
                <TableCell>
                  <TextField name="first_approval" onChange={handleChange} id="outlined-basic" variant="outlined" type="number" />
                </TableCell>
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
                
              </TableRow>

              <TableRow>
              </TableRow>

              <TableRow>
              <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Gender
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }} colspan={3}>
                    <Grid container justifyContent="flex-end">
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Male</Typography>
    <TextField type="number" name="male" onChange={handleGenderData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Female</Typography>
    <TextField type="number" name="female" onChange={handleGenderData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Other</Typography>
    <TextField type="number" name="other" onChange={handleGenderData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }}/>
  </Grid>
</Grid>

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
                  Faculties
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "15px",
                  }} colspan={3}>
                    <Grid container justifyContent="flex-start">
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Permanent</Typography>
    <TextField type="number" name="permanent" onChange={handleFacultyData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Temporary</Typography>
    <TextField type="number" name="temporary" onChange={handleFacultyData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
</Grid>

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
                  Infrastructure
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "15px",
                  }} colspan={3}>
                    <Grid container justifyContent="flex-start">
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Classrooms</Typography>
    <TextField type="number" name="classrooms" onChange={handleInfrastructureData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Libraries</Typography>
    <TextField type="number" name="library" onChange={handleInfrastructureData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
  <Typography style={{ marginRight: '1rem' }}>Canteen</Typography>
    <Select
    labelId="yes-no-label"
    id="yes-no"
    onChange={handleInfrastructureData}
    label="Yes or No"
    name="canteen"
  >
    <MenuItem value="Yes">Yes</MenuItem>
    <MenuItem value="No">No</MenuItem>
  </Select>
  </Grid>
</Grid>

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
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "15px",
                  }} colspan={3}>
                    <Grid container justifyContent="flex-start">
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Playground</Typography>
    <Select
    labelId="yes-no-label"
    id="yes-no"
    onChange={handleInfrastructureData}
    label="Yes or No"
    name="playground"
  >
    <MenuItem value="Yes">Yes</MenuItem>
    <MenuItem value="No">No</MenuItem>
  </Select>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Wi-Fi</Typography>
    <Select
    labelId="yes-no-label"
    id="yes-no"
    onChange={handleInfrastructureData}
    label="Yes or No"
    name="wifi"
  >
    <MenuItem value="Yes">Yes</MenuItem>
    <MenuItem value="No">No</MenuItem>
  </Select>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Hostel</Typography>
    <Select
    labelId="yes-no-label"
    id="yes-no"
    onChange={handleInfrastructureData}
    label="Yes or No"
    name="hostel"
  >
    <MenuItem value="Yes">Yes</MenuItem>
    <MenuItem value="No">No</MenuItem>
  </Select>
  </Grid>
</Grid>

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
                  Laboratories
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "15px",
                  }} colspan={3}>
                    <Grid container justifyContent="flex-start">
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Computer Lab</Typography>
    <TextField type="number" name="computerLab" onChange={handleLaboratoriesData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Electronics Lab</Typography>
    <TextField type="number" name="electronicsLab" onChange={handleLaboratoriesData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Mechanical Lab</Typography>
    <TextField type="number" name="mechanicalLab" onChange={handleLaboratoriesData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
</Grid>

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
                  Finances
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "15px",
                  }} colspan={3}>
                    <Grid container justifyContent="flex-start">
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Revenue</Typography>
    <TextField type="number" name="revenue" onChange={handleFinanceData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Expenditure</Typography>
    <TextField type="number" name="expenditure" onChange={handleFinanceData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Grants</Typography>
    <TextField type="number" name="grants" onChange={handleFinanceData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
</Grid>

                </TableCell>
              </TableRow>
              <TableRow>
              <TableCell>
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "left",
                    fontSize: "15px",
                  }} colspan={3}>
                    <Grid container justifyContent="flex-start">
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Loans</Typography>
    <TextField type="number" name="loans" onChange={handleFinanceData} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  
</Grid>

                </TableCell>
              </TableRow>
              {/* <TableRow>
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
                      </TableCell>
                
              </TableRow> */}
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  {/*<Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>Signup</Button>*/}
                  <Button disabled={isLoading} variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>
                    {isLoading ? <CircularProgress size={24} /> : 'Check Prequalifiers'}
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
