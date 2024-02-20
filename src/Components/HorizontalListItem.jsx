//renders a list item. First item will be used to link to the data entity and will not be rendered.
//Second item will be rendered as a header
//Last item will be rendered with a colored circle TODO
import React from "react";
import { Link } from "react-router-dom";
import Field from "./Field";

export default function HorizontalListItem(props) {
  const entries = Object.entries(props.item); //Converts object to array of arrays as [..[key,value]..]
  const [[, id], [, title], ...rest] = entries; //extract only the values, group into title and rest
  const [, field] = rest.pop(); //rest contains [...field, citations] which are to be rendered separately
  const [, citations] = rest.pop();
  const normalText = rest.map(([, value]) => {
    if (value.length > 100) {
      value = value.slice(0, 150) + "...";
    }
    return <p>{value}</p>;
  });

  return (
    <Link to={`/${props.context}/:${id}`}>
      <li class="horlistitem">
        <div class="horitemtitle">{title}</div>
        <div>{normalText}</div>
        <div>Cited {citations} times</div>
        <Field field={field} />
      </li>
    </Link>
  );
}
