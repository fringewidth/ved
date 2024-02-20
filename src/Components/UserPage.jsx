import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import TopList from "./TopList.jsx";
import Field from "./Field.jsx";
import calendar from "../assets/svg/calendar.svg";
import pin from "../assets/svg/pin.svg";
import { createClient } from "@supabase/supabase-js/";

const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function UserPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const { data, error } = await supabase
        .from("user_page")
        .select(
          "full_name, affiliation, bio, city, yoe, publications, citations, active_projects, fields"
        )
        .eq("username", "julia_estevez");
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(items);

  const list_count = 6;
  const icons = [pin, calendar, null, null, null];
  const content =
    items.length > 0
      ? [
          `${items[0].city}`,
          `${items[0].yoe} ${
            items[0].yoe === 1 ? "year" : "years"
          } of experience`,
          `${items[0].publications} ${
            items[0].publications === 1 ? "publication" : "publications"
          }`,
          `Cited ${items[0].citations} ${
            items[0].citations === 1 ? "time" : "times"
          }`,
          `${items[0].active_projects} ${
            items[0].active_projects === 1
              ? "active project"
              : "active projects"
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
    items.length > 0
      ? items[0].fields
          .split(",")
          .map((field) => <Field field={field} key={field} />)
      : null;

  return (
    <>
      <NavBar />
      <div className="userdata">
        <div className="userdatamain">
          <div className="userfullname">
            {items.length ? items[0].full_name : 0}
          </div>
          <div className="useraffl">
            {items.length > 0 ? items[0].affiliation : ""}
          </div>
          <div className="userbio">{items.length > 0 ? items[0].bio : ""}</div>
          <div className="userfields">{fields}</div>
        </div>
        <div className="userdataother">{otherdata}</div>
      </div>
      <TopList
        count={list_count}
        table="top_projects"
        header="Projects"
        fields="project_id, title, description, citations, field"
      />
      <TopList
        count={list_count}
        table="top_publications"
        header="Papers"
        fields="publication_id, title, authors, abstract, citations, journal"
      />
    </>
  );
}
