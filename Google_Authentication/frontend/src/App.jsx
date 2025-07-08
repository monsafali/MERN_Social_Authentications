import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import Proflle from "./component/Proflle";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/profile" element={<Proflle />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
