import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';
import Navbar from '../Components/Navbar/Navbar';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function HomePage(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <>
    <Navbar/>
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>Welcome to the National Board of Accreditation for Diploma Program!</Typography>
      <Typography variant="body1" gutterBottom>
      NBA is designed to promote excellence in technical education programs in India by evaluating and 
      accrediting them based on predefined criteria.
      </Typography>
      <Typography variant="body1" gutterBottom>
        To get your college accredited, first you have to check 8 conditions before creating the registration form. <br />
        You can expect visit from the authorities after getting the admin approval. 
        </Typography>
        <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px",backgroundColor: "#8B00FF"}} 
          sx={{ width: 400,height:50, padding: 1, margin: 2 }} onClick={()=>navigate("/condition1")} >
            Get Started
        </Button>
    </Container>
    </>
  );
}

export default HomePage;
