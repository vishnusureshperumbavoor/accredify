import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import AdminNavbar from "./AdminNavbar";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Registration() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${SERVER_URL}/pending`)
      .then(response => {
        console.log(response);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  
  // useEffect(()=>{
  //   if(localStorage.getItem("token")) navigate('/')
  // },[])

  const handleApprove=((id)=>{
    axios.post(`${SERVER_URL}/approve/${id}`).then(res=>{
      setUsers(res.data)
    }).catch(err=>{
      console.log(err);
    })
  })

  const handleReject=((id)=>{
    axios.post(`${SERVER_URL}/reject/${id}`).then(res=>{
      setUsers(res.data)
    }).catch(err=>{
      console.log(err);
    })
  })

  return (
    <div style={{ backgroundColor: "#E7EBF0", height: "600px" }}>
      <AdminNavbar/>
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
                  colSpan={17}
                  style={{
                    fontWeight: "bold",
                    fontSize: "20px",
                    textAlign: "center",
                  }}
                >
                  NBA PENDING REQUESTS
                </TableCell>
              </TableRow>
              <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Affiliation</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>AISHE</TableCell>
            <TableCell>Approval</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>State</TableCell>
            <TableCell>District</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Website</TableCell>
            <TableCell>TAN/PAN No</TableCell>
            <TableCell>Fax</TableCell>
            <TableCell>Mobile No</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Pin Code</TableCell>
            <TableCell>Approve/Reject</TableCell>
          </TableRow>
            </TableHead>
            <TableBody>
            {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.institute_name}</TableCell>
              <TableCell>{user.institute_type}</TableCell>
              <TableCell>{user.affiliated_by}</TableCell>
              <TableCell>{user.year_of_establishment}</TableCell>
              <TableCell>{user.aishe_code}</TableCell>
              <TableCell>{user.first_approval}</TableCell>
              <TableCell>{user.postal_address}</TableCell>
              <TableCell>{user.state}</TableCell>
              <TableCell>{user.district}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.website}</TableCell>
              <TableCell>{user.tan_pan_no}</TableCell>
              <TableCell>{user.fax}</TableCell>
              <TableCell>{user.mobile_no}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.pin_code}</TableCell>
              <TableCell>
                <Button variant="contained" style={{ backgroundColor: green[500], color: '#fff' }} onClick={handleApprove(user._id)}>
                  Approve
                </Button>
                <Button variant="contained" style={{ backgroundColor: red[500], color: '#fff' }} onClick={handleReject(user._id)}>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
export default Registration;
