import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from '@material-ui/core';
import { green} from '@material-ui/core/colors';
import { LinearProgress } from '@material-ui/core';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Pending() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // if (!localStorage.getItem("adminToken")) navigate("/adminlogin");
    setIsLoading(true);
    loadTable()
  }, []);
  
const loadTable=(()=>{
    axios.post(`${SERVER_URL}/pendingpage`).then((res)=>{
      console.log(res.data.users);
      setUsers(res.data.users)
      setIsLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setIsLoading(true);
    })
})

  const handleApprove=((row)=>{
    const data = {
      id: row._id,
      email: row.email,
      mobile: row.mobile_no
    };
    axios.post(`${SERVER_URL}/approve`,data).then(res=>{
      setUsers(res.data.users)
      loadTable()
    }).catch(err=>{
      console.log(err);
    })
  })
  
  const handleReject=((row)=>{
    const data = {
      id: row._id,
      email: row.email,
      mobile: row.mobile_no
    };
    axios.post(`${SERVER_URL}/reject`,data).then(res=>{
      setUsers(res.data.users)
      loadTable()
    }).catch(err=>{
      console.log(err);
    })
  })

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const count = users.length;

  return (
    <div style={{ height: "80vh",width:"90vw",margin:0,padding:0 }}>
      <Typography style={{textAlign:"center",fontWeight:"bold",fontSize:"20px"}}>PENDING REQUESTS</Typography>
      <Card sx={{ minWidth: 275 }} style={{ margin: "20px" }}>
      {isLoading && <LinearProgress />}
        <TableContainer component={Paper}>
          <Table
            sx={{ "& td": { border: 0 }, minWidth: 650 }}
            aria-label="simple table"
          >
            <TableHead>
            <TableCell style={{fontWeight:"bold"}}>Name</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Type</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Affiliation</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Year</TableCell>
            <TableCell style={{fontWeight:"bold"}}>AISHE</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Approval</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Address</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Email</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Website</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Mobile No</TableCell>
            <TableCell style={{fontWeight:"bold"}}>Approve/Reject</TableCell>
            </TableHead>
            <TableBody>

            {(rowsPerPage > 0
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users
              ).map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.institute_name}</TableCell>
                  <TableCell>{user.institute_type}</TableCell>
                  <TableCell>{user.affiliated_by}</TableCell>
              <TableCell>{user.year_of_establishment}</TableCell>
              <TableCell>{user.aishe_code}</TableCell>
              <TableCell>{user.first_approval}</TableCell>
              <TableCell>{user.postal_address}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.website}</TableCell>
              <TableCell>{user.mobile_no}</TableCell>
              <TableCell>
                {[
                <Button key="approve" variant="contained" color="green" style={{ fontWeight:600, backgroundColor: green[500],padding:"2px",height: '30px', width: '100px' }} 
                onClick={()=>handleApprove(user)}>
                  Approve
                </Button>,
                <Button key="reject" variant="contained" color="secondary" style={{ fontWeight:600, height: '30px', width: '100px',padding:"2px"}} 
                onClick={()=>handleReject(user)}>
                  Reject
                </Button>
                ]}
            </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </div>
  );
}
export default Pending;
