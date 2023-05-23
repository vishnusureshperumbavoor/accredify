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

const theme = createTheme({
    palette: {
        mode: 'dark',
      },
});

export default function Condition4() {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(localStorage.getItem('condition4') || '');
  const [result, setResult] = useState("Yes");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setResult(e.target.value === "Yes" ? "Yes" : "No");
  };

  useEffect(() => {
    localStorage.setItem('lastVisitedPage', window.location.pathname);
    localStorage.setItem('condition4', selectedOption);
  }, [selectedOption]);

  const saveResult = () => {
    const existingResults = JSON.parse(localStorage.getItem("results")) || {};
    existingResults.page4 = result;
    localStorage.setItem("results", JSON.stringify(existingResults));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    saveResult();
    navigate("/condition5")
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
            {/* <Card sx={{ backgroundColor: '#808080', padding:2,marginTop:2,marginBottom:2 }}> */}
          <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, borderRadius: 0 ,backgroundColor: "#E50914",
              "&:hover": {
                backgroundColor: "#E50914"
              }}}
            >
              PHD
            </Button>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={12}>
                <Typography sx={{textAlign: 'left'}} >Is at least one Professor or one Assistant Professor on regular basis with Ph.D degree is available in the previous and current academic year?<br/></Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="institute_type"
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                      checked={selectedOption === 'Yes'}
                      onChange={handleOptionChange}
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                      checked={selectedOption === 'No'}
                      onChange={handleOptionChange}
                    />
                    
                  </RadioGroup>
                  </div>
              </Grid>


              <Grid item xs={12} sm={12}>
              {selectedOption === 'No' && 
                  <Typography variant="body1" color="error" style={{textAlign:"center"}}>
                    You cannot apply for NB Accreditation, if there is no Professor or Assistant Professor on regular basis with Ph.D 
                    degree, available in the previous and current academic year.
                  </Typography>
                }
              </Grid>
              <Grid container spacing={2} sx={{pt:1}}>
              <Grid item xs={6} sm={6} sx={{ textAlign: 'right' }}>
              <Button variant="contained" 
                   onClick={()=>navigate("/condition3")}>
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
              
            </Grid>
            
          </Box>
      {/* </Card> */}
        </Box>
      </Container>
    </ThemeProvider>
    </div>
  )
}