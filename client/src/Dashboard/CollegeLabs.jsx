import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import Title from './Title';
import Heatmap from 'react-heatmap-grid';

const legendItems = [
  { value: "Computer", color: "#0088FE" },
  { value: "Electronics", color: "#00C49F" },
  { value: "Mechanical", color: "#FFBB28" },
];
const data = [
  [0, 1, 2, 3, 4],
  [1, 2, 3, 4, 5],
  [2, 3, 4, 5, 6],
  [3, 4, 5, 6, 7],
  [4, 5, 6, 7, 8],
];
const xLabels = ['VSP', 'Elon', 'Jeff', 'Aaron', 'Emina'];
const yLabels = ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5'];

export default function CollegeLabs({collegeData}) {
  
  const theme = useTheme();
  const computerCount = collegeData.details ? Number(collegeData.details.computerLab) : 0;
  const electronicsCount = collegeData.details ? Number(collegeData.details.electronicsLab) : 0;
  const mechCount = collegeData.details ? Number(collegeData.details.mechanicalLab) : 0;
  // const data = [
  //   { student: 'Student 1', Math: 90, Science: 80, History: 70, English: 60 },
  //   { student: 'Student 2', Math: 70, Science: 60, History: 50, English: 40 },
  //   { student: 'Student 3', Math: 50, Science: 40, History: 30, English: 20 },
  //   { student: 'Student 4', Math: 30, Science: 20, History: 10, English: 5 },
  // ];

  // Colors for heatmap
  const colors = ['#ffcccc', '#ff9999', '#ff6666', '#ff3333', '#ff0000'];
  return (
    <React.Fragment>
      <Title>College Labs</Title>
      <ResponsiveContainer >
      <Heatmap xLabels={xLabels} yLabels={yLabels} data={data} />
      </ResponsiveContainer>
    </React.Fragment>
  );
}