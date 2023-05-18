    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
    import Title from './Title';
    import * as React from 'react';
    function InstitueLineGraph({collegeData}) {
        const santionCount2020 = collegeData.details ? Number(collegeData.details.instituteLevelSanctionIntake2020) : 0;
        const santionCount2021 = collegeData.details ? Number(collegeData.details.instituteLevelSanctionIntake2021) : 0;
        const santionCount2022 = collegeData.details ? Number(collegeData.details.instituteLevelSanctionIntake2022) : 0;
        const admissionCount2020 = collegeData.details ? Number(collegeData.details.instituteLevelAdmission2020) : 0;
        const admissionCount2021 = collegeData.details ? Number(collegeData.details.instituteLevelAdmission2021) : 0;
        const admissionCount2022 = collegeData.details ? Number(collegeData.details.instituteLevelAdmission2022) : 0;
        const data = [
                { year: '2020', alloted: santionCount2020, joined: admissionCount2020 },
                { year: '2021', alloted: santionCount2021, joined: admissionCount2021 },
                { year: '2022', alloted: santionCount2022, joined: admissionCount2022 },
        ]; 
              
    return (
        <React.Fragment>
        <Title>College Level Admission</Title>
        <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="alloted" stroke="#8884d8" />
        <Line type="monotone" dataKey="joined" stroke="#82ca9d" />
        </LineChart>
        </ResponsiveContainer>
        </React.Fragment>
        
    );
    }
    export default InstitueLineGraph;
