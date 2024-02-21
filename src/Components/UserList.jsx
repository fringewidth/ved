import React from "react";
import HorizontalList from "./HorizontalList.jsx";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
import { useState, useEffect } from "react";

export default function UserList(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
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
  return (
    <div>
      <h1>{props.header}</h1>
      <HorizontalList items={items} context={props.context} />
    </div>
  );
}
