import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Container } from "@mui/material";
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme,darkTheme } from "../../Theme";
import { Switch } from '@material-ui/core';

export default function Navbar() {
  const [theme, setTheme] = useState(lightTheme);

  const handleThemeChange = () => {
    setTheme(theme === lightTheme ? darkTheme : lightTheme);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
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
              ACCREDITATION WORKFLOW AUTOMATION
            </Typography> 
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
