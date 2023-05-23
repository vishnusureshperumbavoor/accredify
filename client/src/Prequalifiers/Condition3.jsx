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
const caym3 = `${currentYear - 3}-${currentYear - 4}`;
const caym4 = `${currentYear - 4}-${currentYear - 5}`;

const theme = createTheme({
    palette: {
        mode: 'dark',
      },
});

export default function Condition3() {
  const navigate = useNavigate();

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

  const handleNumChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    localStorage.setItem('condition3', JSON.stringify(data));
  };

  let caystudents = Number(data.cayai) + Number(data.caym1ai) + Number(data.caym2ai) + Number(data.caym1le) + Number(data.caym2le);
  let caym1students = Number(data.caym1ai) + Number(data.caym2ai) + Number(data.caym3ai) + Number(data.caym2le) + Number(data.caym3le);
  let caym2students = Number(data.caym2ai) + Number(data.caym3ai) + Number(data.caym4ai) +  + Number(data.caym3le) + Number(data.caym4le);

  let caysfr = (Number(caystudents)/Number(data.cayFaculties)).toFixed(2);
  let caym1sfr = (Number(caym1students)/Number(data.caym1Faculties)).toFixed(2);
  let caym2sfr = (Number(caym2students)/Number(data.caym2Faculties)).toFixed(2);

  let sfr = ((Number(caysfr) + Number(caym1sfr) + Number(caym2sfr))/3).toFixed(2);

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    const result = sfr > 25 ? "No" : "Yes";
    existingResults.page3 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
      axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, data).then((res)=>{
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
      <Container component="main" maxWidth="md" sx={{marginBottom:2}}>
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
              sx={{ mt: 3, mb: 1, borderRadius: 0 ,backgroundColor: "#E50914", fontWeight:"bold",fontSize:24,
              "&:hover": {
                backgroundColor: "#E50914"
              }}}
            >
              STUDENT FACULTY RATIO
            </Button>
          <Box sx={{mt:1}} component="form" noValidate onSubmit={handleSubmit} >
              
              <Grid container spacing={2} sx={{mb:1,textAlign:"center"}} >
                <Grid item xs={12} sm={12}>
              <Typography sx={{textAlign: 'center'}}>
                  Student Faculty Ratio should not be greater than 1:25
                </Typography>
              </Grid>
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Approved Intake</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cayai} 
                name="cayai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAY (${cay})`}
                InputLabelProps={{
                  shrink: data.cayai ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym1ai} 
                name="caym1ai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAYm1 (${caym1})`}
                InputLabelProps={{
                  shrink: data.caym1ai ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym2ai} 
                name="caym2ai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAYm2 (${caym2})`}
                InputLabelProps={{
                  shrink: data.caym2ai ? true : undefined,
                }}  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{mb:1,textAlign:"center"}} >
                <Grid item xs={12} sm={3}>
                
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym3ai} 
                name="caym3ai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAYm3 (${caym3})`}
                InputLabelProps={{
                  shrink: data.caym3ai ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym4ai} 
                name="caym4ai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAYm4 (${caym4})`}
                InputLabelProps={{
                  shrink: data.caym4ai ? true : undefined,
                }}  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{mb:1,textAlign:"center",mt:1}}>
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Lateral Entry</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym1le} 
                name="caym1le" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm1 (${caym1})`}
                InputLabelProps={{
                  shrink: data.caym1le ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym2le} 
                name="caym2le" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm2 (${caym2})`}
                InputLabelProps={{
                  shrink: data.caym2le ? true : undefined,
                }}  />
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{mb:1,textAlign:"center"}}>
                <Grid item xs={12} sm={3}>
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym3le} 
                name="caym3le" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm3 (${caym3})`}
                InputLabelProps={{
                  shrink: data.caym3le ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym4le} 
                name="caym4le" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm4 (${caym4})`}
                InputLabelProps={{
                  shrink: data.caym4le ? true : undefined,
                }}  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{textAlign:"center",mt:1}}>
                <Grid item xs={12} sm={3}>
                <Typography>Faculties</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cayFaculties} 
                name="cayFaculties" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAY (${cay})`}
                InputLabelProps={{
                  shrink: data.cayFaculties ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym1Faculties} 
                name="caym1Faculties" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm1 (${caym1})`}
                InputLabelProps={{
                  shrink: data.caym1Faculties ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym2Faculties} 
                name="caym2Faculties" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm2 (${caym2})`}
                InputLabelProps={{
                  shrink: data.caym2Faculties ? true : undefined,
                }}  />
                </Grid>
                </Grid>
              <Grid item sx={{mt:1}}>
              {<Typography style={{textAlign:"center",fontWeight:"bold",fontSize:"30px"}}>Student Faculty Ratio 1 : {sfr}</Typography>} 
              </Grid>


              <Grid item>
              {sfr > 25 ? (
                  <Typography color="error" style={{
                    textAlign: "center"
                  }}>
                    You cannot apply for NB Accreditation if the Student Faculty Ratio is greater than 1:25
                  </Typography>
            ) : null}
              </Grid>

              <Grid container spacing={2} sx={{pt:1}}>
              <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
              <Button variant="contained" 
                   onClick={()=>navigate("/condition2")}>
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
