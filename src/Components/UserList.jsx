import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getSupabase } from "../utils/supabaseClient";
import { sessionContext } from "../contexts/SessionProvider";
import HorizontalList from "./HorizontalList.jsx";

const supabase = getSupabase();

export default function UserList(props) {
  const [items, setItems] = useState([]);
  const [email, setEmail] = useState(null);
  const { session } = useContext(sessionContext);

  useEffect(() => {
    getItems();
    getEmail();
  }, []);

  const getItems = async () => {
    const { data, error } = await supabase
      .from(props.table)
      .select(props.fields)
      .eq("username", props.username)
      .order("citations", { ascending: false });
    if (error) console.log(error);
    setItems(data);
  };

  const getEmail = async () => {
    const { data, error } = await supabase
      .from("researchers")
      .select("email")
      .eq("username", props.username);
    if (error) console.log(error);
    setEmail(data[0].email);
  };

  return (
    <div>
      <h1>
        {props.header}
        &nbsp;
        {session?.user.email === email && props.table == "user_projects" && (
          <Link
            to="/createProject"
            style={{
              textDecoration: "none",
              verticalAlign: "middle",
            }}
            className="button"
          >
            +
          </Link>
        )}
      </h1>
      <HorizontalList items={items} context={props.context} />
    </div>
  );
}
