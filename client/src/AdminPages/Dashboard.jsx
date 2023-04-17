import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

const institutionTypes = [
    { type: 'University', count: 10 },
    { type: 'College', count: 20 },
    { type: 'Institute', count: 15 },
    { type: 'School', count: 5 },
];

const pinCodes = [
  { pinCode: '110001', count: 5 },
  { pinCode: '110002', count: 10 },
  { pinCode: '110003', count: 15 },
  { pinCode: '110004', count: 20 },
];

const affiliations = [
    { name: 'AICTE', value: 60 },
    { name: 'UGC', value: 30 },
    { name: 'NAAC', value: 10 },
];

const establishmentYears = [
    { year: '2010', count: 10 },
    { year: '2011', count: 20 },
    { year: '2012', count: 15 },
    { year: '2013', count: 5 },
  ];

  const approvalYears = [
    { approvalYear: '2015', establishmentYear: '2010' },
    { approvalYear: '2016', establishmentYear: '2011' },
    { approvalYear: '2017', establishmentYear: '2012' },
    { approvalYear: '2018', establishmentYear: '2013' },
  ];

function Dashboard() {
    return (
      <div className="dashboard">
        <div className="sidebar">
          <h2>Institution Types</h2>
          <BarChart width={400} height={300} data={institutionTypes}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </div>
        <div className="sidebar">
          <h2>Pin Code Map</h2>
          <ComposableMap projection="geoMercator" width={400} height={300}>
            <Geographies geography="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json">
              {({ geographies }) =>
                geographies
                .filter((geo) => geo.properties.NAME === "India")
                .map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#EAEAEC"
                    stroke="#D6D6DA"
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </div>
        <div className="sidebar">
          <h2>Affiliations</h2>
          <PieChart width={400} height={300}>
            <Pie data={affiliations} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        </div>
        <div className="sidebar">
          <h2>Establishment Years</h2>
          <LineChart width={400} height={300} data={establishmentYears}>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </div>
        <div className="sidebar">
          <h2>Approval Year vs Establishment Year</h2>
          <ScatterChart width={400} height={300}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" dataKey="establishmentYear" name="Establishment Year" />
            <YAxis type="number" dataKey="approvalYear" name="Approval Year" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="A school" data={[{ approvalYear: '2015', establishmentYear: '2010' }, { approvalYear: '2016', establishmentYear: '2011' }]} fill="#8884d8" />
            <Scatter name="B school" data={[{ approvalYear: '2017', establishmentYear: '2012' }, { approvalYear: '2018', establishmentYear: '2013' }]} fill="#82ca9d" />
          </ScatterChart>
        </div>
      </div>
);
}      
export Default Dashboard;
