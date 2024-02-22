import React from "react";
import NavBar from "./NavBar";
import Field from "./Field";
import ProjectList from "./ProjectList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js/";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProjectPage() {
  // navigate = useNavigate();
  const { project_id } = useParams();
  const [session, setSession] = useState(null);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    getUsers();
  }, [items]);

  useEffect(() => {
    getSession();
  }, [items]);

  const getItems = async () => {
    const { data, error } = await supabase
      .from("project_page")
      .select(
        "title, isactive, name, description, string_agg, admin_id, researchers!projects_admin_id_fkey(email)"
      )
      .eq("project_id", project_id.slice(1));
    setItems(data);
    if (error) {
      console.log(error);
    }
    console.log(items);
  };

  const handleDeleteProject = async () => {
    await supabase.rpc(
      "delete_project",
      {
        project_id_arg: project_id.slice(1),
        user_email_arg: session?.user.email,
      },
      { returnType: "single" }
    );
    // navigate("/user/:" + items?.admin_id);
  };

  const getSession = async () => {
    await supabase.auth.getSession();
    setSession(data?.session);
    console.log(session);
  };

  const getUsers = async () => {
    if (items?.length > 0) {
      const usernames = items[0].string_agg.split(" ");
      const promises = usernames.map(async (username) => {
        const { data, error } = await supabase
          .from("researchers")
          .select(
            "username, first_name, last_name, affiliation, researcher_project(researchers(email))"
          )
          .eq("username", username);
        if (error) {
          console.log(error);
        }
        return data;
      });
      const userData = await Promise.all(promises);
      setUsers(userData);
    }
  };
  const userList = users?.map((user) => (
    <Link to={"/user/:" + user[0].username} class="link">
      <li>
        <div className="projauthorname">
          {user[0].first_name + " " + user[0].last_name}
        </div>
        <div className="projauthoraffl">{user[0].affiliation}</div>
        <div className="projauthorisadmin">
          {items[0].admin_id === user[0].username ? "Admin" : null}
        </div>
      </li>
    </Link>
  ));
  return (
    <>
      <NavBar />
      <div class="projecthead">
        <div class="projectheadmain">
          <h1 class="specialtext">
            {items?.length > 0 ? items[0].title : null}
          </h1>
          <div>
            <span>
              {items?.length > 0
                ? items[0].isactive
                  ? "Active"
                  : ""
                : "Unable to load"}
            </span>
            <Field field="Computer Science" />
          </div>
          <p>{items?.length > 0 ? items[0].description : null}</p>
        </div>
        <div class="projectheadother">
          <ul>{userList}</ul>
          {items[0]?.researchers?.email === session?.user?.email ? (
            <button class="deletebutton" onClick={handleDeleteProject}>
              Delete Project
            </button>
          ) : null}
        </div>
      </div>
      <ProjectList
        table="project_publications"
        context="publication"
        header="Papers"
        project_id={project_id.slice(1)}
      />
    </>
  );
}
