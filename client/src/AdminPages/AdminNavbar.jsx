import React from 'react'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
    const navigate = useNavigate();
    const adminApproved=(()=>{
        navigate('/approved')
    })
    const adminRejected=(()=>{
        navigate('/rejected')
    })
    const adminPending=(()=>{
        navigate('/pending')
    })
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
                fontWeight: 700,
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
              onClick={adminPending}
            >
              Pending
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
              onClick={adminApproved}
            >
              Approved
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
              onClick={adminRejected}
            >
              Rejected
            </Typography> 
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}

export default AdminNavbar