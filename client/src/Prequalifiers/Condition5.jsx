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
import Navbar from "../Components/Navbar/Navbar";

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
  const [data, setData] = useState({
    num1:0,
    num2:0,
    num3:0,
    num4:0,
    num5:0,
    num6:0,
    num7:0,
    num8:0,
    num9:0,
    num10:0,
    num11:0,
    num12:0,
    num13:0,
    num14:0,
    num15:0,
    num16:0,
    num17:0,
    num18:0,
    num19:0,
    num20:0,
    num21:0,
  });

  useEffect(() => {
    const storedData = localStorage.getItem('condition5');
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const subTotal1 = Number(data.num1) + Number(data.num7) + Number(data.num13);
  const subTotal2 = Number(data.num2) + Number(data.num8) + Number(data.num14);
  const subTotal3 = Number(data.num3) + Number(data.num9) + Number(data.num15);
  const subTotal4 = Number(data.num4) + Number(data.num10) + Number(data.num16);
  const subTotal5 = Number(data.num5) + Number(data.num11) + Number(data.num17);
  const subTotal6 = Number(data.num6) + Number(data.num12) + Number(data.num18);
  const total1 = Number(subTotal1) + Number(subTotal2);
  const total2 = Number(subTotal3) + Number(subTotal4);
  const total3 = Number(subTotal5) + Number(subTotal6);

  const sfr1 = (Number(total1)/Number(data.num19)).toFixed(2);
  const sfr2 = (Number(total2)/Number(data.num20)).toFixed(2);
  const sfr3 = (Number(total3)/Number(data.num21)).toFixed(2);
  const sfr = ((Number(sfr1)+Number(sfr2)+Number(sfr3))/3).toFixed(2)

  const handleNumChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    localStorage.setItem('condition5', JSON.stringify(data));
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
                  Student Faculty Ratio (SFR) <br/>
                  Average SFR in the current academic year and previous 2 academic years should be 1:25
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
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num1} name="num1" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num2} name="num2" onChange={handleNumChange} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num3} name="num3" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num4} name="num4" onChange={handleNumChange} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num5} name="num5" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num6} name="num6" onChange={handleNumChange} style={{marginLeft:"3px"}} />
                </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                2nd year
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num7} name="num7" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num8} name="num8" onChange={handleNumChange} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num9} name="num9" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num10} name="num10" onChange={handleNumChange} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num11} name="num11" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num12} name="num12" onChange={handleNumChange} style={{marginLeft:"3px"}} />
                </TableCell>
            </TableRow>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" >
                3rd year
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num13} name="num13" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num14} name="num14" onChange={handleNumChange} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num15} name="num15" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num16} name="num16" onChange={handleNumChange} style={{marginLeft:"3px"}} />
              </TableCell>
              <TableCell align="right">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num17} name="num17" onChange={handleNumChange} />
              </TableCell>
              <TableCell align="left">
                <TextField className={classes.root} id="outlined-basic" variant="outlined" type="number" value={data.num18} name="num18" onChange={handleNumChange} style={{marginLeft:"3px"}} />
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
              <TableCell align="center" colSpan={2}><TextField id="outlined-basic" variant="outlined" type="number" value={data.num19} name="num19" onChange={handleNumChange} /></TableCell>
              <TableCell align="center" colSpan={2}><TextField id="outlined-basic" variant="outlined" type="number" value={data.num20} name="num20" onChange={handleNumChange} /></TableCell>
              <TableCell align="center" colSpan={2}><TextField id="outlined-basic" variant="outlined" type="number" value={data.num21} name="num21" onChange={handleNumChange} /></TableCell>
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
export default Condition5;
