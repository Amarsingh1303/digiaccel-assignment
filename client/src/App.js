import { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Detail from "./components/Detail";

function App() {
  return (
    // <div>
    //   hello
    //   {/* {apiData.map((data) => (
    //     <h1>{data.name} </h1>
    //   ))} */}
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/:id/detail" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
