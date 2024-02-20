import React from "react";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import authPageAnimation from "../assets/video/auth-page-animation.mp4";

export default function Authenticate(props) {
  const { authtype } = useParams();
  if (authtype === "signup") {
    navbarButtons.signup = true;
  } else if (authtype === "login") {
    navbarButtons.login = true;
  }

  return (
    <>
      <NavBar buttons={navbarButtons} />
      <div class="authpage">
        <video src={authPageAnimation} muted autoPlay loop>
          <source src={props.src} type="video/mp4"></source>
          <p>Your browser does not support video</p>
        </video>
        <div>
          <form action="" class="form">
            <p class="specialtext">Welcome back!</p>
            <input type="text" placeholder="username" class="input"></input>
            <input type="password" placeholder="password" class="input"></input>
            <input type="submit" value="Login" class="submit button"></input>
          </form>
        </div>
      </div>
    </>
  );
}
