import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography,Grid,Card,CardMedia,CardContent,Link,IconButton } from '@material-ui/core';
import Navbar from '../Components/Navbar';
import { useNavigate } from "react-router-dom";
import { Twitter, LinkedIn, GitHub} from '@mui/icons-material';

const teamMembers = [
  {
    name: 'Vishnu Suresh',
    position: 'CEO & CTO',
    photoUrl: '/meetourteam/vishnu_suresh.jpg',
    bio: 'Vishnu is the CEO & CTO of Accredify and has been in the education industry for over 10 years.',
    socialMedia: {
      twitter: 'https://twitter.com/vishnu_suresh',
      linkedin: 'https://www.linkedin.com/in/vishnu-suresh',
      github: 'https://www.linkedin.com/in/vishnu-suresh',
    },
  },
  {
    name: 'Anandhu Dinesh',
    position: 'CFO',
    photoUrl: '/meetourteam/anandhu_dinesh.jpg',
    bio: 'Anandhu is the CFO of Accredify and is responsible for overseeing the financial operations of the company.',
    socialMedia: {
      twitter: 'https://twitter.com/vishnu_suresh',
      linkedin: 'https://www.linkedin.com/in/vishnu-suresh',
    },
  },
  {
    name: 'Vishnu KB',
    position: 'CMO',
    photoUrl: '/meetourteam/vishnu_kb.jpeg',
    bio: 'Vishnu KB is responsible for overseeing the marketing and branding efforts of the company.',
    socialMedia: {
      twitter: 'https://twitter.com/vishnu_suresh',
      linkedin: 'https://www.linkedin.com/in/vishnu-suresh',
    },
  },
  {
    name: 'Nelvin Francis',
    position: 'COO',
    photoUrl: '/meetourteam/nelvin_francis.jpeg',
    bio: 'Nelvin is the COO of Accredify and is responsible for overseeing day-to-day operations.',
    socialMedia: {
      twitter: 'https://twitter.com/vishnu_suresh',
      linkedin: 'https://www.linkedin.com/in/vishnu-suresh',
    },
  },
];

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
    <div style={{ height: "100vh",width:"100vw",margin:0,padding:0, paddingTop: "45px" }}>
    <Navbar/>
    <Container className={classes.root}>
      <Typography variant="h4" style={{fontWeight:"bold"}}  gutterBottom>Welcome to Accredify <br/> </Typography>
      <Typography>
      The aim of our company is to make the accreditation process easier for educational institutions. 
      We understand that accreditation can be a complex and time-consuming process, which is why we have created 
      a system to help institutions assess their readiness for accreditation. Our system is based on the
      conditions that are needed for a college to get accredited.
<br/><br/>
Our goal is to make the accreditation process simpler, more transparent, and accessible to all. Our platform allows 
institutions to evaluate themselves against the conditions required for accreditation. By using our platform, 
institutions can identify areas where they need to improve, and take proactive steps to achieve accreditation.
<br/><br/>
We are a group of engineers who graduated from an accredited college. So we have the expertise in the accreditation process and is committed to providing quality 
training and support to institutions. We offer personalized assistance to help institutions navigate the 
accreditation process with ease.
<br/><br/>
We believe that accreditation is essential for the quality and growth of educational institutions. Therefore, we 
are committed to helping institutions achieve accreditation, and we are proud to be a part of their journey towards
 excellence.
        </Typography>
        <Button  variant="contained" style={{fontWeight:"bold",fontSize:"26px",backgroundColor: "#8B00FF",color: "white",margin:"15px"}} 
          sx={{ width: 400,height:50, padding: 1, margin: 3 }} onClick={()=>navigate("/login")} >
            Get Started
        </Button>
        <section style={{ margin: '50px 0' }}>
      <Typography style={{fontWeight:"bold"}}  variant="h4" align="center" gutterBottom>
        Meet Our Team
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: "lg", margin: "auto" }}>
  {teamMembers.map((member) => (
    <Grid item key={member.name} xs={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="280" image={member.photoUrl} alt={member.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {member.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {member.position}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {member.bio}
          </Typography>
          <div>
            {member.socialMedia.linkedin && (
              <Link href={member.socialMedia.linkedin} target="_blank" rel="noopener">
                <IconButton aria-label="LinkedIn">
                  <LinkedIn />
                </IconButton>
              </Link>
            )}
            {member.socialMedia.twitter && (
              <Link href={member.socialMedia.twitter} target="_blank" rel="noopener">
                <IconButton aria-label="Twitter">
                  <Twitter />
                </IconButton>
              </Link>
            )}
            {member.socialMedia.github && (
              <Link href={member.socialMedia.github} target="_blank" rel="noopener">
                <IconButton aria-label="GitHub">
                  <GitHub />
                </IconButton>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>


    </section>
    </Container>
    </div>
  );
}

export default HomePage;
