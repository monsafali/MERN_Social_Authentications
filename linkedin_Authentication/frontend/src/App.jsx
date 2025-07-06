import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Component/Login";
import Profile from "./Component/Profile";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
