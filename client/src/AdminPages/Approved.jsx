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
import AdminNavbar from "./AdminNavbar";
import { LinearProgress } from '@material-ui/core';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Approved() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) navigate("/adminlogin");
    setIsLoading(true);
    axios.post(`${SERVER_URL}/approvedpage`)
      .then(res => {
        console.log(res);
        setUsers(res.data.users);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(true);
      });
  }, []);
  return (
    <div style={{ backgroundColor: "#E7EBF0", height: "100vh",width:"100vw",margin:0,padding:0 }}>
      <AdminNavbar/>
      <Card sx={{ minWidth: 275 }} style={{ margin: "50px" }}>
      {isLoading && <LinearProgress />}
        <TableContainer component={Paper}>
          <Table
            sx={{ "& td": { border: 0 }, minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
            <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Type</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Affiliation</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Year</TableCell>
            <TableCell style={{fontWeight:"bold"}}>AISHE</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Approval</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Address</TableCell>
            <TableCell style={{fontWeight:"bold"}}>State</TableCell>
            <TableCell style={{fontWeight:"bold"}}>District</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Email</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Website</TableCell>
            <TableCell style={{fontWeight:"bold"}}>TAN/PAN No</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Fax</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Mobile No</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Phone</TableCell>
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
            </TableRow>
          ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
export default Approved;
