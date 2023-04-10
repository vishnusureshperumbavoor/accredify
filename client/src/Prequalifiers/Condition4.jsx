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
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Condition4() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  {/*useEffect(()=>{
    if(localStorage.getItem("token")) navigate('/')
  },[])*/}

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  useEffect(() => {
      axios.post('https://cdn-api.co-vin.in/api/v2/admin/location/states')
        .then((response) => {
          setStates(response.data.states);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  const handleStateChange= ((e)=>{
    setSelectedStateId(e.target.value);
    setSelectedStateName(e.target.getAttribute("name"))
    setSelectedDistrict('')
  })

  useEffect(() => {
    const getDistrict=(async()=>{
      const getDis = await fetch(
      `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${selectedStateId}`
    );
    const res = await getDis.json();
    setDistricts(await res.districts);
    })
    if(selectedStateId){
      getDistrict()
    }
  }, [selectedStateId]);


  // const handleDistrict = (e) => {
  //   const getStateId = e.target.value;
  //   setStateId(getStateId);
  //   getDistrict();
  // };

  const [formData, setFormData] = useState({
    c1: "",
    c2: "",
    c3: "",
    c4: "",
    c5: "",
    c6: "",
    c7: "",
    c8: "",
  });

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [num4, setNum4] = useState(0);
  const [num5, setNum5] = useState(0);
  const [num6, setNum6] = useState(0);
  const sum1 = (num1 + num2 + num3).toFixed(2);
  const sum2 = (num4 + num5 + num6).toFixed(2);
  const total = ((sum2*100) / sum1).toFixed(2);

  const handleNum1Change = (event) => {
    setNum1(parseInt(event.target.value));
  };

  const handleNum2Change = (event) => {
    setNum2(parseInt(event.target.value));
  };

  const handleNum3Change = (event) => {
    setNum3(parseInt(event.target.value));
  };
  const handleNum4Change = (event) => {
    setNum4(parseInt(event.target.value));
  };

  const handleNum5Change = (event) => {
    setNum5(parseInt(event.target.value));
  };

  const handleNum6Change = (event) => {
    setNum6(parseInt(event.target.value));
  };

  const handleChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Sanctioned Intake', 159, 6.0, 24, 4.0),
    createData('Number of Student admitted', 237, 9.0, 37, 4.3),
  ];
  

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios.post(`${SERVER_URL}/prequalifier`, formData).then((res)=>{
      console.log(res.data)
      if(res.status===200){
        localStorage.setItem("userToken",res.data.token)
        localStorage.setItem("userId",res.data.user.insertedId)
        setIsLoading(false);
        // alert("Registration Successful")
        navigate('/waitforapproval')
      }
    }).catch((err)=>{
      alert("error")
      setIsLoading(false);
    })
  };

  return (
    <div style={{ backgroundColor: "#E7EBF0", height: "100vh",width:"100vw",margin:0,padding:0 }}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              ACCREDITATION WORKFLOW MANAGEMENT SYSTEM
            </Typography> 
          </Toolbar>
        </Container>
      </AppBar>
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
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  PREQUALIFIERS (CONDITION 4)
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
                    textAlign: "center",
                  }}
                >
                  Student Admissions (Program level)
                </TableCell>
                </TableRow>
                <TableRow >
                <TableCell align="center">
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bolder"}}>Description</TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>2020-23</TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>2019-22</TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>2018-21</TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Sanctioned Intake
              </TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={num1} onChange={handleNum1Change} /></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={num2} onChange={handleNum2Change} /></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={num3} onChange={handleNum3Change} /></TableCell>
              <TableCell align="right">{sum1}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                Number of Student admitted
              </TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={num4} onChange={handleNum4Change} /></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={num5} onChange={handleNum5Change} /></TableCell>
              <TableCell align="right"><TextField id="outlined-basic" variant="outlined" type="number" value={num6} onChange={handleNum6Change} /></TableCell>
              <TableCell align="right">{sum2}</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </TableCell>
                </TableRow>
                <TableRow style={{textAlign:"center",fontWeight:"bold",fontSize:"40px"}}> 
                  % of students admitted over last 3 assessment years : {total}
                </TableRow>
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition3")}>
                    Go Back
                  </Button>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition5")}>
                    Continue
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
export default Condition4;
