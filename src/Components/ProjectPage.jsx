import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "./NavBar";
import Field from "./Field";
import ProjectList from "./ProjectList";
import { getSupabase } from "../utils/supabaseClient";
import { sessionContext } from "../contexts/SessionProvider";

const supabase = getSupabase();

export default function ProjectPage() {
  const { project_id, status } = useParams();

  const { session } = useContext(sessionContext);
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    getUsers();
  }, [items]);

  const getItems = async () => {
    try {
      const { data, error } = await supabase
        .from("project_page")
        .select(
          "title, isactive, name, description, string_agg, admin_id, email"
        )
        .eq("project_id", project_id.slice(1));
      setItems(data);
      if (error) {
        setError(error);
      }
      // console.log(items);
    } catch (error) {
      setError(error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      await supabase.rpc(
        "delete_project",
        {
          project_id_arg: project_id.slice(1),
          user_email_arg: session?.user.email,
        },
        { returnType: "single" }
      );
      // navigate("/user/:" + items?.admin_id);
    } catch (error) {
      setError(error);
    }
  };

  const getUsers = async () => {
    if (items?.length > 0) {
      const usernames = items[0].string_agg.split(" ");
      const promises = usernames.map(async (username) => {
        try {
          const { data, error } = await supabase
            .from("researchers")
            .select("username, first_name, last_name, affiliation, email)")
            .eq("username", username);
          if (error) {
            setError(error);
          }
          return data;
        } catch (error) {
          setError(error);
        }
      });
      const userData = await Promise.all(promises);
      setUsers(userData);
    }
  };

  const isUserAdmin = items[0]?.email === session?.user?.email;

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

  const handleAddNewUser = () => {
    alert("helloooo :3");
  };

  if (isUserAdmin) {
    userList.push(
      <div onClick={handleAddNewUser} class="link">
        <li>
          <div className="projauthorisadmin">+ Add Contributor</div>
        </li>
      </div>
    );
  }

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
          {isUserAdmin ? (
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
      {error && <p>Error: {error.message}</p>}
    </>
  );
}
