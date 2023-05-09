import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Card, TablePagination,Button,Container,Grid,Box,CssBaseline } from '@material-ui/core';
import Navbar from '../Components/Navbar';
import Invoice from './Invoice';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function PaymentsTable() {
  const navigate = useNavigate()
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value,5));
    setPage(0);
  };

  const [payments, setPayments] = useState([]);
  const count = payments.length;
  function printInvoice() {
    const printContents = document.getElementById('invoice').innerHTML;
    const originalContents = document.body.innerHTML;
  
    // create a new window with the invoice content
    const printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<html><head><title>Invoice</title>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
  
    // print the invoice window
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  
    // restore the original contents of the page
    document.body.innerHTML = originalContents;
  }
    useEffect(() => {
        // Fetch payments data from server
        const userId = localStorage.getItem('userId');
        axios.post(`${SERVER_URL}/paymentsTableData/${userId}`)
          .then(response => {
            console.log(response.data);
            setPayments(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      }, []);
      const [showInvoice, setShowInvoice] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleCreateInvoiceBill = (payment) => {
    setSelectedPayment(payment);
    setShowInvoice(true);
  }

  
  return (
    <div style={{ height: "100vh",width:"100vw",margin:0,padding:0, paddingTop: "90px" ,paddingLeft:"20px"}}>
      <Navbar/>
      <Grid container spacing={2} maxWidth="lg" sx={{ mt: 5, mb: 4,pt:5 }}>
        <Grid item xs={12} md={8} lg={8}>
        <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
<TableContainer>
      <Table aria-label="payment table">
        <TableHead>
          <TableRow>
          <TableCell align="left" style={{ fontWeight: 'bold' }}>Order Id</TableCell>
<TableCell align="left" style={{ fontWeight: 'bold' }}>Amount Paid</TableCell>
<TableCell align="left" style={{ fontWeight: 'bold' }}>Receipt</TableCell>
<TableCell align="left" style={{ fontWeight: 'bold' }}>Date</TableCell>
<TableCell align="left" style={{ fontWeight: 'bold' }}>Time</TableCell>
<TableCell align="left" style={{ fontWeight: 'bold' }}>Invoice Bill</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
                ? payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : payments

          ).map((payment) => (
            <TableRow key={payment._id}>
              <TableCell align="left">{payment.id}</TableCell>
              <TableCell align="left">{payment.amount}</TableCell>
              <TableCell align="left">{payment.receipt}</TableCell>
              <TableCell align="left">{new Date(payment.date).toLocaleDateString('en-GB')}</TableCell>
              <TableCell align="left">{new Date(payment.date).toLocaleTimeString('en-US')}</TableCell>
              <TableCell align="left">
              <Button variant="contained" color="primary" onClick={() => handleCreateInvoiceBill(payment)}>Create</Button>
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
    </TableContainer>
                  </Paper>

        </Grid>
        <Grid item xs={12} md={4} lg={3}>
        <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
{showInvoice && <div id="invoice"><Invoice data={selectedPayment} onClose={() => setShowInvoice(false)} /></div> }
                  </Paper>
{showInvoice &&  <Button style={{ marginTop:10,width:"100%"}}variant="contained" color="primary" onClick={printInvoice}>Print Invoice</Button> }
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12} md={12} lg={12}>
        <Button style={{marginTop:5,marginLeft:5}} variant="contained" color="primary" onClick={()=>navigate('/pricing')}>Go Back to Pricing</Button>
        </Grid>
      </Grid>
    
    </div>
  )
}

export default PaymentsTable