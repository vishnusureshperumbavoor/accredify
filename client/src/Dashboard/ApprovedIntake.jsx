import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { XAxis, YAxis,ResponsiveContainer } from 'recharts';
import { BarChart, Bar,CartesianGrid, Tooltip, Legend} from 'recharts';
import Title from './Title';
import { Cell } from 'recharts';

const getColor = (index) => {
  const colors = ["#E50914", "#1DB954", "#FFFC00","#1DA1F2","#FF5A5F"];
  return colors[index % colors.length];
};


const currentYear = new Date().getFullYear();
const cay = `${currentYear}-${currentYear - 1}`;
const caym1 = `${currentYear - 1}-${currentYear - 2}`;
const caym2 = `${currentYear - 2}-${currentYear - 3}`;
const caym3 = `${currentYear - 3}-${currentYear - 4}`;
const caym4 = `${currentYear - 4}-${currentYear - 5}`;

const legendItems = [
  { value: `CAYm4 (${caym4})`, color: "#E50914" },
  { value: `CAYm3 (${caym3})`, color: "#1DB954" },
  { value: `CAYm2 (${caym2})`, color: "#FFFC00" },
  { value: `CAYm1 (${caym1})`, color: "#1DA1F2" },
  { value: `CAY (${cay})`, color: "#FF5A5F" },
];

export default function CollegeFinance({collegeData}) {
  const theme = useTheme();
  const bar0 = collegeData.details ? Number(collegeData.details.caym4ai) : 0;
  const bar1 = collegeData.details ? Number(collegeData.details.caym3ai) : 0;
  const bar2 = collegeData.details ? Number(collegeData.details.caym2ai) : 0;
  const bar3 = collegeData.details ? Number(collegeData.details.caym1ai) : 0;
  const bar4 = collegeData.details ? Number(collegeData.details.cayai) : 0;

  const data = [
    { name: `CAYm4 (${caym4})`, value: bar0, color: "#E50914" },
    { name: `CAYm3 (${caym3})`, value: bar1, color: "#1DB954" },
    { name: `CAYm2 (${caym2})`, value: bar2, color: "#FFFC00" },
    { name: `CAYm1 (${caym1})`, value: bar3, color: "#1DA1F2" },
    { name: `CAY (${cay})`, value: bar4, color: "#FF5A5F" },
  ];

  return (
    <React.Fragment>
  <Title>Approved Intake over the years</Title>
  <ResponsiveContainer>
    <BarChart width={600} height={280} data={data} barSize={65}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend payload={legendItems} />

      <Bar dataKey="value" stackId="group">
        {data.map((entry, index) => (
          <Cell key={index} fill={getColor(index % 5)} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
</React.Fragment>

  );
}