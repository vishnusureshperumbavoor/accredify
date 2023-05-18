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

export default function Condition32() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    axios.post(`${SERVER_URL}/getUserDetails`,{userId}).then((response)=>{
      console.log(response.data.user)
      if(response.data.user.details)
        setData(response.data.user.details);
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  const handleNum4Blur = () => {
    if (Number(data.num4) > Number(data.num1)) {
      setError1(true);
    } else {
      setError1(false);
    }
  };

  const handleNum5Blur = () => {
    if (Number(data.num5) > Number(data.num2)) {
      setError2(true);
    } else {
      setError2(false);
    }
  };

  const handleNum6Blur = () => {
    if (Number(data.num6) > Number(data.num3)) {
      setError3(true);
    } else {
      setError3(false);
    }
  };

  let sum1 = Number(data.instituteLevelSanctionIntake2022) + Number(data.instituteLevelSanctionIntake2021) + Number(data.instituteLevelSanctionIntake2020);
  sum1 = isNaN(sum1) ? 0 : sum1;
  let sum2 = Number(data.instituteLevelAdmission2022) + Number(data.instituteLevelAdmission2021) + Number(data.instituteLevelAdmission2020);
  sum2 = isNaN(sum2) ? 0 : sum2;
  const total = ((sum2*100) / sum1).toFixed(2);
  const formattedTotal = isNaN(total) ? 0 : total;

  const handleNumChange = (event,setNum) => { 
    setData({ ...data, [event.target.name]: event.target.value });
    localStorage.setItem('condition3', JSON.stringify(data));
  };

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    const result = total < 50 ? "No" : "Yes";
    existingResults.page3 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
    axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, data).then((res)=>{
      console.log(res.data)
      if(res.status===200){;
        navigate('/condition4')
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
              PREQUALIFIERS (CONDITION 3)
            </Button>
          <Box component="form" noValidate onSubmit={handleSubmit} >
           

              <Grid item sx={{mb:1}}>
                <Typography sx={{textAlign: 'center'}} >Student Admission (Institute level)</Typography>
              </Grid>

              <Grid container spacing={2} sx={{mb:2,mt:1,textAlign: 'center'}}>
                <Grid item xs={12} sm={3}>
                Sanctioned Intake (1st year)
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.instituteLevelSanctionIntake2022} 
                name="instituteLevelSanctionIntake2022" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAY (${cay})`}
                InputLabelProps={{
                  shrink: data.instituteLevelSanctionIntake2022 ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.instituteLevelSanctionIntake2021} 
                name="instituteLevelSanctionIntake2021" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm1 (${caym1})`}
                InputLabelProps={{
                  shrink: data.instituteLevelSanctionIntake2021 ? true : undefined,
                }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.instituteLevelSanctionIntake2020} 
                name="instituteLevelSanctionIntake2020" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm2 (${caym2})`} 
                InputLabelProps={{
                  shrink: data.instituteLevelSanctionIntake2020 ? true : undefined,
                }}/>
                </Grid>
              </Grid>


              <Grid container spacing={2} sx={{mb:2,mt:1,textAlign: 'center'}} >
                <Grid item xs={12} sm={3}>
                Number of students admitted
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" name="instituteLevelAdmission2022" value={data.instituteLevelAdmission2022} 
                onInput={handleNumChange} onBlur={handleNumChange} error={error1} size="small" label={`CAY (${cay})`}
                InputLabelProps={{
                  shrink: data.instituteLevelAdmission2022 ? true : undefined,
                }}/>
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" name="instituteLevelAdmission2021" value={data.instituteLevelAdmission2021} 
                onInput={handleNumChange} onBlur={handleNumChange}  error={error2} size="small" label={`CAYm1 (${caym1})`}
                InputLabelProps={{
                  shrink: data.instituteLevelAdmission2021 ? true : undefined,
                }}
                />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" name="instituteLevelAdmission2020" value={data.instituteLevelAdmission2020} 
                onInput={handleNumChange} onBlur={handleNumChange} error={error3} size="small" label={`CAYm2 (${caym2})`}
                InputLabelProps={{
                  shrink: data.instituteLevelAdmission2020 ? true : undefined,
                }}
                 />
                </Grid>
              </Grid>

              <Grid item>
                {total && <typography sx={{mb:2,mt:1,textAlign: 'center'}} >Students admitted over last 3 assessment years : {formattedTotal}%</typography>}
              </Grid>


              <Grid item>
                {total < 50 ? (
                  <Typography color="error" style={{
                    textAlign: "center",paddingTop:"15px"
                  }}>
                    You cannot apply for NB Accreditation if the percentage of students admitted over last 3 assessment years in the 
                    institution is less than 50%
                  </Typography>
                ) : null}
              </Grid>

              <Grid container spacing={2} sx={{pt:1}}>
              <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
              <Button variant="contained" 
                   onClick={()=>navigate("/conditions2")}>
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
