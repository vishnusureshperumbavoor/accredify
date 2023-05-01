import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CollegeDetails from "./UserPages/CollegeDetails";
import Registration from "./UserPages/RegistrationForm";
import Login from "./UserPages/Login";
import HomePage from "./UserPages/HomePage";
import Premium from "./UserPages/PremiumMembeshipPage";
import Condition from "./Prequalifiers/Condition";
import Condition1 from "./Prequalifiers/Condition1";
import Condition2 from "./Prequalifiers/Condition2";
import Condition3 from "./Prequalifiers/Condition3";
import Condition4 from "./Prequalifiers/Condition4";
import Condition5 from "./Prequalifiers/Condition5";
import Condition6 from "./Prequalifiers/Condition6";
import Condition7 from "./Prequalifiers/Condition7";
import Condition8 from "./Prequalifiers/Condition8";
import Dashboard from "./Dashboard/Dashboard";
import Colleges2 from "./Dashboard/Colleges";


function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/collegedetails" element={<CollegeDetails />} />
            <Route path="/signup" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/condition" element={<Condition />} />
            <Route path="/condition1" element={<Condition1 />} />
            <Route path="/condition2" element={<Condition2 />} />
            <Route path="/condition3" element={<Condition3 />} />
            <Route path="/condition4" element={<Condition4 />} />
            <Route path="/condition5" element={<Condition5 />} />
            <Route path="/condition6" element={<Condition6 />} />
            <Route path="/condition7" element={<Condition7 />} />
            <Route path="/condition8" element={<Condition8 />} />
            <Route path="/pricing" element={<Premium />} />
            <Route path="/colleges/:id" element={<Colleges2 />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
