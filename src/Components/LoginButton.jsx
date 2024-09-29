import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <Link to="/authenticate/:login">
      <Button className="button" children={["Login"]} />
    </Link>
  );
}
