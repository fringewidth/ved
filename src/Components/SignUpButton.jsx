import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function SignUpButton() {
  return (
    <Link to="/authenticate/:signup">
      <Button className="button" children={["Sign Up"]} />
    </Link>
  );
}
