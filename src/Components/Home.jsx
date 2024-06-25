import React from "react";
import NavBar from "./NavBar.jsx";
import HeroContent from "./HeroContent.jsx";
import TopList from "./TopList.jsx";
import LandingFooter from "./LandingFooter.jsx";

export default function Home() {
  const itemsPerList = 7;
  return (
    <div>
      <NavBar />
      <HeroContent />
      <TopList
        count={itemsPerList}
        context="project"
        table="top_projects"
        header="Top Projects"
        fields="project_id, title, description, citations, field"
      />
      <TopList
        count={itemsPerList}
        context="publication"
        table="top_publications"
        header="Top Publications"
        fields="publication_id, title, authors, abstract, citations, journal"
      />
      <TopList
        count={itemsPerList}
        context="user"
        table="top_researchers"
        header="Top Researchers"
        fields="username, full_name, citations, affiliation"
      />
      <LandingFooter />
    </div>
  );
}
