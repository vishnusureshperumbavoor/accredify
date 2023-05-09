import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Navbar from "../Components/Navbar";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100px', 
  },
  textFontWeight:{
    fontWeight: 'bold',
  }
}));

function Condition5() {
  const classes = useStyles();
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

  const total1 = Number(data.thirdYear2022) + Number(data.secondYear2022)
  const total2 = Number(data.thirdYear2021) + Number(data.secondYear2021)
  const total3 = Number(data.thirdYear2020) + Number(data.secondYear2020)

  const sfr1 = (Number(total1)/Number(data.faculty2022)).toFixed(2);
  const sfr2 = (Number(total2)/Number(data.faculty2021)).toFixed(2);
  const sfr3 = (Number(total3)/Number(data.faculty2020)).toFixed(2);
  const sfr = ((Number(sfr1)+Number(sfr2)+Number(sfr3))/3).toFixed(2)
  const handleNumChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    localStorage.setItem('condition5', JSON.stringify(data));
  };

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

  const headings = [
    { text: "Sanction Intake", align: "right" },
    { text: "Lateral Entry", align: "left" },
  ];

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
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  PREQUALIFIERS (CONDITION 5)
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
                  Student Faculty Ratio (SFR) in the department
                </TableCell>
                </TableRow>
                <TableRow >
                <TableCell align="center">
                <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:"bolder",fontSize:"18px"}}>Year of study</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder",fontSize:"20px"}}>2022-23</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder",fontSize:"20px"}}>2021-22</TableCell>
            <TableCell align="center" style={{fontWeight:"bolder",fontSize:"20px"}}>2020-21</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                No. of Students (3rd year)
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.thirdYear2022} name="thirdYear2022" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.thirdYear2021} name="thirdYear2021" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.thirdYear2020} name="thirdYear2020" onChange={handleNumChange} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                No. of students (2nd year)
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.secondYear2022} name="secondYear2022" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.secondYear2021} name="secondYear2021" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.secondYear2020} name="secondYear2020" onChange={handleNumChange} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{fontWeight:"bold",fontSize:"17px"}} >
                Total number of students
              </TableCell>
              <TableCell align="center" style={{fontWeight:"bold",fontSize:"20px"}}>{total1}</TableCell>
              <TableCell align="center" style={{fontWeight:"bold",fontSize:"20px"}}>{total2}</TableCell>
              <TableCell align="center" style={{fontWeight:"bold",fontSize:"20px"}}>{total3}</TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" style={{fontWeight:"bold",fontSize:"15px"}} >
                No. of Faculty in the department
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.faculty2022} name="faculty2022" 
                onChange={handleNumChange} onBlur={handleNumChange} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.faculty2021} name="faculty2021" 
                onChange={handleNumChange} onBlur={handleNumChange} />
              </TableCell>
              <TableCell align="center">
                <TextField id="outlined-basic" variant="outlined" type="number" value={data.faculty2020} name="faculty2020" 
                onChange={handleNumChange} onBlur={handleNumChange} />
              </TableCell>
            </TableRow>
            <TableRow  > 
            <TableCell colspan={7} >
            {isFinite(sfr) && <Typography style={{textAlign:"center",fontWeight:"bold",fontSize:"30px"}}>Student Faculty Ratio 1 : {sfr}</Typography>} 
            </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={7}>
                  {sfr > 25 ? (
                  <Typography color="error" style={{
                    textAlign: "center"
                  }}>
                    You cannot apply for NB Accreditation if the Student Faculty Ratio is greater than 1:25
                  </Typography>
            ) : null}
                  </TableCell>
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
                  sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={handleSubmit}>
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
export default Condition5;
