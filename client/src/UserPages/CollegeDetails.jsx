import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
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
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
import Navbar from "../Components/Navbar";
import {FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export default function CollegeDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState('')
  const [districts, setDistricts] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [formData, setFormData] = useState({
    institutionType:"government-institute",
    program:"Diploma",
    affiliatedBy:"AICTE",
    canteen:"Yes",
    playground:"Yes",
    wifi:"Yes",
    hostel:"Yes",
  });

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    axios.post(`${SERVER_URL}/getUserDetails`,{userId}).then((response)=>{
      console.log(response.data.user)
      if(response.data.user.details)
        setFormData(response.data.user.details);
    }).catch((err)=>{
      console.log(err)
    })
    
  },[])

  useEffect(() => {
    axios
      .get("https://cdn-api.co-vin.in/api/v2/admin/location/states")
      .then((response) => {
        setStates(response.data.states);
      })
      .catch((error) => {
        console.log(error);
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


  const handleDistrict = (e) => {
    const getStateId = e.target.value;
    setStateId(getStateId);
    // getDistrict();
    };  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.phone) {
      alert("phone number should not be empty")
      setIsLoading(false);
      return;
    }
    if (!formData.yearOfEstablishment) {
      alert("year of establishment should not be empty")
      setIsLoading(false);
      return;
    }
    if (!formData.yearOfApproval) {
      alert("Year of approval from AICTE should not be empty")
      setIsLoading(false);
      return;
    }
    if (!formData.male) {
      alert("Please enter number of male students")
      setIsLoading(false);
      return;
    }
    if (!formData.female) {
      alert("Please enter number of female students")
      setIsLoading(false);
      return;
    }
    if (!formData.other) {
      alert("Please enter number of students in other categories")
      setIsLoading(false);
      return;
    }
    if (!formData.permanent) {
      alert("Please enter number of permanent faculty members")
      setIsLoading(false);
      return;
    }
    if (!formData.temporary) {
      alert("Please enter number of temporary faculty members")
      setIsLoading(false);
      return;
    }
    if (!formData.classrooms) {
      alert("Please enter number of classrooms")
      setIsLoading(false);
      return;
    }
    if (!formData.library) {
      alert("Please enter number of libraries")
      setIsLoading(false);
      return;
    }
    if (!formData.computerLab) {
      alert("Please enter number of computer Labs")
      setIsLoading(false);
      return;
    }
    if (!formData.electronicsLab) {
      alert("Please enter number of electronics Labs")
      setIsLoading(false);
      return;
    }
    if (!formData.mechanicalLab) {
      alert("Please enter number of mechanical labs")
      setIsLoading(false);
      return;
    }
    if (!formData.revenue) {
      alert("Please enter revenue of the college")
      setIsLoading(false);
      return;
    }
    if (!formData.expenditure) {
      alert("Please enter expenditure of the college")
      setIsLoading(false);
      return;
    }
    if (!formData.grants) {
      alert("Please enter grants of the college. If college received any")
      setIsLoading(false);
      return;
    }
    if (!formData.loans) {
      alert("Please enter loans of the college")
      setIsLoading(false);
      return;
    }

    axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, formData).then((res)=>{
      console.log(res.data)
      if(res.status===200){
        setIsLoading(false);
        alert("updated details successfully")
        // navigate('/condition1')
      }
    }).catch((err)=>{
      alert("error")
      setIsLoading(false);
    })
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
                  <Typography>Enter College Details for better consultation</Typography>
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
        defaultValue="government-institute"
        value={formData.institutionType}
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
        defaultValue="Diploma"
        value={formData.program}
      >
        <MenuItem value="Diploma">Diploma</MenuItem>
        <MenuItem value="BTech">B.Tech</MenuItem>
        <MenuItem value="MTech">M.Tech</MenuItem>
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
        name="affiliatedBy"
        value={formData.affiliatedBy}
        defaultValue="AICTE"
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
                <TextField name="phone" type="tel" onChange={handleChange} inputProps={{ pattern: "[0-9]{10}" }}  id="outlined-basic" 
                variant="outlined" value={formData.phone} />
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
                  <TextField value={formData.yearOfEstablishment} name="yearOfEstablishment" onChange={handleChange} id="outlined-basic" variant="outlined" type="number"/>
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}
                >
                  Year of approval from AICTE
                </TableCell>
                <TableCell>
                  <TextField value={formData.yearOfApproval} name="yearOfApproval" onChange={handleChange} id="outlined-basic" variant="outlined" type="number" />
                </TableCell>
                {/* <TableCell style={{
                    fontWeight: "bold", 
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Website
                </TableCell>
                <TableCell>
                <TextField name="website" onChange={handleChange} id="outlined-basic" variant="outlined" />
                </TableCell> */}
              </TableRow>
              <TableRow>
                
                {/* <TableCell
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
                </TableCell> */}
                
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
                  Student's Gender
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }} colspan={3}>
                    <Grid container justifyContent="flex-end">
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Male</Typography>
    <TextField type="number" value={formData.male} name="male" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Female</Typography>
    <TextField type="number" value={formData.female} name="female" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Other</Typography>
    <TextField type="number" value={formData.other} name="other" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }}/>
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
    <TextField type="number" name="permanent" value={formData.permanent} onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Temporary</Typography>
    <TextField type="number" name="temporary" value={formData.temporary} onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
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
    <TextField type="number" value={formData.classrooms} name="classrooms" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Libraries</Typography>
    <TextField type="number" value={formData.library} name="library" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
  <Typography style={{ marginRight: '1rem' }}>Canteen</Typography>
    <Select
    labelId="yes-no-label"
    id="yes-no"
    onChange={handleChange}
    label="Yes or No"
    name="canteen"
    defaultValue="Yes"
    value={formData.canteen}
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
    onChange={handleChange}
    label="Yes or No"
    name="playground"
    defaultValue="Yes"
    value={formData.playground}
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
    onChange={handleChange}
    label="Yes or No"
    name="wifi"
    defaultValue="Yes"
    value={formData.wifi}
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
    onChange={handleChange}
    label="Yes or No"
    name="hostel"
    defaultValue="Yes"
    value={formData.hostel}
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
    <TextField type="number" value={formData.computerLab} name="computerLab" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Electronics Lab</Typography>
    <TextField type="number" value={formData.electronicsLab} name="electronicsLab" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Mechanical Lab</Typography>
    <TextField type="number" value={formData.mechanicalLab} name="mechanicalLab" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
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
    <TextField type="number" value={formData.revenue} name="revenue" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Expenditure</Typography>
    <TextField type="number" value={formData.expenditure} name="expenditure" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Grants</Typography>
    <TextField type="number" value={formData.grants} name="grants" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
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
    <TextField type="number" value={formData.loans} name="loans" onChange={handleChange} id="outlined-basic" variant="outlined" sx={{ width: "50%" }} />
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
                  <FormControl sx={{ m: 1, minWidth: 240 }}>
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
                        <MenuItem key={res.state_id} value={res.state_name} name={res.state_name}>
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
                    {isLoading ? <CircularProgress size={24} /> : 'Update Details'} 
                  </Button>
                  <Button disabled={isLoading} variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate('/condition1')}>
                    Check Conditions
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
