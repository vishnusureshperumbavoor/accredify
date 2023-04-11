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
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../Components/Navbar/Navbar";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100px', // set the desired width here
  },
  textFontWeight:{
    fontWeight: 'bold',
  }
}));

function Condition9() {
  const classes = useStyles();
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
  const [num7, setNum7] = useState(0);
  const [num8, setNum8] = useState(0);
  const [num9, setNum9] = useState(0);
  const [num10, setNum10] = useState(0);
  const [num11, setNum11] = useState(0);
  const [num12, setNum12] = useState(0);
  const [num13, setNum13] = useState(0);
  const [num14, setNum14] = useState(0);
  const [num15, setNum15] = useState(0);
  const [num16, setNum16] = useState(0);
  const [num17, setNum17] = useState(0);
  const [num18, setNum18] = useState(0);
  const [num19, setNum19] = useState(0);
  const [num20, setNum20] = useState(0);
  const [num21, setNum21] = useState(0);

  const subTotal1 = num1 + num7 + num13;
  const subTotal2 = num2 + num8 + num14;
  const subTotal3 = num3 + num9 + num15;
  const subTotal4 = num4 + num10 + num16;
  const subTotal5 = num5 + num11 + num17;
  const subTotal6 = num6 + num12 + num18;
  const total1 = subTotal1 + subTotal2;
  const total2 = subTotal3 + subTotal4;
  const total3 = subTotal5 + subTotal6;

  const sfr1 = (total1/num19).toFixed(2);
  const sfr2 = (total2/num20).toFixed(2);
  const sfr3 = (total3/num21).toFixed(2);
  const sfr = sfr1+sfr2+sfr3

  const handleNumChange = (event,setState) => {
    setState(parseInt(event.target.value));
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
                  PREQUALIFIERS (CONDITION 9)
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
                  Student Admission (Institute level) <br/>
                  Students admitted over last 3 assessment years in the institution should be greater than 50%
                </TableCell>
                </TableRow>
                <TableRow >
                <TableCell align="center">
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bolder",fontSize:"18px"}} rowSpan={2}>Year of study</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder",fontSize:"20px"}} colSpan={2}>2020-23</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder",fontSize:"20px"}} colSpan={2}>2019-22</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder",fontSize:"20px"}} colSpan={2}>2018-21</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right" style={{fontWeight:"bolder"}}>
              <Typography >Sanction Intake</Typography>
            </TableCell>
            <TableCell align="left" style={{fontWeight:"bolder"}}>
              <Typography >Lateral Entry</Typography>
            </TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>
              <Typography >Sanction Intake</Typography>
            </TableCell>
            <TableCell align="left" style={{fontWeight:"bolder"}}>
              <Typography >Lateral Entry</Typography>
            </TableCell>
            <TableCell align="right" style={{fontWeight:"bolder"}}>
              <Typography >Sanction Intake</Typography>
            </TableCell>
            <TableCell align="left" style={{fontWeight:"bolder"}}>
              <Typography >Lateral Entry</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                1st year
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num1} onChange={(e)=>handleNumChange(e,setNum1)} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num2} onChange={(e)=>handleNumChange(e,setNum2)} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num3} onChange={(e)=>handleNumChange(e,setNum3)} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num4} onChange={(e)=>handleNumChange(e,setNum4)} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num5} onChange={(e)=>handleNumChange(e,setNum5)} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num6} onChange={(e)=>handleNumChange(e,setNum6)} style={{marginLeft:"3px"}} />
                </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                2nd year
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num7} onChange={(e)=>handleNumChange(e,setNum7)} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num8} onChange={(e)=>handleNumChange(e,setNum8)} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num9} onChange={(e)=>handleNumChange(e,setNum9)} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num10} onChange={(e)=>handleNumChange(e,setNum10)} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num11} onChange={(e)=>handleNumChange(e,setNum11)} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num12} onChange={(e)=>handleNumChange(e,setNum12)} style={{marginLeft:"3px"}} />
                </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                3rd year
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num13} onChange={(e)=>handleNumChange(e,setNum13)} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num14} onChange={(e)=>handleNumChange(e,setNum14)} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num15} onChange={(e)=>handleNumChange(e,setNum15)} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num16} onChange={(e)=>handleNumChange(e,setNum16)} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num17} onChange={(e)=>handleNumChange(e,setNum17)} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={num18} onChange={(e)=>handleNumChange(e,setNum18)} style={{marginLeft:"3px"}} />
                </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{fontWeight:"bold",fontSize:"20px"}}>
                Sub-total
              </TableCell>
              <TableCell align="right" style={{fontWeight:"bold",fontSize:"20px"}}>
                {subTotal1}
              </TableCell>
              <TableCell align="left" style={{fontWeight:"bold",fontSize:"20px"}}>
              {subTotal2}
              </TableCell>
              <TableCell align="right" style={{fontWeight:"bold",fontSize:"20px"}}>
              {subTotal3}
              </TableCell>
              <TableCell align="left" style={{fontWeight:"bold",fontSize:"20px"}}>
              {subTotal4}
              </TableCell>
              <TableCell align="right" style={{fontWeight:"bold",fontSize:"20px"}}>
              {subTotal5}
              </TableCell>
              <TableCell align="left" style={{fontWeight:"bold",fontSize:"20px"}}>
              {subTotal6}
                </TableCell>
            </TableRow>


            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{fontWeight:"bold",fontSize:"20px"}} >
                Total
              </TableCell>
              <TableCell align="center" colSpan={2} style={{fontWeight:"bold",fontSize:"20px"}}>{total1}</TableCell>
              <TableCell align="center" colSpan={2} style={{fontWeight:"bold",fontSize:"20px"}}>{total2}</TableCell>
              <TableCell align="center" colSpan={2} style={{fontWeight:"bold",fontSize:"20px"}}>{total3}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{fontWeight:"bold",fontSize:"15px"}} >
                No. of Faculty in the department
              </TableCell>
              <TableCell align="center" colSpan={2}><TextField id="outlined-basic" variant="outlined" type="number" value={num19} onChange={(e)=>handleNumChange(e,setNum19)} /></TableCell>
              <TableCell align="center" colSpan={2}><TextField id="outlined-basic" variant="outlined" type="number" value={num20} onChange={(e)=>handleNumChange(e,setNum20)} /></TableCell>
              <TableCell align="center" colSpan={2}><TextField id="outlined-basic" variant="outlined" type="number" value={num21} onChange={(e)=>handleNumChange(e,setNum21)} /></TableCell>
            </TableRow>

            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{fontWeight:"bold",fontSize:"15px"}} >
                Student Faculty Ratio (SFR)
              </TableCell>
              <TableCell align="center" colSpan={2} style={{fontWeight:"bold",fontSize:"20px"}}>{sfr1}</TableCell>
              <TableCell align="center" colSpan={2} style={{fontWeight:"bold",fontSize:"20px"}}>{sfr2}</TableCell>
              <TableCell align="center" colSpan={2} style={{fontWeight:"bold",fontSize:"20px"}}>{sfr3}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{fontWeight:"bold",fontSize:"20px"}} >
                Average SFR
              </TableCell>
              <TableCell align="center" colSpan={7} style={{fontWeight:"bold",fontSize:"20px"}}>{sfr}</TableCell>
            </TableRow>


            <TableRow>
                <TableCell colSpan={7} style={{
                    textAlign: "center",
                  }}>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition4")}>
                    Go Back
                  </Button>
                  <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition6")}>
                    Continue
                  </Button>
                </TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
                </TableCell>
                </TableRow>
              
            </TableBody>



          </Table>
        </TableContainer>
      </Card>


      
    </div>
  );
}
export default Condition9;
