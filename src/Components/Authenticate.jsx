import React from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import authPageAnimation from "../assets/video/auth-page-animation.mp4";

export default function Authenticate(props) {
  const { authtype } = useParams();

  // const navbarButtons = {
  //   signup: authtype === "login",
  //   login: authtype === "signup",
  // };
  const authValues =
    authtype === ":login"
      ? { greeting: "Hello again!", buttonText: "Log in" }
      : { greeting: "Welcome!", buttonText: "Sign up" };

  return (
    <>
      {/* <NavBar buttons={navbarButtons} /> */}
      <NavBar />
      <div className="authpage">
        <video src={authPageAnimation} muted autoPlay loop>
          <source src={props.src} type="video/mp4" />
          <p>Your browser does not support video</p>
        </video>
        <div>
          <form action="" className="form">
            <p className="specialtext">{authValues.greeting}</p>
            <input type="text" placeholder="username" className="input" />
            <input type="password" placeholder="password" className="input" />
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
