import React from "react";

//Props: chidlren: Array

export default function Button(props) {
  const children = props.children.map((child) => <div>{child}</div>);
  return <button className="button">{children}</button>;
}
