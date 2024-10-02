import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { sessionContext } from "../contexts/SessionProvider";
import { supabase } from "../utils/supabase";
import UserList from "./UserList";
import NavBar from "./NavBar";
import Field from "./Field";
import calendar from "../assets/svg/calendar.svg";
import pin from "../assets/svg/pin.svg";

const initialInputs = {
  fullName: "",
  affl: "",
  bio: "",
  city: "",
  yoe: "",
  publications: "",
};

const changed = {
  fullName: false,
  affl: false,
  bio: false,
  city: false,
  yoe: false,
  publications: false,
};

export default function UserPage() {
  const [editing, setEditing] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);
  const [data, setData] = useState([]);
  const [changedInputs, setChangedInputs] = useState(changed);
  const { username } = useParams();
  const { session } = useContext(sessionContext);

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
    if (e.target.value !== e.target.placeholder && e.target.value !== "") {
      e.target.style.borderColor = "green";
      changedInputs[e.target.name] = true;
    } else {
      e.target.style.borderColor = "white";
      changedInputs[e.target.name] = false;
    }
  };

  const handleSubmit = async () => {
    if (Object.values(changedInputs).some((inputChanged) => inputChanged)) {
      const updatedData = {
        full_name: inputs.fullName || (data.length > 0 && data[0].full_name),
        affiliation: inputs.affl || (data.length > 0 && data[0].affiliation),
        bio: inputs.bio || (data.length > 0 && data[0].bio),
        city: inputs.city || (data.length > 0 && data[0].city),
        yoe: inputs.yoe || (data.length > 0 && data[0].yoe),
      };

      const names = updatedData.full_name.split(" ");
      const first_name = names[0];
      const last_name = names.length > 1 ? names[names.length - 1] : "";
      const middle_name = names.length > 2 ? names.slice(1, -1).join(" ") : "";

      try {
        await supabase.rpc("update_user_info", {
          username_arg: username.slice(1),
          first_name_arg: first_name,
          middle_name_arg: middle_name,
          last_name_arg: last_name,
          affiliation_arg: updatedData.affiliation,
          bio_arg: updatedData.bio,
          city_arg: updatedData.city,
          yoe_arg: updatedData.yoe,
          user_email_arg: session.user.email,
        });
        window.location.reload();
      } catch (error) {
        console.error("Error updating user info:", error);
      }
    }
    setEditing(false);
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
            onClick={(e) => {
              e.target.select();
            }}
            onChange={handleDataChange}
            type="text"
            className="detailscontent input"
            placeholder={content[index]}
            name={otherNames[index]}
            defaultValue={content[index]}
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
                onClick={(e) => {
                  e.target.select();
                }}
                onChange={handleDataChange}
                type="text"
                className="input userfullname"
                placeholder={data.length ? data[0].full_name : ""}
                name="fullName"
                defaultValue={data.length ? data[0].full_name : ""}
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
                onClick={(e) => {
                  e.target.select();
                }}
                onChange={handleDataChange}
                type="text"
                className="useraffl input"
                placeholder={data.length > 0 ? data[0].affiliation : ""}
                name="affl"
                defaultValue={data.length > 0 ? data[0].affiliation : ""}
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
                onClick={(e) => {
                  e.target.select();
                }}
                onChange={handleDataChange}
                className="userbio input bio"
                disabled={false}
                placeholder={data.length > 0 ? data[0].bio : ""}
                name="bio"
                defaultValue={data.length > 0 ? data[0].bio : ""}
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
