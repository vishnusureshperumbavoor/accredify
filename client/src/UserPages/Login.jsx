import * as React from 'react';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Select,MenuItem,Card,InputAdornment,IconButton } from '@mui/material';
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

function Signup2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      const lastVisitedPage = localStorage.getItem("lastVisitedPage");
      navigate(lastVisitedPage);
    }
  }, []);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    setIsLoading(true);
    if (!formData.username_or_email) {
      alert("username or email should not be empty")
      setIsLoading(false);
      return;
    }
    if (!formData.password) {
      alert("Password should not be empty")
      setIsLoading(false);
      return;
    }
    event.preventDefault();
    axios
    .post(`${SERVER_URL}/login`, formData)
    .then((response) => {
      setIsLoading(false);
      localStorage.setItem("userToken",response.data.token)
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('userId', response.data.user._id);
      navigate(`/condition1`)
    })
    .catch((error) => {
        setIsLoading(false);
        alert("login error")
        // console.log(error.response.data);
        // setErrors(error.response.data.errors);
      });
  }
  return (
    <div>
        <Navbar/>
        <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{marginBottom:2}}>
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
              Department Login
            </Button>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={4} sm={4}>
                <Typography sx={{textAlign: 'right'}} >Username or email</Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <TextField
                  required
                  fullWidth
                  label="Username or password"
        name="username_or_email"
        value={formData.username_or_password}
        onChange={handleChange} size="small"
                />
              </Grid>


              <Grid item xs={4} sm={4}>
                <Typography sx={{textAlign: 'right'}} >Enter password</Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password ? true : false}
                  helperText={errors.password ? errors.password : ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }} size="small"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={()=>navigate("/signup")} >
                  Doesn't have an account? Sign up
                </Link>
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

export default Signup2