import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "./NavBar";
import Field from "./Field";
import ProjectList from "./ProjectList";
import UserSearch from "./UserSearch";
import { getSupabase } from "../utils/supabaseClient";
import { sessionContext } from "../contexts/SessionProvider";

const supabase = getSupabase();

export default function ProjectPage() {
  const { project_id } = useParams();

  const { session } = useContext(sessionContext);

  const searchBoxRef = useRef(null);
  const addContributorRef = useRef(null);

  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [showUserSearch, setShowUserSearch] = useState(false);
  const [searchPosition, setSearchPosition] = useState({ left: 0, top: 0 });
  const [selected, setSelected] = useState(null);

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
      console.log("Contributor added");
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

  const handleDeleteProject = async () => {
    try {
      console.log("not supported yet");
      //   await supabase.rpc(
      //     "delete_project",
      //     {
      //       project_id_arg: project_id.slice(1),
      //       user_email_arg: session?.user.email,
      //     },
      //     { returnType: "single" }
      //   );
      //   // navigate("/user/:" + items?.admin_id);
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
      <div onClick={handleAddNewUser} class="link">
        <li>
          <div className="projauthorisadmin" ref={addContributorRef}>
            + Add Contributor
          </div>
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
