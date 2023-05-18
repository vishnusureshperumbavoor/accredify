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

const theme = createTheme({
    palette: {
        mode: 'dark',
      },
});

export default function Condition82() {
  const navigate = useNavigate();
  const [condition5Data, setCondition5Data] = useState({});
  const [data, setData] = useState({});

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    axios.post(`${SERVER_URL}/getUserDetails`,{userId}).then((response)=>{
      console.log(response.data.user.details)
      if(response.data.user.details)
        setData(response.data.user.details);
    }).catch((err)=>{
      console.log(err)
    })
    
  },[])

  let caym1per = ((Number(data.caym1graduates)*100) / Number(data.caym1exam)).toFixed(2)
  let caym2per = ((Number(data.caym2graduates)*100) / Number(data.caym2exam)).toFixed(2)
  let caym3per = ((Number(data.caym3graduates)*100) / Number(data.caym3exam)).toFixed(2)

  let count = 0

  if (caym1per >= 80)
    count++;
  if (caym2per >= 80)
    count++;
  if (caym3per >= 80)
    count++;

  const handleNumChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    localStorage.setItem('condition8', JSON.stringify(data));
  };

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    const result = (count>=2)  ? "Yes" : "No";
    existingResults.page8 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
    axios.post(`${SERVER_URL}/addDetails/${localStorage.getItem("userId")}`, data).then((res)=>{
      if(res.status===200){;
        navigate('/condition')
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
              PREQUALIFIERS (CONDITION 8)
            </Button>
          <Box component="form" noValidate onSubmit={handleSubmit} >
           

              <Grid item sx={{mb:1}}>
                <Typography sx={{textAlign: 'center'}} >At least 80% of the students in 2 batches should have passed among previous 2 batches and current batch </Typography>
              </Grid>

              <Grid container spacing={2} sx={{mb:2,mt:1,textAlign: 'center'}}>
                <Grid item xs={12} sm={3}>
                Number of students who wrote final exam
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym1exam} 
                name="caym1exam" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm1 (${caym1})`} 
                InputLabelProps={{
                  shrink: data.caym1exam ? true : undefined,
                }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym2exam} 
                name="caym2exam" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm2 (${caym2})`} 
                InputLabelProps={{
                  shrink: data.caym2exam ? true : undefined,
                }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym3exam} 
                name="caym3exam" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm3 (${caym3})`}
                InputLabelProps={{
                  shrink: data.caym3exam ? true : undefined,
                }}  />
                </Grid>
              </Grid>


              <Grid container spacing={2} sx={{mb:2,mt:1,textAlign: 'center'}} >
                <Grid item xs={12} sm={3}>
                Number of graduates
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym1graduates} 
                name="caym1graduates" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm1 (${caym1})`} 
                InputLabelProps={{
                  shrink: data.caym1graduates ? true : undefined,
                }} />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym2graduates} 
              name="caym2graduates" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm2 (${caym2})`} 
                InputLabelProps={{
                  shrink: data.caym2graduates ? true : undefined,
                }}
                />
                </Grid>
                <Grid item xs={12} sm={3}>
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.caym3graduates} 
              name="caym3graduates" onInput={handleNumChange} onBlur={handleNumChange} size="small" label={`CAYm3 (${caym3})`} 
                InputLabelProps={{
                  shrink: data.caym3graduates ? true : undefined,
                }}
                />
                </Grid>
              </Grid>

              <Grid container spacing={2} sx={{mb:2,mt:1,textAlign: 'center'}} >
                <Grid item xs={12} sm={3}>
                Percentage of graduates
                </Grid>
                <Grid item xs={12} sm={3}>
                <Typography>CAYm1 : {isNaN(caym1per) ? '' : `${caym1per}%`}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                <Typography>CAYm2 : {isNaN(caym2per) ? '' : `${caym2per}%`}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                <Typography>CAYm3 : {isNaN(caym3per) ? '' : `${caym3per}%`}</Typography>
                </Grid>
              </Grid>

              


              <Grid item>
              {count < 2 ? (
                  <Typography color="error" style={{
                    textAlign: "center",paddingTop:"15px"
                  }}>
                    You cannot apply for NB Accreditaton if atleast 2 batches is not graduated with 80% {count}
                  </Typography>
            ) : null}
              </Grid>

              <Grid container spacing={2} sx={{pt:1}}>
              <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
              <Button variant="contained" 
                   onClick={()=>navigate("/condition7")}>
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
