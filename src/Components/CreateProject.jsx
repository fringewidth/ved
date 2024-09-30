import React, { useContext, useState, useEffect } from "react";
import NavBar from "./NavBar";
import { sessionContext } from "../contexts/SessionProvider";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";


export default function CreateProject(props) {
  const { session } = useContext(sessionContext);
  const [error, setError] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    project_name: "",
    project_description: "",
    project_field: "root",
  });

  useEffect(() => {
    getAllFields();
  }, []);

  const handleDataChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.project_name === "" || inputs.project_description === "") {
      setError("Please fill out all fields");
      return;
    }
    if (inputs.project_field === "root") {
      setError("Field cannot be root");
      return;
    }

    const { data, error } = await supabase.rpc("create_new_project", {
      title_arg: inputs.project_name,
      description_arg: inputs.project_description,
      field_name_arg: inputs.project_field,
      email_arg: session.user.email,
    });
    if (error) {
      setError(error.message);
      console.log(error);
    }
    if (data) {
      navigate(-1);
    }
  };

  const getAllFields = async () => {
    const { data, error } = await supabase.from("fields").select("name");
    if (error) {
      console.log(error);
    }
    setFields(data.map((field) => field.name));
  };

  return (
    <>
      <NavBar />
      <form className="projcreateform">
        {error && <div className="errormsg">{error}</div>}
        <h1>Project Name</h1>
        <input
          type="text"
          className="input"
          name="project_name"
          onChange={handleDataChange}
        />
        <h1>Project Description</h1>
        <textarea
          type="text"
          rows="10"
          cols="100"
          className="input desc"
          onChange={handleDataChange}
          name="project_description"
        />
        <h1>Field</h1>
        <select
          className="input"
          name="project_field"
          onChange={handleDataChange}
        >
          {fields.map((field) => (
            <option value={field}>{field}</option>
          ))}
        </select>
        <br />
        <button
          className="button"
          style={{
            width: "100px",
            margin: "auto",
          }}
          onClick={handleSubmit}
        >
          Create
        </button>
      </form>
    </>
  );
}
