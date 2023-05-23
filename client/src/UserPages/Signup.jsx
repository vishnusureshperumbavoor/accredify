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
    const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [instituteNameError, setInstituteNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      const lastVisitedPage = localStorage.getItem("lastVisitedPage");
      navigate(lastVisitedPage);
    }
  }, []);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    handleChange(event)
    if (password !== "") {
      if (event.target.value !== password) {
        setPasswordError(true);
      } else {
        setPasswordError(false);
      }
    }
  };

  const validatePassword = (value) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@]{8,}$/;
    if (regex.test(value)) {
      setError(false);
    } else {
      setError(true);
    }
  };

  const [formData, setFormData] = useState({
    department:"-- Please Select --"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.institute_name) {
      setInstituteNameError(true)
      setIsLoading(false);
      return;
    }
    if (formData.department=="-- Please Select --") {
        alert("Select a department")
        setIsLoading(false);
        return;
      }
    if (!formData.username) {
      alert("username should not be empty")
      setIsLoading(false);
      return;
    }
    if (!formData.email) {
      alert("Email should not be empty")
      setIsLoading(false);
      return;
    }
    if (!formData.password) {
      alert("Password should not be empty")
      setIsLoading(false);
      return;
    }

    const updatedFormData = {
      ...formData,
      timeStamp: Date.now()
    };

    axios.post(`${SERVER_URL}/signup`, updatedFormData).then((res)=>{
        console.log(res.data)
        console.log(res.data.user.username)
        localStorage.setItem("userToken",res.data.token)
        localStorage.setItem("username",res.data.user.username)
        localStorage.setItem('userId', res.data.user._id);
        setIsLoading(false);
        navigate(`/condition1`)
    }).catch((err)=>{
      alert("error")
      setIsLoading(false);
    })
  };

  const handleInstituteNameChange=(event)=>{
    setInstituteNameError(false)
    handleChange(event)
  }

  const handleEmailChange = (event) => {
    setEmailExists(false);
    const input = event.target.value;
    setEmail(input);
    setEmailError(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(input));
    handleChange(event);
    axios.get(`${SERVER_URL}/api/checkEmail/${event.target.value}`)
    .then(response => {
      if (response.data.exists) {
        setEmailExists(true);
      }
    })
    .catch(error => {
      setEmailExists(false);
      console.log(error);
    });
  };

  const handleUsernameChange = (event) => {
    handleChange(event);
    setUsernameExists(false);
    axios.get(`${SERVER_URL}/api/checkUsername/${event.target.value}`)
    .then(response => {
      if (response.data.exists) {
        setUsernameExists(true);
      }
    })
    .catch(error => {
      setUsernameExists(false);
      console.log(error);
    });
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
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
              Department Signup Details
            </Button>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={4} sm={4}>
                <Typography sx={{textAlign: 'right'}} >Institute Name</Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <TextField
                  required
                  fullWidth
                  name="institute_name" 
                  onChange={handleInstituteNameChange}  id="outlined-basic" variant="outlined" error={instituteNameError} 
                  helperText={ instituteNameError ? 'Institute name should not be null' : ''} size="small"
                />
              </Grid>

              <Grid item xs={4} sm={4}>
                <Typography sx={{textAlign: 'right'}} >Department</Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
              <Select
        labelId="organization-select-label"
        id="organization-select"
        name="department"
        onChange={handleChange}
        value={formData.department}
        size="small"
      >
        <MenuItem value="-- Please Select --">-- Please Select --</MenuItem>
        <MenuItem value="Computer Engineering">Computer Engineering</MenuItem>
        <MenuItem value="Electronics Engineering">Electronics Engineering</MenuItem>
        <MenuItem value="Mechanical Engineering">Mechanical Engineering</MenuItem>
        <MenuItem value="Civil Engineering">Civil Engineering</MenuItem>
        <MenuItem value="Chemical Engineering">Chemical Engineering</MenuItem>
        <MenuItem value="Electrical Engineering">Electrical Engineering</MenuItem>
      </Select>
              </Grid>


              <Grid item xs={4} sm={4}>
                <Typography sx={{textAlign: 'right'}} >Username</Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <TextField
                  required
                  fullWidth
                  label="Username"  name="username" error={usernameExists}
                  onChange={handleUsernameChange}  id="outlined-basic" variant="outlined"
                  helperText={ usernameExists ? 'Username already exists' : ''} size="small"
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography sx={{textAlign: 'right'}} >Email</Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <TextField
                  required
                  fullWidth
                  label="Email" id="outlined-basic" variant="outlined" value={email} 
                onChange={handleEmailChange}
      error={emailError || emailExists} name="email"
      helperText={emailError ? 'Enter a valid email address' : emailExists ? 'Email already exists' : ''} size="small"
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography sx={{textAlign: 'right'}} >Enter Password</Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <TextField
                  required
                  fullWidth
                  size="small"
      label="Password"
      type={showPassword ? 'text' : 'password'}
      value={password}
      onChange={handlePasswordChange}
      error={error}
      helperText={
        error &&
        'Enter strong password'
      }
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
      }}
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography sx={{textAlign: 'right'}} >Re enter password</Typography>
              </Grid>
              <Grid item xs={8} sm={8}>
                <TextField
                  required
                  fullWidth
                  size="small"
                name="password"
        label="Re-enter Password"
        type={showConfirmPassword ? "text" : "password"}
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={passwordError}
        helperText={
          passwordError ? "Passwords do not match" : null
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowConfirmPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2" onClick={()=>navigate("/login")} >
                  Already have an account? Sign in
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