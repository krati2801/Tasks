import logo from './logo.svg';
import './App.css';
import Folder from "./components/Folder";
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Folder />} />
      </Routes>
    </div>
  );
}

export default App;
