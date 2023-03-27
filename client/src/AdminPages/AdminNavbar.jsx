import React from 'react'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
    const navigate = useNavigate();
  return (
    <div>
        <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 900,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none"
              }}
            >
              ACCREDITATION WORKFLOW MANAGEMENT SYSTEM
            </Typography> 
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 8,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 50,
                color: "inherit",
                textDecoration: "none"
              }}
              onClick={()=>navigate('/approved')}
              style={{ fontFamily: 'Open Sans, sans-serif',fontWeight:800 }}
            >
              Approved Requests
            </Typography> 
            <Typography
              noWrap
              component="a"
              href="/"
              sx={{
                ml: 8,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 50,
                color: "inherit",
                textDecoration: "none"
              }}
              onClick={()=>navigate('/rejected')}
              style={{ fontFamily: 'Open Sans, sans-serif',fontWeight:800 }}
            >
              Rejected Requests
            </Typography> 
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default AdminNavbar