import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from "@mui/material/TablePagination";
import Button from '@mui/material/Button';
import Title from './Title';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value,5));
    setPage(0);
  };

  const count = users.length;

  useEffect(()=>{
    loadTable()
  },[])

  const loadTable=(()=>{
    axios.post(`${SERVER_URL}/getUserTable`).then((res)=>{
      setUsers(res.data.users)
      setIsLoading(false);
    })
    .catch((err)=>{
      console.log(err);
      setIsLoading(true);
    })
  })
  const navigate = useNavigate();
  const handleMoreDetails = (userId) => {
    navigate(`/colleges/${userId}`);
  };

  return (
    <React.Fragment>
      <Title>Recent Registrations</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>College</TableCell>
            <TableCell>Department</TableCell>
            <TableCell></TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users
              ).map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{new Date(user.timeStamp).toLocaleDateString('en-GB')}</TableCell>
                  <TableCell>{new Date(user.timeStamp).toLocaleTimeString('en-GB')}</TableCell>
                  <TableCell>{user.institute_name}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleMoreDetails(user._id)}
        >
          More Details
        </Button>
      </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}