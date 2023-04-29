import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { XAxis, YAxis,ResponsiveContainer } from 'recharts';
import { BarChart, Bar,CartesianGrid, Tooltip, Legend,Label} from 'recharts';
import Title from './Title';
import { Cell } from 'recharts';
import axios from 'axios';
import { useEffect } from 'react';
// import legendItem
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const data = [
    {
      name: 'GPTC PBVR',
      revenue: 30,
      expenditure: 20,
      grants: 10,
      loans: 5,
    },
    {
      name: 'CET',
      revenue: 20,
      expenditure: 15,
    grants: 5,
    loans: 10,
  },
  {
    name: 'IIT Kharagpur',
    revenue: 40,
    expenditure: 30,
    grants: 5,
    loans: 5,
  },
  {
    name: 'CUSAT',
    revenue: 25,
    expenditure: 10,
    grants: 7,
    loans: 2,
},
  {
    name: 'IIT Bombay',
    revenue: 30,
    expenditure: 15,
    grants: 10,
    loans: 2,
},
];


export default function FinanceBarchart() {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    loadTable()
  },[])

  const loadTable=(()=>{
    axios.post(`${SERVER_URL}/getCollegeFinance`)
    // .then((res)=>{
    //   console.log(res.data.users);
    //   setUsers(res.data.users)
    //   setIsLoading(false);
    // })
    // .catch((err)=>{
    //   console.log(err);
    //   setIsLoading(true);
    // })
  })

  return (
    <React.Fragment>
      <Title>Finance of Colleges</Title>
      <ResponsiveContainer>
      <BarChart width={600} height={300} data={data} barSize={25} margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 28,
          }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis >
    <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              ₹ in Lakhs
            </Label>
  </YAxis>
  <Tooltip />
  <Legend />
  <Bar dataKey="revenue" fill="#8884d8" />
  <Bar dataKey="expenditure" fill="#82ca9d" />
  <Bar dataKey="grants" fill="#ffc658" />
  <Bar dataKey="loans" fill="#ca82c8" />
</BarChart>

      </ResponsiveContainer>
    </React.Fragment>
  );
}