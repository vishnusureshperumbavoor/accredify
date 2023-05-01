import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { XAxis, YAxis,ResponsiveContainer } from 'recharts';
import { BarChart, Bar,CartesianGrid, Tooltip, Legend} from 'recharts';
import Title from './Title';
import { Cell } from 'recharts';

const legendItems = [
  { value: "Computer", color: "#0088FE" },
  { value: "Electronics", color: "#00C49F" },
  { value: "Mechanical", color: "#FFBB28" },
];

export default function CollegeLabs({collegeData}) {
  const theme = useTheme();
  const computerCount = collegeData.details ? Number(collegeData.details.computerLab) : 0;
  const electronicsCount = collegeData.details ? Number(collegeData.details.electronicsLab) : 0;
  const mechCount = collegeData.details ? Number(collegeData.details.mechanicalLab) : 0;
  const data = [
    { name: "Computer", value: computerCount, color: "#0088FE" },
    { name: "Electronics", value: electronicsCount, color: "#00C49F" },
    { name: "Mechanical", value: mechCount, color: "#FFBB28" },
  ];
  return (
    <React.Fragment>
      <Title>College Labs</Title>
      <ResponsiveContainer>
      <BarChart width={600} height={280} data={data} barSize={105}>
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