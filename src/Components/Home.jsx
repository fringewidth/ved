import React from "react";
import NavBar from "./NavBar.jsx";
import HeroContent from "./HeroContent.jsx";
import TopList from "./TopList.jsx";
import LandingFooter from "./LandingFooter.jsx";

export default function Home() {
  const list_count = 6;
  return (
    <div>
      <NavBar />
      <HeroContent />
      <TopList
        count={list_count}
        table="top_projects"
        header="Top Projects"
        fields="project_id, title, description, citations, field"
      />
      <TopList
        count={list_count}
        table="top_publications"
        header="Top Publications"
        fields="publication_id, title, authors, abstract, citations, journal"
      />
      <TopList
        count={list_count}
        table="top_researchers"
        header="Top Researchers"
        fields="username, full_name, citations, affiliation"
      />
      <LandingFooter />
    </div>
  );
}
