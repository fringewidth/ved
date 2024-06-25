import React from "react";

// Button that contains a flex of passed props.children

export default function BlueButton(props) {
  const children = props.children.map((child) => <div>{child}</div>);
  return <button className="button">{children}</button>;
}
