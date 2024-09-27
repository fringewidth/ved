import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Authenticate from "./Components/Authenticate";
import UserPage from "./Components/UserPage";
import ProjectPage from "./Components/ProjectPage";
import PublicationPage from "./Components/PublicationPage";
import Search from "./Components/Search";
import CreateProject from "./Components/CreateProject";
import SessionProvider from "./contexts/SessionProvider";
import UsernameSearch from "./Components/UserSearch";

export default function App() {
  return (
    <SessionProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authenticate/:authtype" element={<Authenticate />} />
        <Route path="/user/:username" element={<UserPage />} />
        <Route path="/project/:project_id" element={<ProjectPage />} />
        <Route path="/createProject" element={<CreateProject />} />
        <Route
          path="/publication/:publication_id"
          element={<PublicationPage />}
        />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/usernameSearch/" element={<UsernameSearch />} />
      </Routes>
    </SessionProvider>
  );
}
