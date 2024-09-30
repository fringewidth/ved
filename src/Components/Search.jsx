import React from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js/dist/module";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import HorizontalList from "./HorizontalList";

export default function Search() {
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [users, setUsers] = useState([]);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    getProjects();
    getPublications();
    getUsers();
  }, []);

  const getProjects = async () => {
    const { data, error } = await supabase
      .from("top_projects")
      .select("project_id, title, description, citations, field")
      .textSearch("title", query.slice(1), {
        type: "websearch",
        config: "english",
      });
    setProjects(data);
    // console.log(data);
  };

  const getPublications = async () => {
    const { data, error } = await supabase
      .from("top_publications")
      .select("publication_id, title, abstract, citations, journal")
      .textSearch("title", query.slice(1), {
        type: "websearch",
        config: "english",
      });
    setPublications(data);
  };

  const getUsers = async () => {
    const { data, error } = await supabase
      .from("top_researchers")
      .select("username, full_name, citations, affiliation")
      .textSearch("full_name", query.slice(1), {
        type: "websearch",
        config: "english",
      });
    setUsers(data);
  };

  const { query } = useParams();

  return (
    <>
      <NavBar />
      {projects.length > 0 ? (
        <>
          <h1>
            {projects.length} matching{" "}
            {projects.length === 1 ? "project" : "projects"}
          </h1>
          <HorizontalList context="project" items={projects} />
        </>
      ) : null}
      {publications.length > 0 ? (
        <>
          <h1>
            {publications.length} matching{" "}
            {publications.length === 1 ? "publication" : "publications"}
          </h1>
          <HorizontalList context="publication" items={publications} />
        </>
      ) : null}
      {users.length > 0 ? (
        <>
          <h1>
            {users.length} matching {users.length === 1 ? "user" : "users"}
          </h1>
          <HorizontalList context="user" items={users} />
        </>
      ) : null}
      {projects.length === 0 &&
        publications.length === 0 &&
        users.length === 0 && <h1>No results found.</h1>}
    </>
  );
}
