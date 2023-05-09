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
function PaymentsTable() {
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
    axios.post(`${SERVER_URL}/getPaymentsTable`).then((res)=>{
      setUsers(res.data)
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
    <div>
        <React.Fragment>
      <Title>Recent Payments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
          <TableCell align="left" style={{ fontWeight: 'bold' }}>User Id</TableCell>
          <TableCell align="left" style={{ fontWeight: 'bold' }}>Order Id</TableCell>
<TableCell align="left" style={{ fontWeight: 'bold' }}>Amount</TableCell>
<TableCell align="left" style={{ fontWeight: 'bold' }}>Receipt Id</TableCell>
<TableCell align="left" style={{ fontWeight: 'bold' }}>Date</TableCell>
<TableCell align="left" style={{ fontWeight: 'bold' }}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : users
              ).map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="left">{user.userId}</TableCell>
                  <TableCell align="left">{user.id}</TableCell>
              <TableCell align="left">{user.amount}</TableCell>
              <TableCell align="left">{user.receipt}</TableCell>
              <TableCell align="left">{new Date(user.date).toLocaleDateString('en-GB')}</TableCell>
              <TableCell align="left">{new Date(user.date).toLocaleTimeString('en-US')}</TableCell>
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
    </div>
  )
}

export default PaymentsTable