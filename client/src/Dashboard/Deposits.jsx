import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const SERVER_URL = process.env.REACT_APP_SERVER_URL;


const today = new Date();
const options = { day: 'numeric', month: 'long', year: 'numeric' };

export default function Deposits() {
  const navigate = useNavigate()
  function preventDefault(event) {
    event.preventDefault();
    navigate('/payments')
  }
  
  const [totalAmount,setTotalAmount] = useState("0")
  const [Date,setDate] = useState("22 April, 2023")
  useEffect(()=>{
    axios.post(`${SERVER_URL}/getAmount`)
    .then((res)=>{
      setTotalAmount(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
    
    setDate(today.toLocaleDateString('en-US', options))
  },[])
    
  return (
    <React.Fragment>
      <Title>Recent Payments</Title>
      <Typography component="p" variant="h4">
      ₹{totalAmount.toLocaleString('en-IN')}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {Date}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View table
        </Link>
      </div>
    </React.Fragment>
  );
}