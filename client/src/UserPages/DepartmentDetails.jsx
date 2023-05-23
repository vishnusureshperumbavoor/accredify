import * as React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Select,MenuItem,Card,InputAdornment,IconButton,RadioGroup,Radio } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from '../Components/Navbar';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const currentYear = new Date().getFullYear();
const cay = `${currentYear}-${currentYear - 1}`;
const caym1 = `${currentYear - 1}-${currentYear - 2}`;
const caym2 = `${currentYear - 2}-${currentYear - 3}`;

const theme = createTheme({
    palette: {
        mode: 'dark',
      },
});

export default function DepartmentDetails() {
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
    <div>
        <Navbar/>
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="lg" sx={{marginBottom:2}}>
        <CssBaseline />
        <Box
          sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
        >
          <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 0 ,backgroundColor: "#E50914",
              "&:hover": {
                backgroundColor: "#E50914"
              }}}
            >
              Enter Department details
            </Button>
          <Box component="form" noValidate onSubmit={handleSubmit} >

              
              <Grid container alignItems="center" spacing={2}>
  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
    <Typography>Number of students</Typography>
  </Grid>
                <Grid item xs={12} sm={4} alignItems="center" spacing={2} sx={{display:'flex', justifyContent: 'center'}}>
                <Grid item xs={4} sm={6} >
    <Typography sx={{ textAlign: 'right',paddingRight:1}}>Male</Typography>
    </Grid>
  <Grid item xs={8} sm={6} >
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="number"
      value={formData.male} name="male" onChange={handleChange}
      size="small"
      sx={{ textAlign: 'left'}}
    />
    </Grid>
</Grid>
                <Grid item xs={12} sm={4} alignItems="center" spacing={2} sx={{display:'flex', justifyContent: 'center'}} >
  <Grid item xs={4} sm={6} >
    <Typography sx={{ textAlign: 'right',paddingRight:1 }}>Female</Typography>
  </Grid>
  <Grid item xs={8} sm={6} >
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="number"
      value={formData.female} name="female" onChange={handleChange}
      size="small"
      sx={{ textAlign: 'left' }}
    />
  </Grid>
</Grid>
</Grid>


{/* <Grid container sx={{mt:1}} alignItems="center" spacing={2}>
  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
    <Typography>Number of Faculties</Typography>
  </Grid>
                <Grid item xs={12} sm={4} alignItems="center" spacing={2} sx={{display:'flex', justifyContent: 'center'}}>
                <Grid item xs={4} sm={6} >
    <Typography sx={{ textAlign: 'right',paddingRight:1}}>Permanent</Typography>
    </Grid>
  <Grid item xs={8} sm={6} >
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="number"
      value={formData.permanent} name="permanent" onChange={handleChange}
      size="small"
      sx={{ textAlign: 'left'}}
    />
    </Grid>
</Grid>
                <Grid item xs={12} sm={4} alignItems="center" spacing={2} sx={{display:'flex', justifyContent: 'center'}} >
  <Grid item xs={4} sm={6} >
    <Typography sx={{ textAlign: 'right',paddingRight:1 }}>Temporary</Typography>
  </Grid>
  <Grid item xs={8} sm={6} >
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="number"
      value={formData.temporary} name="temporary" onChange={handleChange}
      size="small"
      sx={{ textAlign: 'left' }}
    />
  </Grid>
</Grid>
</Grid> */}



<Grid container sx={{mt:1}} alignItems="center" spacing={2}>
  <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
    <Typography>Finance (if any)</Typography>
  </Grid>
                <Grid item xs={12} sm={4} alignItems="center" spacing={2} sx={{display:'flex', justifyContent: 'center'}}>
                <Grid item xs={4} sm={6} >
    <Typography sx={{ textAlign: 'right',paddingRight:1}}>Revenue</Typography>
    </Grid>
  <Grid item xs={8} sm={6} >
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="number"
      value={formData.revenue} name="revenue" onChange={handleChange}
      size="small"
      sx={{ textAlign: 'left'}}
    />
    </Grid>
</Grid>
<Grid item xs={12} sm={4} alignItems="center" spacing={2} sx={{display:'flex', justifyContent: 'center'}}>
                <Grid item xs={4} sm={6} >
    <Typography sx={{ textAlign: 'right',paddingRight:1}}>Expenditure</Typography>
    </Grid>
  <Grid item xs={8} sm={6} >
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="number"
      value={formData.expenditure} name="expenditure" onChange={handleChange}
      size="small"
      sx={{ textAlign: 'left'}}
    />
    </Grid>
</Grid>
<Grid item xs={12} sm={4} alignItems="center" spacing={2} sx={{display:'flex', justifyContent: 'center'}}>        
</Grid>
<Grid item xs={12} sm={4} alignItems="center" spacing={2} sx={{display:'flex', justifyContent: 'center'}}>
                <Grid item xs={4} sm={6} >
    <Typography sx={{ textAlign: 'right',paddingRight:1}}>Grants</Typography>
    </Grid>
  <Grid item xs={8} sm={6} >
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="number"
      value={formData.grants} name="grants" onChange={handleChange}
      size="small"
      sx={{ textAlign: 'left'}}
    />
    </Grid>
</Grid>
                <Grid item xs={12} sm={4} alignItems="center" spacing={2} sx={{display:'flex', justifyContent: 'center'}} >
  <Grid item xs={4} sm={6} >
    <Typography sx={{ textAlign: 'right',paddingRight:1 }}>Loans</Typography>
  </Grid>
  <Grid item xs={8} sm={6} >
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="number"
      value={formData.loans} name="loans" onChange={handleChange}
      size="small"
      sx={{ textAlign: 'left' }}
    />
  </Grid>
</Grid>
</Grid>

              <Grid container spacing={2} sx={{mt:2}}>
              <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
              <Button variant="contained" 
                   onClick={()=>navigate("/conditions4")}>
                    Go Back
                  </Button>
              </Grid>
              <Grid item xs={6} sm={6} sx={{ textAlign: 'left' }}>
              <Button variant="contained" 
                  onClick={handleSubmit}>
                    Continue
                  </Button>
              </Grid>
              </Grid>
            
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  )
}
