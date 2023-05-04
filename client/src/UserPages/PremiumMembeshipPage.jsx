import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;




const tiers = [
  {
    title: 'Basic',
    price: '6950',
    description: [
      'Check online',
      'Online consulting',
      'No help center access',
      'Email support',
    ],
    buttonText: 'Buy basic',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    subheader: 'Most popular',
    price: '98950',
    description: [
      'Expert analysis',
      'Advanced data analytics',
      'Help center access',
      'Priority email support',
    ],
    buttonText: 'Buy premium',
    buttonVariant: 'contained',
  },
  {
    title: 'Enterprise',
    price: '79950',
    description: [
      'Expert analysis',
      'Basic data analytics',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Buy enterprise level',
    buttonVariant: 'outlined',
  },
];



function PremiumMembershipPage() {
  const navigate = useNavigate();
  const handlePayment=((price)=>{
    const userId = localStorage.getItem('userId');
    axios.post(`${SERVER_URL}/handlePayment`, { price: price, userId: userId })
    .then((response) => {
      console.log(response);
      const orderId = response.data.id;
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: price,
        currency: 'INR',
        name: 'Accredify',
        description: 'Premium Membership',
        order_id: orderId,
        handler: function(response2) {
          // handle success response
          alert(response.data);
          response = response.data;
          response = {
            ...response,
            userId: userId,
            date: Date.now()
          }
          axios.post(`${SERVER_URL}/handlePaymentSuccess`, response )
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '+919999999999',
        },
        notes: {
          membership_type: 'Premium',
        },
        theme: {
          color: '#F37254',
        },
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();
    })
    .catch((error) => {
      console.log(error);
      // handle error response
    });
  })
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <Navbar/>
      {/* Hero unit */}
      <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 10, pb: 6 }}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
          fontWeight="bold"
        >
          PRICING
        </Typography>
        <Typography variant="h5" align="center" color="text.secondary" component="p">
        We provide expert consultations and group webinars to make your college prepare for accreditation.
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main" sx={{ pb: 6 }}>
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                    ₹{tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant} onClick={()=>handlePayment(tier.price)}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, marginTop: 5,marginRight:3 }} onClick={()=>navigate("/condition1")}>
                    Go to conditions page
                  </Button>
        <Button variant="contained" style={{fontWeight:"bold",fontSize:"26px"}} 
                  sx={{ width: 400,height:50, padding: 1, marginTop: 5 }} onClick={()=>navigate("/paymentsTable")}>
                    Go to payments page
                  </Button>
      </Container>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PremiumMembershipPage />;
}