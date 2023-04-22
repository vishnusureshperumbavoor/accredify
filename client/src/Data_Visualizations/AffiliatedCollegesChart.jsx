import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Typography, Card } from '@mui/material';


  
function AffiliatedCollegesChart({ data }) {
      
    return (
      <Card sx={{ minWidth: 275, margin: "20px", height: "100%" }}>
        <Typography variant="h5" component="div" sx={{ textAlign: 'center' }}>
          Colleges Affiliated By
        </Typography>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="organization" tickFormatter={(value) => {
    if (value === 'AICTE') {
      return 'AICTE';
    } else if (value === 'NCTE') {
      return 'NCTE';
    } else if (value === 'SBTE') {
      return 'SBTE';
    }
    return value;
  }}  />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </Card>
    );
  }
export default AffiliatedCollegesChart
  