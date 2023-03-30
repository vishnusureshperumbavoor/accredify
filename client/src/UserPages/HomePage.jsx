import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';

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

  function handleLogout() {
    props.onLogout();
  }

  return (
    <Container className={classes.root}>
      <Typography variant="h4" gutterBottom>Welcome to the NBA Accreditation for Diploma Program!</Typography>
      <Typography variant="body1" gutterBottom>This program is designed to provide students with the knowledge and skills needed to succeed in the field of science and technology.</Typography>
      <Typography variant="body1" gutterBottom>Please explore the different features of the program using the navigation menu above.</Typography>
      <Button className={classes.button} variant="contained" color="primary" onClick={handleLogout}>Logout</Button>
    </Container>
  );
}

export default HomePage;
