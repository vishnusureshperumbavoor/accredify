import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./UserPages/Login";
import Signup from "./UserPages/Signup";
import Sidebar from "./Components/Sidebar/Sidebar";
import Registration from "./UserPages/Registration";
import AdminLogin from "./AdminPages/AdminLogin";
import Approved from "./AdminPages/Approved";
import Rejected from "./AdminPages/Rejected";
import Pending from "./AdminPages/Pending";
import WaitApprovalPage from "./UserPages/WaitApprovalPage";
import HomePage from "./UserPages/HomePage";
import Condition1 from "./Prequalifiers/Condition1";
import Condition2 from "./Prequalifiers/Condition2";
import Condition3 from "./Prequalifiers/Condition3";
import Condition4 from "./Prequalifiers/Condition4";
import Condition5 from "./Prequalifiers/Condition5";
import Condition6 from "./Prequalifiers/Condition6";
import Condition7 from "./Prequalifiers/Condition7";
import Condition8 from "./Prequalifiers/Condition8";
import { ThemeProvider } from "@material-ui/core/styles";
import Condition9 from "./Prequalifiers/Condition9";

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/rejected" element={<Rejected />} />
            <Route path="/approved" element={<Approved />} />
            <Route path="/waitforapproval" element={<WaitApprovalPage />} />
            <Route path="/condition1" element={<Condition1 />} />
            <Route path="/condition2" element={<Condition2 />} />
            <Route path="/condition3" element={<Condition3 />} />
            <Route path="/condition4" element={<Condition4 />} />
            <Route path="/condition5" element={<Condition5 />} />
            <Route path="/condition6" element={<Condition6 />} />
            <Route path="/condition7" element={<Condition7 />} />
            <Route path="/condition8" element={<Condition8 />} />
            <Route path="/condition9" element={<Condition9 />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
