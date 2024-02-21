import React from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import authPageAnimation from "../assets/video/auth-page-animation.mp4";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabaseUrl = "https://txouxmylhwoxcyciynby.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default function Authenticate(props) {
  const { authtype } = useParams();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // const navbarButtons = {
  //   signup: authtype === "login",
  //   login: authtype === "signup",
  // };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: inputs.email,
      password: inputs.password,
    });
    if (data.user === null) {
      e.target.email.style.border = "1px solid red";
      e.target.password.style.border = "1px solid red";
    } else {
      e.target.email.style.border = "none";
      const { data, error } = await supabase
        .from("researchers")
        .select("username")
        .eq("email", inputs.email);

      navigate(`/user/:${data[0].username}`);
    }
  };
  const signup = (e) => {
    e.preventDefault();
  };
  const authValues =
    authtype === ":login"
      ? { greeting: "Hello again!", buttonText: "Log in", handleSubmit: login }
      : {
          greeting: "Welcome aboard!",
          buttonText: "Sign up",
          handleSubmit: signup,
        };

  return (
    <>
      <NavBar />
      <div className="authpage">
        <video src={authPageAnimation} muted autoPlay loop>
          <source src={props.src} type="video/mp4" />
          <p>Your browser does not support video</p>
        </video>
        <div>
          <form action="" className="form" onSubmit={authValues.handleSubmit}>
            <p className="specialtext">{authValues.greeting}</p>
            <input
              type="text"
              placeholder="email"
              className="input"
              name="email"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="password"
              className="input"
              name="password"
              onChange={handleInputChange}
            />
            <input
              type="submit"
              value={authValues.buttonText}
              className="submit button"
            />
          </form>
        </div>
      </div>
    </>
  );
}
