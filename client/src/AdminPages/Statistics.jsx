import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LinearProgress } from '@material-ui/core';
import AffiliatedCollegesChart from "../Data_Visualizations/AffiliatedCollegesChart";
import { styled } from '@mui/system';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function Statistics() {
  const [isPendingLoading, setIsPendingLoading] = useState(true);
  const [isApprovedLoading, setIsApprovedLoading] = useState(true);
  const [isRejectedLoading, setIsRejectedLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState(0);
  const [approvedRequests, setApprovedRequests] = useState(0);
  const [rejectedRequests, setRejectedRequests] = useState(0);

const findPendingRequests=(()=>{
  axios.post(`${SERVER_URL}/pendingpage`).then(res => {
    setIsPendingLoading(false);
    setPendingRequests(res.data.users.length);
  })
  .catch(err => {
    setIsPendingLoading(true);
    console.log(err);
});
})

const findApprovedRequests=(()=>{
  axios.post(`${SERVER_URL}/approvedpage`).then(res => {
    setIsApprovedLoading(false);
    setApprovedRequests(res.data.users.length);
  })
  .catch(err => {
    setIsApprovedLoading(true);
    console.log(err);
});
})

const findRejectedRequests=(()=>{
  axios.post(`${SERVER_URL}/rejectedpage`).then(res => {
    setIsRejectedLoading(false);
    setRejectedRequests(res.data.users.length);
  })
  .catch(err => {
    setIsRejectedLoading(true);
    console.log(err);
});
})

useEffect(() => {
    findPendingRequests();
    findApprovedRequests();
    findRejectedRequests();
})

const MainContainer = styled('div')({
  display: 'flex',
});

const LeftContainer = styled('div')({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 20,
});

const RightContainer = styled('div')({
  width: 'fit-content',
  marginLeft: 20,
  display: 'flex',
  flexDirection: 'column',
});

const AffiliatedData = [
  { organization: 'AICTE', count: 50 },
  { organization: 'NCTE', count: 30 },
  { organization: 'SBTE', count: 20 },
];


  return (
    <div>
      <MainContainer>
        <LeftContainer>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
  <Card sx={{ minWidth: 275, margin: "20px", width: "100%" }}>
      {isPendingLoading && <LinearProgress />}
    <Typography style={{ margin: "20px" }}>Pending Requests <br/> {pendingRequests}</Typography>
  </Card>


  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
  <Card sx={{ minWidth: 275, margin: "20px", flex: 0 }}>
      <Typography style={{ margin: "20px" }}>
        Approved Requests <br/> {approvedRequests}
      </Typography>
    </Card>
    <Card sx={{ minWidth: 275, margin: "20px", flex: 0 }}>
    {isRejectedLoading && <LinearProgress />}
      <Typography style={{ margin: "20px" }}>
        Rejected Requests <br/> {rejectedRequests}
      </Typography>
    </Card>
  </div>


</div>

</LeftContainer>
<RightContainer>
    <AffiliatedCollegesChart data={AffiliatedData} />
</RightContainer>


</MainContainer>
    </div>
  );
}

export default Statistics;
