import React from "react";
import NavBar from "./NavBar";
import Field from "./Field";

import { createClient } from "@supabase/supabase-js/";
import { Link } from "react-router-dom";

const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function ProjectPage() {
  const { project_id } = useParams();
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    getUsers();
  }, [items]);

  const getItems = async () => {
    const { data, error } = await supabase
      .from("project_page")
      .select("title, isactive, name, description, string_agg, admin_id")
      .eq("project_id", project_id.slice(1));
    setItems(data);
    if (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    if (items.length > 0) {
      const usernames = items[0].string_agg.split(" ");
      const promises = usernames.map(async (username) => {
        const { data, error } = await supabase
          .from("researchers")
          .select("username, first_name, last_name, affiliation")
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
  console.log(users);
  const userList = users.map((user) => (
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
            {items.length > 0 ? items[0].title : null}
          </h1>
          <div>
            <span>
              {items.length > 0
                ? items[0].isactive
                  ? "Active"
                  : ""
                : "Unable to load"}
            </span>
            <Field field="Computer Science" />
          </div>
          <p>{items.length > 0 ? items[0].description : null}</p>
        </div>
        <div class="projectheadother">
          <ul>{userList}</ul>
        </div>
      </div>
    </>
  );
}
