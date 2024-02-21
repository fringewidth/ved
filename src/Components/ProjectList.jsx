import React from "react";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
import { useState, useEffect } from "react";
import HorizontalList from "./HorizontalList";

export default function ProjectList(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getProjects();
  }, []);
  const getProjects = async () => {
    const { data, error } = await supabase
      .from("project_publications")
      .select("publication_id, title, abstract, citations_count, name")
      .eq("project_id", props.project_id);
    setData(data);
    if (error) {
      console.log(error);
    }
  };
  console.log(data);
  return (
    <div>
      <h1>{props.header}</h1>
      <HorizontalList items={data} context={props.context} />
    </div>
  );
}
