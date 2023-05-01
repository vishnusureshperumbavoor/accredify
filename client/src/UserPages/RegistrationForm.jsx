import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
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
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function RegistrationForm() {
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

  const [formData, setFormData] = useState({});

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
  
    axios.post(`${SERVER_URL}/signup`, formData).then((res)=>{
        console.log(res.data)
        console.log(res.data.user.username)
        localStorage.setItem("userToken",res.data.token)
        localStorage.setItem("username",res.data.user.username)
        localStorage.setItem('userId', res.data.user._id);
        setIsLoading(false);
        navigate(`/collegedetails`)
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
    <div style={{ height: "100vh",width:"100vw",margin:0,padding:0, paddingTop: "30px" }}>
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
                  colSpan={2}
                  style={{
                    fontSize: "25px",
                    textAlign: "center",
                    fontWeight:"bold",
                  }}
                >
                  SIGNUP
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
                  Institute name
                </TableCell>
                <TableCell>
                  <TextField label="Insitute Name" sx={{ width: "37%" }} name="institute_name" 
                  onChange={handleInstituteNameChange}  id="outlined-basic" variant="outlined" error={instituteNameError} 
                  helperText={ instituteNameError ? 'Institute name should not be null' : ''}
                  />
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
                  Username
                </TableCell>
                <TableCell>
                  <TextField label="Username" sx={{ width: "37%" }} name="username" error={usernameExists}
                  onChange={handleUsernameChange}  id="outlined-basic" variant="outlined"
                  helperText={ usernameExists ? 'Username already exists' : ''}  />
                </TableCell>
              </TableRow>
              <TableRow>
              <TableCell style={{
                    fontWeight: "bold",
                    textAlign: "right",
                    fontSize: "15px",
                  }}>
                    Email
                </TableCell>
                <TableCell>
                <TextField label="Email" sx={{ width: "37%" }} id="outlined-basic" variant="outlined" value={email} 
                onChange={handleEmailChange}
      error={emailError || emailExists} name="email"
      helperText={emailError ? 'Enter a valid email address' : emailExists ? 'Email already exists' : ''} />
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
                  Enter Password
                </TableCell>

                <TableCell>
                  <TextField
      label="Password"
      sx={{ width: "37%" }}
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
                  Re enter password
                </TableCell>
                <TableCell>
                <TextField
                
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
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button disabled={isLoading} variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>
                    {isLoading ? <CircularProgress size={24} /> : 'SIGNUP'}
                  </Button>
                  <Typography onClick={()=>navigate("/login")}>
                    Already have Account? Login
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
export default RegistrationForm;