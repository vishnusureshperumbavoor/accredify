import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { PieChart, Pie, Cell, ResponsiveContainer,Legend } from 'recharts';

const data = [
  { name: 'AICTE', value: 300 },
  { name: 'UGC', value: 200 },
  { name: 'MCI', value: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const legendItems = [
  { value: "AICTE", color: "#0088FE" },
  { value: "UGC", color: "#00C49F" },
  { value: "MCI", color: "#FFBB28" },
];

function preventDefault(event) {
  event.preventDefault();
}

export default function PieChartComponent() {
  return (
    <React.Fragment>
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