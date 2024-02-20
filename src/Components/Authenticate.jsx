import React from "react";
import NavBar from "./NavBar";
export default function Authenticate(props) {
  return (
    <>
      <NavBar />
      <div class="authpage">
        <video
          src="src/assets/video/auth-page-animation.mp4"
          muted
          autoPlay
          loop
        >
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
