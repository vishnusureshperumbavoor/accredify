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

function Login() {
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
    console.log(formData)
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
      navigate(`/collegedetails`)
    })
    .catch((error) => {
        setIsLoading(false);
        alert("login error")
        // console.log(error.response.data);
        // setErrors(error.response.data.errors);
      });
  }
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
                  LOGIN
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
                  Username or email
                </TableCell>
                <TableCell>
                  <TextField label="Username or password"
        name="username_or_email" sx={{ width: "37%" }}
        value={formData.username_or_password}
        onChange={handleChange}  />
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
                  Enter password
                </TableCell>
                <TableCell>
                <TextField
        label="Password"
        name="password" sx={{ width: "37%" }}
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
                    {isLoading ? <CircularProgress size={24} /> : 'LOGIN'}
                  </Button>
                  <Typography onClick={()=>navigate("/signup")}>
                    Doesn't have an account? Signup
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
export default Login;