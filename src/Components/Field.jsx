import React from "react";

export default function Field(props) {
  const stringToColour = (str) => {
    let hash = 0;
    str.split("").forEach((char) => {
      hash = char.charCodeAt(0) + ((hash << 5) - hash);
    });
    let colour = "#";
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff;
      colour += value.toString(16).padStart(2, "0");
    }
    return colour;
  };

  return (
    <div class="circletext">
      <div
        class="circle"
        style={{ backgroundColor: stringToColour(props.field.trim()) }}
      ></div>
      <div>{props.field}</div>
    </div>
  );
}
