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
import Navbar from "../Components/Navbar/Navbar";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Condition6() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
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

  const fac1 = (num1/25).toFixed();
  const fac2 = (num2/25).toFixed();
  const req1 = (fac1/10).toFixed()
  const req2 = (fac2/10).toFixed()

  const handleNumChange = (event,setState) => {
    setState(parseInt(event.target.value));
  };
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  

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
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  PREQUALIFIERS (CONDITION 6)
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
                  At least one Professor or one Assistant Professor on regular basis with Ph.D degree is available in the previous and current academic year
                </TableCell>
                </TableRow>
                <TableRow >
                <TableCell style={{paddingLeft:"800px"}}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="institute_type"
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      control={<Radio />}
                      label="No"
                    />
                    
                  </RadioGroup>
                </TableCell>
                </TableRow>
                
              <TableRow>
                <TableCell colSpan={4} style={{
                    textAlign: "center",
                  }}>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition5")}>
                    Go Back
                  </Button>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition7")}>
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
export default Condition6;
