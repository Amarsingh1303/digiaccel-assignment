import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Detail from "./components/Detail";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/detail" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
