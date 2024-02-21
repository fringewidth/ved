import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Authenticate from "./Components/Authenticate";
import UserPage from "./Components/UserPage";
import ProjectPage from "./Components/ProjectPage";
import PublicationPage from "./Components/PublicationPage";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate/:authtype" element={<Authenticate />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="/project/:project_id" element={<ProjectPage />} />
        <Route
          path="/publication/:publication_id"
          element={<PublicationPage />}
        />
      </Routes>
    </>
  );
}
