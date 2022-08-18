import "./App.css";
import { Route, Routes } from 'react-router-dom'

import Home from "./components/Home";
import Employee from "./components/UI/Employee/Employee";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-employee" element={<Employee />} />
        </Routes>
    </div>
  );
}

export default App;
