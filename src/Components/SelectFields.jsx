import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";

export default function SelectFields(props) {
  const [fields, setFields] = useState([]);

  useEffect(() => {
    const getAllFields = async () => {
      const { data, error } = await supabase.from("fields").select("name");
      if (error) {
        console.log(error);
      }
      setFields(data.map((field) => field.name));
    };

    getAllFields();
  }, []);

  return (
    <select
      className="input"
      name={props.name || ""}
      onChange={props.onChange || ""}
    >
      {fields.length > 0 ? (
        fields.map(
          (field) =>
            field != "root" && (
              <option
                value={field}
                selected={field === props.defaultValue && "selected"}
              >
                {field}
              </option>
            )
        )
      ) : (
        <option>{props.defaultValue}</option>
      )}
    </select>
  );
}
