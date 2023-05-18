import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { XAxis, YAxis,ResponsiveContainer } from 'recharts';
import { BarChart, Bar,CartesianGrid, Tooltip, Legend} from 'recharts';
import Title from './Title';
import { Cell } from 'recharts';
import axios from 'axios';
import { useEffect } from 'react';
const SERVER_URL = process.env.REACT_APP_SERVER_URL

const getColor = (index) => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658"];
  return colors[index % colors.length];
};


const currentYear = new Date().getFullYear();
const cay = `${currentYear}-${currentYear - 1}`;
const caym1 = `${currentYear - 1}-${currentYear - 2}`;
const caym2 = `${currentYear - 2}-${currentYear - 3}`;

const legendItems = [
  { value: "3rd years sanction intake", color: "#E50914" },
  { value: "3rd years lateral entry", color: "#1DB954" },
  { value: "2nd years sanction intake", color: "#FFFC00" },
  { value: "2nd years lateral entry", color: "#1DA1F2" },
  { value: "1st years sanction intake", color: "#FF5A5F" },
];

export default function CollegeFinance({collegeData}) {
  const theme = useTheme();
  const revenueCount = collegeData.details ? Number(collegeData.details.revenue) : 0;
  const expenditureCount = collegeData.details ? Number(collegeData.details.expenditure) : 0;
  const grantsCount = collegeData.details ? Number(collegeData.details.grants) : 0;

  const data = [
    { name: `CAY (${cay})`, value: revenueCount, color: "#0088FE" },
    { name: `CAYm1 (${caym1})`, value: expenditureCount, color: "#00C49F" },
    { name: `CAYm2 (${caym2})`, value: grantsCount, color: "#FFBB28" },
  ];

  return (
    <React.Fragment>
  <Title>Students in the department</Title>
  <ResponsiveContainer>
    <BarChart width={600} height={280} data={data} barSize={85}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend payload={legendItems} />

      <Bar dataKey="value" stackId="group">
        {data.map((entry, index) => (
          <Cell key={index} fill={getColor(index % 3)} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</React.Fragment>

  );
}