    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
    import * as React from 'react';
import Title from './Title';
    function ProgramLineGraph({collegeData}) {
        const santionCount2020 = collegeData.details ? Number(collegeData.details.programLevelSanctionIntake2020) : 0;
        const santionCount2021 = collegeData.details ? Number(collegeData.details.programLevelSanctionIntake2021) : 0;
        const santionCount2022 = collegeData.details ? Number(collegeData.details.programLevelSanctionIntake2022) : 0;
        const admissionCount2020 = collegeData.details ? Number(collegeData.details.programLevelAdmission2020) : 0;
        const admissionCount2021 = collegeData.details ? Number(collegeData.details.programLevelAdmission2021) : 0;
        const admissionCount2022 = collegeData.details ? Number(collegeData.details.programLevelAdmission2022) : 0;
        const data = [
                { year: '2020', alloted: santionCount2020, joined: admissionCount2020 },
                { year: '2021', alloted: santionCount2021, joined: admissionCount2021 },
                { year: '2022', alloted: santionCount2022, joined: admissionCount2022 },
        ]; 
              
    return (
        <React.Fragment>
            <Title>Department Level Admission</Title>
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
    export default ProgramLineGraph;
