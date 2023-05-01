import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Chart from './CompanyRevenue';
import Deposits from './Deposits';
import Orders from './UserTable';
import InstitutionTypes from './InstitutionTypes';
import PieChartComponent from './AffiliatedBy';
import FinanceBarchart from './FinanceBarChart';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';
import GenderPieChart from './GenderPieChart';
import CollegeFinance from './CollegeFinance';
import CollegeLabs from './CollegeLabs';
import InstitueLineGraph from './InstitueLineGraph';
import ProgramLineGraph from './ProgramLineGraph';


const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function CollegeContent() {
  const [isLoading,setIsLoading] = useState(true);
  const userId  = useParams();
  const [open, setOpen] = React.useState(true);
  const [collegeData, setCollegeData] = useState({});
  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(()=>{
    axios.post(`${SERVER_URL}/getCollegeData`,{userId:userId}).then((res)=>{
      console.log(res.data.user);
      setCollegeData(res.data.user)
      setIsLoading(false);
    }).catch((err)=>{
      console.log(err);
      setIsLoading(true)
    })
  },[])

  return (
    
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ display: { xs: 'none', sm: 'block' },fontFamily: "monospace", letterSpacing:".3rem",
              fontWeight: 700,flexGrow: 1 }}
            >
              ACCREDIFY ADMIN DASHBOARD
            </Typography>
            {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{flexDirection: 'column'}}>
            {mainListItems}
          <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Recent Orders */}
              {isLoading && <LinearProgress />}
              <Grid item xs={12}>
              <Paper
                  sx={{
                    p: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 50,
                  }}
                >
                  <Typography variant="h4"
      sx={{
        fontWeight: 'bold',
        color: 'black',
        justifyContent: 'center',
        textAlign:"center"
      }}>{collegeData.institute_name}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                {/* Gender Pie Charts */}
                {isLoading && <LinearProgress />}
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                 <GenderPieChart collegeData={collegeData}/>
                </Paper>
              </Grid>
              {/* Colllege Finance */}
              {isLoading && <LinearProgress />}
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 300,
                  }}
                >
                  <CollegeFinance collegeData={collegeData} />
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* College Labs */}
              {isLoading && <LinearProgress />}
              <Grid item xs={12} md={8} lg={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                  }}
                >
                  <CollegeLabs collegeData={collegeData} />
                </Paper>
              </Grid>

              {/* Chart */}
              {isLoading && <LinearProgress />}
              <Grid item xs={12} md={4} lg={4}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 260,
                  }}
                >
                  <PieChartComponent />
                </Paper>
              </Grid>
            </Grid>
          </Container>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* College Labs */}
              {isLoading && <LinearProgress />}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 280,
                  }}
                >
                  <InstitueLineGraph collegeData={collegeData}/>
                </Paper>
              </Grid>

              {/* Chart */}
              {isLoading && <LinearProgress />}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 280,
                  }}
                >
                  <ProgramLineGraph collegeData={collegeData}/>
                </Paper>
              </Grid>
            </Grid>
          </Container>
         
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Colleges2() {
  return <CollegeContent />;
}