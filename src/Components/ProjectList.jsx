import React, { useState, useEffect, useContext } from "react";
import HorizontalList from "./HorizontalList";
import { supabase } from "../utils/supabase";
import { sessionContext } from "../contexts/SessionProvider";

export default function ProjectList(props) {
  const { session } = useContext(sessionContext);
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

  // console.log(session)
  return (
    <div>
      <h1>{props.header}</h1>
      {/* {session?.user.email === email && props.table == "user_publications" && (
        <Link
          to="/addPaper"
          style={{
            textDecoration: "none",
            verticalAlign: "middle",
          }}
          className="button"
        >
          +
        </Link>
      )} */}
      <HorizontalList items={data} context={props.context} />
    </div>
  );
}
