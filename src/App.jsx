import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Authenticate from "./Components/Authenticate";
import UserPage from "./Components/UserPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate/:authtype" element={<Authenticate />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </>
  );
}
