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
  // const [email, setEmail] = useState('');
  // const [emailError, setEmailError] = useState(false);
  const [data,setData] = useState({})
  const [institutionType,setInstitutionType] = useState('')
  const [program,setProgram] = useState('')
  const [affiliated,setAffiliated] = useState('')
  const [phone,setPhone] = useState('')
  const [establishment,setEstablishment] = useState('')
  const [approval,setApproval] = useState('')
  const [male,setMale] = useState('')
  const [female,setFemale] = useState('')
  const [other,setOther] = useState('')
  const [permanent,setPermanent] = useState('')
  const [temporary,setTemporary] = useState('')
  const [classrooms,setClassrooms] = useState('')
  const [library,setLibrary] = useState('')
  const [canteen,setCanteen] = useState('')
  const [playground,setPlayground] = useState('')
  const [hostel,setHostel] = useState('')
  const [wifi,setWifi] = useState('')
  const [computerlab,setCompuerlab] = useState('')
  const [electronicslab,setElectronicslab] = useState('')
  const [mechlab,setMechlab] = useState('')
  const [revenue,setRevenue] = useState('')
  const [expenditure,setExpenditure] = useState('')
  const [grants,setGrants] = useState('')
  const [loans,setLoans] = useState('')

  // const [states, setStates] = useState([]);
  // const [districts, setDistricts] = useState([]);
  // const [selectedStateId, setSelectedStateId] = useState('');
  // const [selectedStateName, setSelectedStateName] = useState('');
  // const [selectedDistrict, setSelectedDistrict] = useState('');
  // const [formData, setFormData] = useState({
  //   state:selectedStateName,
  //   district:selectedDistrict,
  //   status:"pending",
  // });

  // const [genderData, setGenderData] = useState({})
  // const handleGenderData=((event)=>{ 
  //   setGenderData({...genderData, [event.target.name]: event.target.value})
  // })
  // const [facultyData, setFacultyData] = useState({})
  // const handleFacultyData=((event)=>{ 
  //   setFacultyData({...facultyData, [event.target.name]: event.target.value})
  // })
  
  // const [infrastructureData, setInfrastructureData] = useState({})
  // const handleInfrastructureData=((event)=>{
  //   setInfrastructureData({...infrastructureData, [event.target.name]: event.target.value})
  // })
  // const [financeData, setFinanceData] = useState({})
  // const handleFinanceData=((event)=>{
  //   setFinanceData({...financeData, [event.target.name]: event.target.value})
  // })

  // const [laboratoriesData, setLaboratoriesData] = useState({})
  // const handleLaboratoriesData=((event)=>{
  //   setLaboratoriesData({...laboratoriesData, [event.target.name]: event.target.value})
  // })

  useEffect(() => {
    const userId = localStorage.getItem("userId");  
    if (userId) {
      axios.post(`${SERVER_URL}/getUserDetails/${userId}`)
        .then((res) => {
              console.log(res.data);
              setData(res.data);
              setInstitutionType(res.data.user.collegeDetails.general.institutionType)
              setProgram(res.data.user.collegeDetails.general.program)
              setAffiliated(res.data.user.collegeDetails.general.organization)
              setPhone(res.data.user.collegeDetails.general.phone)
              setEstablishment(res.data.user.collegeDetails.general.year_of_establishment)
              setApproval(res.data.user.collegeDetails.general.first_approval)
              setMale(res.data.user.collegeDetails.gender.male)
              setFemale(res.data.user.collegeDetails.gender.female)
              setOther(res.data.user.collegeDetails.gender.other)
              setPermanent(res.data.user.collegeDetails.faculty.permanent)
              setTemporary(res.data.user.collegeDetails.faculty.temporary)
              setClassrooms(res.data.user.collegeDetails.infrastructure.classrooms)
              setLibrary(res.data.user.collegeDetails.infrastructure.library)
              setCanteen(res.data.user.collegeDetails.infrastructure.canteen)
              setPlayground(res.data.user.collegeDetails.infrastructure.playground)
              setHostel(res.data.user.collegeDetails.infrastructure.hostel)
              setWifi(res.data.user.collegeDetails.infrastructure.wifi)
              setCompuerlab(res.data.user.collegeDetails.laboratories.computerLab)
              setElectronicslab(res.data.user.collegeDetails.laboratories.electronicsLab)
              setMechlab(res.data.user.collegeDetails.laboratories.mechanicalLab)
              setRevenue(res.data.user.collegeDetails.finance.revenue)
              setExpenditure(res.data.user.collegeDetails.finance.expenditure)
              setGrants(res.data.user.collegeDetails.finance.grants)
              setLoans(res.data.user.collegeDetails.finance.loans)
        })
        .catch((err) => {
          console.log(err);
          // Handle error
        });
    }
  }, []);

  // const handleStateChange= ((e)=>{
  //   setSelectedStateId(e.target.value);
  //   setSelectedStateName(e.target.getAttribute("name"))
  //   setSelectedDistrict('')
  // })
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   const generalDataObj = { general: formData };
  //   const genderDataObj = { gender: genderData };
  //   const facultyDataObj = { faculty: facultyData };
  //   const infrastructureDataObj = { infrastructure: infrastructureData };
  //   const financeDataObj = { finance: financeData };
  //   const laboratoriesDataObj = { laboratories: laboratoriesData };
  //   const dataObj = {
  //     ...generalDataObj,
  //     ...genderDataObj,
  //     ...facultyDataObj,
  //     ...infrastructureDataObj,
  //     ...financeDataObj,
  //     ...laboratoriesDataObj,
  //   };
  //   axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, dataObj).then((res)=>{
  //     console.log(res.data) 
  //     if(res.status===200){
  //       setIsLoading(false);
  //       navigate('/condition1')
  //     }
  //   }).catch((err)=>{
  //     alert("error")
  //     setIsLoading(false);
  //   })
  // };


  // const handleEmailChange = (event) => {
  //   const input = event.target.value;
  //   setEmail(input);
  //   setEmailError(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input));
  //   handleChange(event);
  // };

  return (
    <div style={{ margin:0,padding:0 , paddingTop: "30px"}}>
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
                  COLLEGE PROFILE
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
                  Institute type:
                </TableCell>
                <TableCell align="left">
                  <Typography>{institutionType}</Typography>
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
                <Typography>{program}</Typography>
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
                <Typography>{affiliated}</Typography>
                </TableCell>
                <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Phone No.
                </TableCell>
                <TableCell>
                <Typography>{phone}</Typography>
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
                <Typography>{establishment}</Typography>
                </TableCell>
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
                <Typography>{approval}</Typography>
                </TableCell>
                {/* <TableCell style={{
                    fontWeight: "bold", 
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Website
                </TableCell>
                <TableCell>
                <Typography>{data.user.collegeDetails.general.website}</Typography>
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
                { data  ? (<Typography>{data.user.collegeDetails.general.postal_address}</Typography>) : null }
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
    <Typography>{male}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Female</Typography>
    <Typography>{female}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
    <Typography style={{ marginRight: '1rem' }}>Other</Typography>
    <Typography>{other}</Typography>
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
    <Typography>{permanent}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Temporary</Typography>
    <Typography>{temporary}</Typography>
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
    <Typography>{classrooms}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Libraries</Typography>
    <Typography>{library}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
  <Typography style={{ marginRight: '1rem' }}>Canteen</Typography>
  <Typography>{canteen}</Typography>
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
    <Typography>{playground}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Wi-Fi</Typography>
    <Typography>{wifi}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Hostel</Typography>
    <Typography>{hostel}</Typography>
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
    <Typography>{computerlab}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Electronics Lab</Typography>
    <Typography>{electronicslab}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Mechanical Lab</Typography>
    <Typography>{mechlab}</Typography>
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
    <Typography>{revenue}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Expenditure</Typography>
    <Typography>{expenditure}</Typography>
  </Grid>
  <Grid item xs={12} sm={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start'  }}>
    <Typography style={{ marginRight: '1rem' }}>Grants</Typography>
    <Typography>{grants}</Typography>
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
    <Typography>{loans}</Typography>
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
                  {/* <Button disabled={isLoading} variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>
                    {isLoading ? <CircularProgress size={24} /> : 'Check Prequalifiers'}
                  </Button> */}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
