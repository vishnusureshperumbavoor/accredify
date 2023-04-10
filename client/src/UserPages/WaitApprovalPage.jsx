import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}));

function WaitApprovalPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        Wait for Admin Approval
      </Typography>
      <Typography variant="body1">
        Your registration has been submitted successfully. Please wait for admin approval before you can apply for pre-qualifiers.
      </Typography>
    </div>
  );
}

export default WaitApprovalPage;
