import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { XAxis, YAxis,ResponsiveContainer } from 'recharts';
import { BarChart, Bar,CartesianGrid, Tooltip, Legend} from 'recharts';
import Title from './Title';
import { Cell } from 'recharts';
import axios from 'axios';
import { useEffect } from 'react';
const SERVER_URL = process.env.REACT_APP_SERVER_URL



const legendItems = [
  { value: "Revenue", color: "#0088FE" },
  { value: "Expenditure", color: "#00C49F" },
  { value: "Grants", color: "#FFBB28" },
  { value: "Loans", color: "#FF8042" },
];

export default function CollegeFinance({collegeData}) {
  const theme = useTheme();
  const revenueCount = collegeData.details ? Number(collegeData.details.revenue) : 0;
  const expenditureCount = collegeData.details ? Number(collegeData.details.expenditure) : 0;
  const grantsCount = collegeData.details ? Number(collegeData.details.grants) : 0;
  const loansCount = collegeData.details ? Number(collegeData.details.loans) : 0;
  const data = [
    { name: "Revenue", value: revenueCount, color: "#0088FE" },
    { name: "Expenditure", value: expenditureCount, color: "#00C49F" },
    { name: "Grants", value: grantsCount, color: "#FFBB28" },
    { name: "Loans", value: loansCount, color: "#FF8042" },
  ];

  return (
    <React.Fragment>
      <Title>College Finance</Title>
      <ResponsiveContainer>
      <BarChart width={600} height={280} data={data} barSize={85}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
          <>
      <Legend payload={legendItems} />  
      <Bar dataKey="value">
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
          ))}
      </Bar>
      </>
    </BarChart>
    

      </ResponsiveContainer>
    </React.Fragment>
  );
}