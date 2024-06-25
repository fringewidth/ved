import React from "react";
import NavBar from "./NavBar";
import { createClient } from "@supabase/supabase-js/dist/module";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import BlueButton from "./BlueButton";
import document from "../assets/svg/document.svg";
import info from "../assets/svg/info.svg";
import link from "../assets/svg/link.svg";

const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default function PublicationPage() {
  const { publication_id } = useParams();
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
      .from("publications_page")
      .select()
      .eq("publication_id", publication_id.slice(1));
    setItems(data);
  };
  const getUsers = async () => {
    if (items.length > 0) {
      const usernames = items[0].researcher_usernames.split(" ");
      const promises = usernames.map(async (username) => {
        const { data, error } = await supabase
          .from("researchers")
          .select("username, first_name, last_name")
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

  const userList = users.map((user, index) => (
    <span style={{ color: "white" }}>
      <Link
        class="publication-page-link"
        to={`/user/:${user[0].username}`}
        key={index}
      >
        {user[0].first_name + " " + user[0].last_name}
      </Link>
      {index !== users.length - 1 ? ", " : ""}
    </span>
  ));
  if (items.length > 0) {
    return (
      <>
        <NavBar />
        <div className="pubdetails">
          <div class="paperdetails">
            <h1>{items[0].title}</h1>
            {userList}
            <p>
              Part of the project{" "}
              <Link
                class="publication-page-link"
                to={`/project/:${items[0].project_id}`}
              >
                {items[0].project_title}
              </Link>
              {"  "}|{"  "} Cited {items[0].citations_count}{" "}
              {items[0].citations_count === 1 ? "time" : "times"}
            </p>
            <p>{items[0].doi}</p>
            <p>{items[0].abstract}</p>
          </div>
          {items[0].issn ? (
            <div class="journaldetails">
              <div class="journallinks">
                <a href={items[0].url}>
                  <BlueButton>
                    <img src={document} />
                    Go to Paper
                  </BlueButton>
                </a>
                <p>
                  Appears on{" "}
                  <a
                    class="publication-page-link"
                    href={"https://" + items[0].journal_website_url}
                  >
                    {items[0].journal_name}
                    <img src={link} />
                  </a>
                </p>
              </div>

              <div className="journalinfo">
                <h1>
                  <img src={info} /> Journal Info
                </h1>
                <p>ISSN: {items[0].issn}</p>
                <p>Publisher: {items[0].publisher}</p>
                <p>Impact Factor: {items[0].impact_factor}</p>
                <p>Country: {items[0].country}</p>
                <p>Language: {items[0].language}</p>
                <p>
                  Contact Email:{" "}
                  <a
                    class="publication-page-link"
                    href={`mailto:${items[0].contact_email}`}
                  >
                    {items[0].contact_email}
                  </a>
                </p>
                <p>Review Process: {items[0].review_process}</p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  } else {
    return <p>loading...</p>;
  }
}
