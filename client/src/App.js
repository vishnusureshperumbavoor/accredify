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

function App() {
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/pending" element={<Pending />} />
            <Route path="/rejected" element={<Rejected />} />
            <Route path="/approved" element={<Approved />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
