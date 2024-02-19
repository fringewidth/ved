//renders a list item. First item will be used to link to the data entity and will not be rendered.
//Second item will be rendered as a header
//Last item will be rendered with a colored circle TODO
import React from "react";

export default function HorizontalListItem(props) {
  const entries = Object.entries(props.item); //Converts object to array of arrays as [..[key,value]..]
  const [, [, title], ...rest] = entries; //extract only the values, group into title and rest
  const [, field] = rest.pop(); //rest contains [...field, citations] which are to be rendered separately
  const [, citations] = rest.pop();
  const normalText = rest.map(([, value]) => {
    if (value.length > 100) {
      value = value.slice(0, 150) + "...";
    }
    return <p>{value}</p>;
  });

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
    <li class="horlistitem">
      <div class="horitemtitle">{title}</div>
      <div>{normalText}</div>
      <div>Cited {citations} times</div>
      <div class="circletext">
        <div
          class="circle"
          style={{ backgroundColor: stringToColour(field) }}
        ></div>
        <div>{field}</div>
      </div>
    </li>
  );
}
