import React from "react";
import NavBar from "./NavBar";
import { sessionContext } from "../contexts/SessionProvider";
import { getSupabase } from "../utils/supabaseClient";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const supabase = getSupabase();

export default function CreateProject(props) {
  const { session } = useContext(sessionContext);
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    project_name: "",
    project_description: "",
  });

  const handleDataChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.project_name === "" || inputs.project_description === "") {
      alert("Please fill out all fields.");
      return;
    }
    try {
      const { data, error } = await supabase.rpc("create_new_project", {
        title_arg: inputs.project_name,
        description_arg: inputs.project_description,
        email_arg: session.user.email,
      });
      if (error) {
        console.log(error);
      }
      if (data) {
        console.log(data);
        navigate(-1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavBar />
      <form className="form center">
        <label className="specialtext">Project Name:</label>
        <input
          type="text"
          className="input userfullname"
          name="project_name"
          onChange={handleDataChange}
        />
        <label className="specialtext">Project Description</label>
        <input
          type="text"
          className="input useraffl"
          onChange={handleDataChange}
          name="project_description"
        />
        <button class="button" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </>
  );
}
