//Sorts by citations and returns top objects. Objects specified by props.

import HorizontalList from "./HorizontalList.jsx";
import { supabase } from "../utils/supabase";

import { useState, useEffect } from "react";

export default function TopProjects(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, []);

  // returns a promise, and hence cannot be directly used in useEffect
  const getItems = async () => {
    const { data, error } = await supabase
      .from(props.table)
      .select(props.fields)
      .order("citations", { ascending: false })
      .limit(props.count);
    if (error) console.log(error);
    setItems(data);
  };

  return (
    <div>
      <h1>{props.header}</h1>
      <HorizontalList context={props.context} items={items} />
    </div>
  );
}
