import "./App.css";

import { Container } from "@mui/material";
import { Route, Routes } from 'react-router-dom'

import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
