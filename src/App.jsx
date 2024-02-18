import React from "react";
import NavBar from "./Components/NavBar.jsx";
import HeroContent from "./Components/HeroContent.jsx";
import TopProjects from "./Components/TopProjects.jsx";

export default function App() {
  return (
    <div>
      <NavBar />
      <HeroContent />
      <TopProjects count="5" />
    </div>
  );
}
