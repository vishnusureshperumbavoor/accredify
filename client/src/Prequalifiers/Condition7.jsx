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

const theme = createTheme({
    palette: {
        mode: 'dark',
      },
});

export default function Condition72() {
  const navigate = useNavigate();
  const [condition5Data, setCondition5Data] = useState({});
  const [data, setData] = useState({});

  
  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    axios.post(`${SERVER_URL}/getUserDetails`,{userId}).then((response)=>{
      if(response.data.user.details)
        setData(response.data.user.details);
    }).catch((err)=>{
      console.log(err)
    })
    
  },[])
  
  const faculties = Number(data.cayFaculties) + Number(data.caym1Faculties)
  const phds = Number(data.cayFacultiesPhd) + Number(data.caym1FacultiesPhd)
  const phd = ((phds*100)/faculties).toFixed(2);

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
    axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, data).then((res)=>{
      if(res.status===200){;
        navigate('/condition8')
      }
    }).catch((err)=>{
      alert("error")
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
              PREQUALIFIERS (CONDITION 7)
            </Button>
          <Box component="form" noValidate onSubmit={handleSubmit} >
           

              <Grid item sx={{mb:1}}>
                <Typography sx={{textAlign: 'center'}} >Number of available Ph.Ds in the department</Typography>
              </Grid>

              <Grid container spacing={2} sx={{mb:2,mt:1,textAlign: 'center'}}>
                <Grid item xs={12} sm={4}>
                Number of faculties
                </Grid>

                
                <Grid item xs={12} sm={4}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cayFaculties} 
                name="cayFaculties" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAY (${cay})`}
                InputLabelProps={{
                  shrink: data.cayFaculties ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym1Faculties} 
                name="caym1Faculties" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm1 (${caym1})`} 
                InputLabelProps={{
                  shrink: data.caym1Faculties ? true : undefined,
                }} />
                </Grid>
              </Grid>


              <Grid container spacing={2} sx={{mb:2,mt:1,textAlign: 'center'}} >
                <Grid item xs={12} sm={4}>
                Number of faculties with PHDs
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cayFacultiesPhd} 
                name="cayFacultiesPhd" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAY (${cay})`} 
                InputLabelProps={{
                  shrink: data.cayFacultiesPhd ? true : undefined,
                }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym1FacultiesPhd} 
              name="caym1FacultiesPhd" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm1 (${caym1})`} 
                InputLabelProps={{
                  shrink: data.caym1FacultiesPhd ? true : undefined,
                }}
                />
                </Grid>
              </Grid>

              <Grid item>
              {!isNaN(phd) && (
  <Typography sx={{mb:2, mt:1, textAlign: 'center'}}>
    Percentage of teachers with PhD = {phd}%
  </Typography>
)}
              </Grid>


              <Grid item>
              {phd < 10 ? (
                  <Typography color="error" style={{
                    textAlign: "center",paddingTop:"15px"
                  }}>
                    You cannot apply for NB Accreditation if the percentage of faculties with PhDs and total faculties is
                    lesser than 10%
                  </Typography>
            ) : null}
              </Grid>

              <Grid container spacing={2} sx={{pt:1}}>
              <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
              <Button variant="contained" 
                   onClick={()=>navigate("/condition6")}>
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
