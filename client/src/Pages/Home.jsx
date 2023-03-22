import React, { useContext, useEffect } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/home2");
    else navigate("/");
  }, []);
  const logout = () => {
    localStorage.clear();
  };
  return (
    <div>
      <Navbar />
      <h1>HOME PAGE</h1>
      <Button variant="contained" onClick={logout}>
        LOGOUT BUTTON
      </Button>
    </div>
  );
}

export default Home;
