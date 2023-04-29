import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { XAxis, YAxis,ResponsiveContainer } from 'recharts';
import { BarChart, Bar,CartesianGrid, Tooltip, Legend} from 'recharts';
import Title from './Title';
import { Cell } from 'recharts';
import axios from 'axios';
import { useEffect } from 'react';
const SERVER_URL = process.env.REACT_APP_SERVER_URL


const data = [
  { name: "Government Institute", value: 200, color: "#0088FE" },
  { name: "Govt Aided Institute", value: 300, color: "#00C49F" },
  { name: "Self Supported Institute", value: 100, color: "#FFBB28" },
  { name: "Deemed University", value: 400, color: "#FF8042" },
  { name: "University", value: 150, color: "#AF19FF" },
  { name: "NIT", value: 250, color: "#FF0000" },
];
const legendItems = [
  { value: "Government Institute", color: "#0088FE" },
  { value: "Govt Aided Institute", color: "#00C49F" },
  { value: "Self Supported Institute", color: "#FFBB28" },
  { value: "Deemed University", color: "#FF8042" },
  { value: "University", color: "#AF19FF" },
  { value: "NIT", color: "#FF0000" },
];

export default function BarchartPage() {
  const theme = useTheme();

  useEffect(()=>{
    // axios.post(`${SERVER_URL}/getInstitutionTypes`)
  })

  return (
    <React.Fragment>
      <Title>Institution Types</Title>
      <ResponsiveContainer>
      <BarChart width={600} height={280} data={data} barSize={35}>
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