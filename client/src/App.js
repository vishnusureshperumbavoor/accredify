import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

import One from "./hooks/usecontext/One";
import { AppContext } from "./AppContext";
import Home2 from "./Pages/Home2";
import Sidebar from "./Components/Sidebar/Sidebar";

function App() {
  return (
    <div>
      <Router>
        <AppContext.Provider value={{ data: 10 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/usecontext" element={<One />} />
            <Route path="/home2" element={<Home2 />} />
            <Route path="/sidebar" element={<Sidebar />} />
          </Routes>
        </AppContext.Provider>
      </Router>
    </div>
  );
}

export default App;
