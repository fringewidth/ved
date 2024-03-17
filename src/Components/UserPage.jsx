import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";
import Field from "./Field";
import calendar from "../assets/svg/calendar.svg";
import pin from "../assets/svg/pin.svg";
import { getSupabase } from "../utils/supabaseClient";
import UserList from "./UserList";
import { sessionContext } from "../contexts/SessionProvider";

const supabase = getSupabase();

const initialInputs = {
  fullName: "",
  affl: "",
  bio: "",
  city: "",
  yoe: "",
  publications: "",
};

export default function UserPage() {
  const [inputs, setInputs] = useState(initialInputs);
  const [editing, setEditing] = useState(false);
  const [data, setData] = useState([]);
  const { username } = useParams();
  const { session } = useContext(sessionContext);
  console.log(session);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    try {
      const { data, error } = await supabase
        .from("user_page")
        .select(
          "full_name, affiliation, bio, city, yoe, publications, citations, active_projects, fields, email"
        )
        .eq("username", username.slice(1));
      setData(data);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDataChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]:
        e.target.value === "" ? e.target.placeholder : e.target.value,
    });
    if (e.target.value !== e.target.placeholder) {
      e.target.style.border = "2px solid green";
    } else {
      e.target.style.border = "none";
    }
    if (e.target.value === "") {
      e.target.style.border = "none";
    }
  };

  const handleSubmit = async () => {
    const full_name = inputs.fullName || (data.length > 0 && data[0].full_name);
    const affiliation = inputs.affl || (data.length > 0 && data[0].affiliation);
    const bio = inputs.bio || (data.length > 0 && data[0].bio);
    const city = inputs.city || (data.length > 0 && data[0].city);
    const yoe = inputs.yoe || (data.length > 0 && data[0].yoe);
    const names = full_name.split(" ");
    const first_name = names[0];
    const last_name = names[names.length - 1];
    const middle_name = names.length === 2 ? null : names[1];
    setEditing(!editing);
    const { sure, error } = await supabase.rpc("update_user_info", {
      username_arg: username.slice(1),
      first_name_arg: first_name,
      middle_name_arg: middle_name,
      last_name_arg: last_name,
      user_email_arg: session.user.email,
      city_arg: city,
      yoe_arg: yoe,
      affiliation_arg: affiliation,
      bio_arg: bio,
    });
    console.log(error);

    window.location.reload();
  };

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
  const otherNames = ["city", "yoe"];
  const otherdata = icons.map((icon, index) => (
    <div key={index} className="userdetails">
      {icon && <img className="detailsicon" src={icon} alt="" />}
      <>
        {editing && (index === 0 || index === 1) ? (
          <input
            onChange={handleDataChange}
            type="text"
            className="detailscontent input"
            // value=
            placeholder={content[index]}
            name={otherNames[index]}
          />
        ) : (
          <span className="detailscontent">{content[index]}</span>
        )}
      </>
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
          <>
            {editing ? (
              <input
                onChange={handleDataChange}
                type="text"
                // value={init.fullName}
                className="input userfullname"
                placeholder={data.length ? data[0].full_name : ""}
                name="fullName"
              />
            ) : (
              <div className="userfullname">
                {data.length ? data[0].full_name : ""}
              </div>
            )}
          </>
          <>
            {editing ? (
              <input
                onChange={handleDataChange}
                type="text"
                className="useraffl input"
                // value={data.length > 0 ? data[0].affiliation : ""}
                placeholder={data.length > 0 ? data[0].affiliation : ""}
                name="affl"
              />
            ) : (
              <div className="useraffl">
                {data.length > 0 ? data[0].affiliation : ""}
              </div>
            )}
          </>
          <>
            {editing ? (
              <input
                onChange={handleDataChange}
                className="userbio input bio"
                disabled={false}
                // value={data.length > 0 ? data[0].bio : ""}
                placeholder={data.length > 0 ? data[0].bio : ""}
                name="bio"
              />
            ) : (
              <div className="userbio">
                {data.length > 0 ? data[0].bio : ""}
              </div>
            )}
          </>
          <div className="userfields">{fields}</div>
          {data.length > 0 && session?.user.email === data[0].email ? (
            <div className="buttongroup">
              {editing ? (
                <button className="button" onClick={handleSubmit}>
                  Done
                </button>
              ) : (
                <button
                  className="button"
                  onClick={(e) => {
                    setEditing(!editing);
                  }}
                >
                  + Edit
                </button>
              )}
            </div>
          ) : null}
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
