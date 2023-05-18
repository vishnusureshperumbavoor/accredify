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

export default function Condition52() {
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
    localStorage.setItem('condition5', JSON.stringify(data));
  };

  let totalstudents = Number(data.cay1styearsai) + Number(data.caym11styearsai) + Number(data.caym21styearsai) + Number(data.cay2ndyearsai) + Number(data.caym12ndyearsai) + Number(data.caym22ndyearsai) + Number(data.cay3rdyearsai) + Number(data.caym13rdyearsai) + Number(data.caym23rdyearsai) + Number(data.cay2ndyearsle) + Number(data.caym12ndyearsle) + Number(data.caym22ndyearsle) + Number(data.cay3rdyearsle) + Number(data.caym13rdyearsle) + Number(data.caym23rdyearsle)
  let faculties = Number(data.cayFaculties) + Number(data.caym1Faculties) + Number(data.caym2Faculties)
  let sfr = (totalstudents/faculties).toFixed(2);
  // sum1 = isNaN(sum1) ? 0 : sum1;
  // let sum2 = Number(data.programLevelAdmission2022) + Number(data.programLevelAdmission2021) + Number(data.programLevelAdmission2020);
  // sum2 = isNaN(sum2) ? 0 : sum2;
 
  // const total = ((sum2*100) / sum1).toFixed(2);
  // const formattedTotal = isNaN(total) ? 0 : total;

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    const result = sfr > 25 ? "No" : "Yes";
    existingResults.page5 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
      axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, data).then((res)=>{
        if(res.status===200){;
          navigate('/condition6')
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
              sx={{ mt: 3, mb: 2, borderRadius: 0 ,backgroundColor: "#E50914",
              "&:hover": {
                backgroundColor: "#E50914"
              }}}
            >
              PREQUALIFIERS (CONDITION 5)
            </Button>
          <Box component="form" noValidate onSubmit={handleSubmit} >
            <Grid container spacing={2} sx={{mb:2,mt:1}}>
              <Grid item sx={{mb:1}} xs={12} sm={12}>
                <Typography sx={{textAlign: 'center'}}>CAY ({cay})</Typography>
              </Grid>
            </Grid>

              <Grid container spacing={2} sx={{mb:1,textAlign:"center"}} >
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Approved Intake</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cay3rdyearsai} 
                name="cay3rdyearsai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAYm2 (${caym2})`}
                InputLabelProps={{
                  shrink: data.cay3rdyearsai ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cay2ndyearsai} 
                name="cay2ndyearsai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAYm1 (${caym1})`}
                InputLabelProps={{
                  shrink: data.cay2ndyearsai ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cay1styearsai} 
                name="cay1styearsai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAY (${cay})`}
                InputLabelProps={{
                  shrink: data.cay1styearsai ? true : undefined,
                }}  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{mb:1,textAlign:"center"}}>
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Lateral Entry</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cay3rdyearsle} 
                name="cay3rdyearsle" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm2 (${caym2})`}
                InputLabelProps={{
                  shrink: data.cay3rdyearsle ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cay2ndyearsle} 
                name="cay2ndyearsle" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm1 (${caym1})`}
                InputLabelProps={{
                  shrink: data.cay2ndyearsle ? true : undefined,
                }}  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{textAlign:"center"}}>
                <Grid item xs={12} sm={3}>
                <Typography>Faculties</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.cayFaculties} 
                name="cayFaculties" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}}
                InputLabelProps={{
                  shrink: data.cayFaculties ? true : undefined,
                }}  />
                </Grid>
                </Grid>
           
            


                <Grid container spacing={2} sx={{mb:2,mt:1,textAlign:"center"}}>
                  <Grid item sx={{mb:1}} xs={12} sm={12}>
                    <Typography>CAYm1 ({caym1})</Typography>
                  </Grid>
                </Grid>

              <Grid container spacing={2} sx={{mb:1,textAlign:"center"}}>
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Approved Intake</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym13rdyearsai} 
                name="caym13rdyearsai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm3 (${caym3})`}
                InputLabelProps={{
                  shrink: data.caym13rdyearsai ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym12ndyearsai} 
                name="caym12ndyearsai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAYm2 (${caym2})`}
                InputLabelProps={{
                  shrink: data.caym12ndyearsai ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym11styearsai} 
                name="caym11styearsai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"center"}} label={`CAYm1 (${caym1})`}
                InputLabelProps={{
                  shrink: data.caym11styearsai ? true : undefined,
                }}  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{mb:1,textAlign:"center"}}>
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Lateral Entry</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym13rdyearsle} 
                name="caym13rdyearsle" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm3 (${caym3})`}
                InputLabelProps={{
                  shrink: data.caym13rdyearsle ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym12ndyearsle} 
                name="caym12ndyearsle" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm2 (${caym2})`}
                InputLabelProps={{
                  shrink: data.caym12ndyearsle ? true : undefined,
                }}  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{textAlign:"center"}}>
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Faculties</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym1Faculties} 
                name="caym1Faculties" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}}
                InputLabelProps={{
                  shrink: data.caym1Faculties ? true : undefined,
                }}  />
                </Grid>
                </Grid>


              
                <Grid container spacing={2} sx={{mb:2,mt:1}}>
                  <Grid item sx={{mb:1}} xs={12} sm={12}>
                    <Typography sx={{textAlign: 'center'}}>CAYm2 ({caym2})</Typography>
                  </Grid>
                </Grid>

              <Grid container spacing={2} sx={{mb:1,textAlign:"center"}}>
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Approved Intake</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym23rdyearsai} 
                name="caym23rdyearsai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm4 (${caym4})`}
                InputLabelProps={{
                  shrink: data.caym23rdyearsai ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym22ndyearsai} 
                name="caym22ndyearsai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm3 (${caym3})`}
                InputLabelProps={{
                  shrink: data.caym22ndyearsai ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym21styearsai} 
                name="caym21styearsai" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm2 (${caym2})`}
                InputLabelProps={{
                  shrink: data.cay1styearsai ? true : undefined,
                }}  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{mb:1,textAlign:"center"}}>
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Lateral Entry</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym23rdyearsle} 
                name="caym23rdyearsle" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm4 (${caym4})`}
                InputLabelProps={{
                  shrink: data.caym23rdyearsle ? true : undefined,
                }}  />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym22ndyearsle} 
                name="caym22ndyearsle" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}} label={`CAYm3 (${caym3})`}
                InputLabelProps={{
                  shrink: data.caym22ndyearsle ? true : undefined,
                }}  />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{textAlign:"center",mb:1}}>
                <Grid item xs={12} sm={3}>
                <Typography sx={{textAlign:"center"}}>Faculties</Typography> 
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym2Faculties} 
                name="caym2Faculties" onInput={handleNumChange} onBlur={handleNumChange} size="small" sx={{textAlign:"left"}}
                InputLabelProps={{
                  shrink: data.caym2Faculties ? true : undefined,
                }}  />
                </Grid>
                </Grid>
            

              <Grid item>
              {isFinite(sfr) && <Typography style={{textAlign:"center",fontWeight:"bold",fontSize:"30px"}}>Student Faculty Ratio 1 : {sfr}</Typography>} 
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
                   onClick={()=>navigate("/condition4")}>
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
