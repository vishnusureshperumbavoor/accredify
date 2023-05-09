import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography,Grid,Card,CardMedia,CardContent,Link,IconButton,Box } from '@material-ui/core';
import Navbar from '../Components/Navbar';
import { useNavigate } from "react-router-dom";
import { Twitter, LinkedIn, GitHub} from '@mui/icons-material';

const teamMembers = [
  {
    name: 'Vishnu Suresh',
    position: 'CEO & CTO',
    photoUrl: '/meetourteam/vishnu_suresh.jpeg',
    bio: 'CEO & CTO of Accredify. Co-founder & CTO of Cape (IOT data monitoring). Winner of Vaiga AgriHack 2023. ',
    socialMedia: {
      twitter: 'https://twitter.com/vspeeeeee',
      linkedin: 'https://www.linkedin.com/in/vishnu-suresh-perumbavoor-9a7a8223a/',
      github: 'https://github.com/vishnusureshperumbavoor',
    },
  },
  {
    name: 'Anandhu Dinesh',
    position: 'CFO',
    photoUrl: '/meetourteam/anandhu_dinesh.jpeg',
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
    <div
        className='p-5 text-center bg-image'
        style={{ backgroundImage: "url('')", height: 400 }}
      >
        <div className='mask' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white'>
              {/* <h1 className='mb-3'>Heading</h1>
              <h4 className='mb-3'>Subheading</h4>
              <a className='btn btn-outline-light btn-lg' href='#!' role='button'>
                Call to action
              </a> */}
            </div>
          </div>
        </div>
      </div>


      
        {/* <Button  variant="contained" style={{fontWeight:"bold",fontSize:"26px",backgroundColor: "#8B00FF",color: "white",margin:"15px"}} 
          sx={{ width: 400,height:50, padding: 1, margin: 3 }} onClick={()=>navigate("/login")} >
            Get Started
        </Button> */}

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
