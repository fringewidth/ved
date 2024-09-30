import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import editIcon from "../assets/svg/edit.svg";
import checkmarkIcon from "../assets/svg/checkmark.svg";
import deleteIcon from "../assets/svg/delete.svg";
import crossIcon from "../assets/svg/cross.svg";
import NavBar from "./NavBar";
import Field from "./Field";
import ProjectList from "./ProjectList";
import UserSearch from "./UserSearch";
import SelectFields from "./SelectFields";
import Popup from "./Popup";
import { supabase } from "../utils/supabase";
import { sessionContext } from "../contexts/SessionProvider";

export default function ProjectPage() {
  const { project_id } = useParams();

  const { session } = useContext(sessionContext);

  const searchBoxRef = useRef(null);
  const addContributorRef = useRef(null);
  const initialInputs = {
    project_title: "",
    project_description: "",
    project_activity_status: "",
    project_field: "",
  };

  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [searchPosition, setSearchPosition] = useState({ left: 0, top: 0 });
  const [selected, setSelected] = useState(null);
  const [popup, setPopup] = useState(null);
  const [editing, setEditing] = useState(false);
  const [inputs, setInputs] = useState(initialInputs);

  const SEARCH_BOX_HEIGHT = 24;
  const SEARCH_BOX_WIDTH = 20;

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close the search box if the click is outside of it,
      // but not when clicking the add contributor button
      // as that would prevent it from being opened in the first place.
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target) &&
        addContributorRef.current &&
        !addContributorRef.current.contains(e.target)
      ) {
        setShowUserSearch(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const addContributor = async () => {
    if (selected) {
      const { error } = await supabase.rpc(
        "add_contributor",
        {
          username_arg: selected,
          project_id_arg: project_id.slice(1),
        },
        { returnType: "void" }
      );
      if (error) {
        console.log(error);
      }
      window.location.reload();
    }
  };

  useEffect(() => {
    addContributor();
  }, [selected]);

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
    } catch (error) {
      setError(error);
    }
  };
  console.log(inputs);

  const handleDataChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    if (e.target.value !== e.target.placeholder && e.target.value !== "") {
      e.target.style.borderColor = "green";
    } else {
      e.target.style.borderColor = "white";
    }
  };

  const deleteProject = async () => {
    const { error } = await supabase.rpc(
      "delete_project",
      {
        project_id_arg: project_id.slice(1),
      },
      { returnType: "void" }
    );
    if (error) {
      console.log(error);
    }
    window.location.href = "/user/:" + items[0].admin_id;
  };

  const handleDeleteProject = async () => {
    setPopup({
      header: "Are you sure you want to delete this project?",
      content: "All papers associated with this project will also be deleted.",
      buttons: [
        {
          text: "Delete",
          class: "danger",
          onClick: deleteProject,
        },
        {
          text: "Cancel",
          class: "normal",
          onClick: () => {
            setPopup(null);
          },
        },
      ],
    });
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
    <Link to={"/user/:" + user[0].username} className="link">
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

  const handleEditProject = () => {
    setEditing(!editing);
  };
  const handleAddNewUser = async (e) => {
    const { clientX, clientY } = e;
    const left = Math.min(
      clientX,
      window.innerWidth - SEARCH_BOX_WIDTH * 16 - 50
    );
    const top = Math.min(
      clientY,
      window.innerHeight - SEARCH_BOX_HEIGHT * 16 - 50
    ); // 1rem = 16px
    setSearchPosition({ left, top });
    setShowUserSearch(true);
  };

  if (isUserAdmin) {
    userList.push(
      <div onClick={handleAddNewUser} className="link">
        <li>
          <div className="projauthorisadmin" ref={addContributorRef}>
            + Add Contributor
          </div>
        </li>
      </div>
    );
  }

  const projectTitle = items?.length > 0 ? items[0].title : null;
  const activityStatus =
    items?.length > 0 && (items[0].isactive ? "Active" : "&#x200b;"); // zero width character, but technically different than ""
  const field = items?.length > 0 ? items[0].name : "Loading...";
  const description = items?.length > 0 ? items[0].description : null;
  return (
    <>
      <NavBar />
      {popup && <Popup {...popup} />}
      <div className="projecthead">
        <div className="projectheadmain">
          {editing ? (
            <input
              name="project_title"
              className="input userfullname"
              placeholder={projectTitle}
              defaultValue={projectTitle}
              onChange={handleDataChange}
            />
          ) : (
            <h1 className="specialtext">{projectTitle}</h1>
          )}
          <div>
            <div className="activity-stat">
              {!editing ? (
                activityStatus || "Unable to load"
              ) : (
                <select
                  name="project_activity_status"
                  className="input"
                  defaultValue={activityStatus}
                  onChange={handleDataChange}
                >
                  <option value="active">Active</option>
                  <option value="&#x200b;" placeholder="Active">
                    Inactive
                  </option>
                </select>
              )}
            </div>
            {editing ? (
              <SelectFields
                name="project_field"
                defaultValue={field}
                onChange={handleDataChange}
                placeholder={field}
              />
            ) : (
              <Field field={field} />
            )}
          </div>
          {editing ? (
            <textarea
              name="project_description"
              type="text"
              rows="10"
              cols="100"
              className="input desc"
              defaultValue={description}
              placeholder={description}
              onChange={handleDataChange}
            />
          ) : (
            <p>{description}</p>
          )}
        </div>
        <div className="projectheadother">
          <ul>{userList}</ul>
          {isUserAdmin ? (
            <div className="buttongroup">
              <button className="button" onClick={handleEditProject}>
                <div>
                  <img src={editing ? checkmarkIcon : editIcon} alt="" />
                </div>
                {editing ? "Done" : "Edit Project"}
              </button>
              {!editing ? (
                <button className="delete button" onClick={handleDeleteProject}>
                  <img src={deleteIcon} />
                </button>
              ) : (
                <button
                  className="button"
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  <img src={crossIcon} />
                  Cancel
                </button>
              )}
            </div>
          ) : null}
        </div>
      </div>
      <ProjectList
        table="project_publications"
        context="publication"
        header="Papers"
        project_id={project_id.slice(1)}
        admin_id={items[0]?.admin_id}
      />
      {showUserSearch && (
        <div
          style={{
            position: "absolute",
            top: searchPosition.top,
            left: searchPosition.left,
            height: `${SEARCH_BOX_HEIGHT}rem`,
            width: `${SEARCH_BOX_WIDTH}rem`,
          }}
          ref={searchBoxRef}
        >
          <UserSearch
            setShowUserSearch={setShowUserSearch}
            setSelected={setSelected}
          />
        </div>
      )}
      {error && <p>Error: {error.message}</p>}
    </>
  );
}
