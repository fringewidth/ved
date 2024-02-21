import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Field from "./Field";
import calendar from "../assets/svg/calendar.svg";
import pin from "../assets/svg/pin.svg";
import { createClient } from "@supabase/supabase-js/";
import UserList from "./UserList";

const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function UserPage() {
  const [data, setData] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const { data, error } = await supabase
      .from("user_page")
      .select(
        "full_name, affiliation, bio, city, yoe, publications, citations, active_projects, fields"
      )
      .eq("username", username.slice(1));
    setData(data);
    if (error) {
      console.log(error);
    }
  };

  const list_count = 6;
  const icons = [pin, calendar, null, null, null];
  const content =
    data.length > 0
      ? [
          `${data[0].city}`,
          `${data[0].yoe} ${
            data[0].yoe === 1 ? "year" : "years"
          } of experience`,
          `${data[0].publications} ${
            data[0].publications === 1 ? "publication" : "publications"
          }`,
          `Cited ${data[0].citations} ${
            data[0].citations === 1 ? "time" : "times"
          }`,
          `${data[0].active_projects} ${
            data[0].active_projects === 1 ? "active project" : "active projects"
          }`,
        ]
      : ["", "", "", "", ""];

  const otherdata = icons.map((icon, index) => (
    <div key={index} className="userdetails">
      {icon && <img className="detailsicon" src={icon} alt="" />}
      <span className="detailscontent">{content[index]}</span>
    </div>
  ));

  const fields =
    data.length > 0
      ? data[0].fields
          .split(",")
          .map((field) => <Field field={field} key={field} />)
      : null;

  return (
    <>
      <NavBar />
      <div className="userdata">
        <div className="userdatamain">
          <div className="userfullname">
            {data.length ? data[0].full_name : 0}
          </div>
          <div className="useraffl">
            {data.length > 0 ? data[0].affiliation : ""}
          </div>
          <div className="userbio">{data.length > 0 ? data[0].bio : ""}</div>
          <div className="userfields">{fields}</div>
        </div>
        <div className="userdataother">{otherdata}</div>
      </div>
      <UserList
        table="user_projects"
        header="Projects"
        fields="project_id, title, description, citations, field"
        username={username.slice(1)}
        context="project"
      />
      <UserList
        table="user_publications"
        header="Papers"
        fields="publication_id, title, authors, abstract, citations, journal"
        username={username.slice(1)}
        context="publication"
      />
    </>
  );
}
