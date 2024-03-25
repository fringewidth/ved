import React from "react";
import { getSupabase } from "../utils/supabaseClient";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import authPageAnimation from "../assets/video/auth-page-animation2.mp4";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { sessionContext } from "../contexts/SessionProvider";

const supabase = getSupabase();

const initialInputs = { email: "", password: "" };

export default function Authenticate(props) {
  const { authtype } = useParams();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { session, setSession } = useContext(sessionContext);

  // reset inputs and error message when switching between login and signup
  useEffect(() => {
    setInputs(initialInputs);
    setErrorMsg("");
    emailRef.current.style.border = "none";
    passwordRef.current.style.border = "none";
  }, [authtype]);

  const [inputs, setInputs] = useState(initialInputs);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  console.log(session);
  const handleError = (error) => {
    setErrorMsg(error.message);
  };

  const handleInputChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  console.log(session);

  const login = async (e) => {
    e.preventDefault();

    // sign in user
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: inputs.email,
      password: inputs.password,
    });
    if (error) {
      handleError(error);
    } else {
      e.target.email.style.border = "none";

      // fetch username and navigate to user page
      const { data, error } = await supabase
        .from("researchers")
        .select("username")
        .eq("email", inputs.email);

      if (error) {
        handleError(error);
      } else navigate(`/user/:${data[0]?.username}`);
    }
    if (user === null) {
      // user does not exist
      e.target.email.style.border = "1px solid red";
      e.target.password.style.border = "1px solid red";
    }
  };

  const signup = async (e) => {
    e.preventDefault();
    // sign up user
    const { data, error } = await supabase.auth.signUp({
      email: inputs.email,
      password: inputs.password,
    });
    if (error) {
      handleError(error);
    }

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

  // set authtype specific values
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
            {errorMsg !== "" ? (
              <div className="autherror">{errorMsg}</div>
            ) : null}
            <input
              type="text"
              placeholder="email"
              className="input auth"
              name="email"
              onChange={handleInputChange}
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="password"
              className="input auth"
              name="password"
              onChange={handleInputChange}
              ref={passwordRef}
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
