import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { PieChart, Pie, Cell, ResponsiveContainer,Legend } from 'recharts';



const COLORS = ['#FF0000', '#00C49F', '#FFBB28'];

const legendItems = [
  { value: "Male", color: "#FF0000" },
  { value: "Female", color: "#00C49F" },
  { value: "Others", color: "#FFBB28" },
];

function preventDefault(event) {
  event.preventDefault();
}

export default function GenderPieChart({ collegeData }) {
  const maleCount = collegeData.details ? Number(collegeData.details.male) : 0;
  const femaleCount = collegeData.details ? Number(collegeData.details.female) : 0;
  const othersCount = collegeData.details ? Number(collegeData.details.other) : 0;
    const data = [
        { name: 'Male', value: maleCount },
        { name: 'Female', value: femaleCount },
        { name: 'Others', value: othersCount },
      ];
  return (
    <React.Fragment>
      <Title>Gender</Title>
      <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend payload={legendItems} />  
      </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}