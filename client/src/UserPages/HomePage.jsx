import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography,Grid,Card,CardMedia,CardContent,Link,IconButton,Box } from '@material-ui/core';
import Navbar from '../Components/Navbar';
import { useNavigate } from "react-router-dom";
import { Twitter, LinkedIn, GitHub} from '@mui/icons-material';
import './HomePage.css';
import heroImage from '../Images/herobg.png';

const images = [
  {
    heroImageStyle: {
      width: '100%',
      height: 'auto',
      objectFit: 'cover',
    },
  },
];

const teamMembers = [
  {
    name: 'Vishnu Suresh',
    position: 'CEO & CTO',
    photoUrl: '/meetourteam/vishnu_suresh.jpeg',
    bio: 'CEO & CTO of Accredify. Co-founder & CTO of Cape (IOT data monitoring). Winner of Vaiga 2023. ',
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
    textAlign: 'center',
  },
}));

function HomePage() {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <div style={{ margin:0,padding:0, paddingTop: "45px" }}>
    <Navbar/>
    <Container className={classes.root}>
      <section id="hero-section">
    <div className="hero-section">
    <div
      className="hero-container"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '550px', // Adjust the height according to your needs
      }}
    >
    </div>

          <div className="hero-image-text">
    <h1>ACCREDIFY</h1>
    <h3>Accreditation made easy</h3>
    <button onClick={()=>{navigate('/login')}}>Get Started</button>
  </div>
        </div>
    </section>
    {/* <section id="about-us" >
    <Grid container spacing={3}  >
      <Grid item xs={12} md={6}>
        <Typography variant="h4" style={{fontWeight:"bold",color:"white"}}>ABOUT US</Typography>
        <Typography variant="body1" style={{color:"white"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae urna varius,
          vestibulum enim quis, dapibus odio. Proin facilisis lobortis nulla non vulputate.
          Vestibulum ullamcorper finibus dolor, ut interdum ex porta vel. Fusce nec malesuada
          mauris. Integer quis eros non metus suscipit scelerisque. Nam interdum libero ac
          ipsum tincidunt, in blandit nisl egestas. Vestibulum ante ipsum primis in faucibus
          orci luctus et ultrices posuere cubilia Curae; Duis nec pharetra elit.
        </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <img src="/images/about-us-image.jpg" alt="About Us" style={{ width: '100%', height: 'auto' }} />
      </Grid>
    </Grid>
    </section> */}
        <section style={{ padding: '100px 0' }}>
      <Typography style={{fontWeight:"bold",color:"white"}}  variant="h4" align="center" gutterBottom>
        Meet Our Team
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: "lg", margin: "auto" }}>
  {teamMembers.map((member) => (
    <Grid item key={member.name} xs={6} sm={3}>
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
