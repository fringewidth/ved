import React from "react";
import HorizontalList from "./HorizontalList.jsx";
import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
import { useState, useEffect } from "react";

export default function TopProjects(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    const { data, error } = await supabase
      .from(props.table)
      .select(props.fields)
      .where("username", "eq", props.username);
    if (error) console.log(error);
    setItems(data);
  };
  return (
    <div>
      <h1>{props.header}</h1>
      <HorizontalList items={items} />
    </div>
  );
}
