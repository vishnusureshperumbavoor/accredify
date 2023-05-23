    import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer } from 'recharts';
    import Title from './Title';
    import * as React from 'react';
    const currentYear = new Date().getFullYear();
const caym3 = `${currentYear - 3}-${currentYear - 4}`;
const caym4 = `${currentYear - 4}-${currentYear - 5}`;
const caym5 = `${currentYear - 5}-${currentYear - 6}`;
    function InstitueLineGraph({collegeData}) {
        const caym5exam = collegeData.details ? Number(collegeData.details.caym5exam) : 0;
        const caym4exam = collegeData.details ? Number(collegeData.details.caym4exam) : 0;
        const caym3exam = collegeData.details ? Number(collegeData.details.caym3exam) : 0;
        const caym5grad = collegeData.details ? Number(collegeData.details.caym5graduates) : 0;
        const caym4grad = collegeData.details ? Number(collegeData.details.caym4graduates) : 0;
        const caym3grad = collegeData.details ? Number(collegeData.details.caym3graduates) : 0;

        const data = [
                { year: `CAYm5`, Examiners: caym5exam, Graduates: caym5grad },
                { year: `CAYm4`, Examiners: caym4exam, Graduates: caym4grad },
                { year: `CAYm3`, Examiners: caym3exam, Graduates: caym3grad },
        ]; 
              
    return (
        <React.Fragment>
        <Title>Graduates</Title>
        <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Examiners" stroke="#8884d8" />
        <Line type="monotone" dataKey="Graduates" stroke="#82ca9d" />
        </LineChart>
        </ResponsiveContainer>
        </React.Fragment>
        
    );
    }
    export default InstitueLineGraph;
