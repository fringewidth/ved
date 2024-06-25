//renders a list item. First item will be used to link to the data entity and will not be rendered.
//Second item will be rendered as a header

import { Link } from "react-router-dom";
import Field from "./Field";

export default function HorizontalListItem(props) {
  const entries = Object.entries(props.item); //Converts object to array of arrays as [..[key,value]..]
  const [[, id], [, title], ...rest] = entries; //extract only the values, group into title and rest
  const [, bottomText] = rest.pop(); //rest contains [...field, citations] which are to be rendered separately
  const [, citations] = rest.pop();
  const fixedLenText = rest.map(([, value]) => {
    if (value.length > 100) {
      value = value.slice(0, 150) + "...";
    }
    return <p>{value}</p>;
  });

  return (
    <Link to={`/${props.context}/:${id}`} class="horlistitem">
      <li>
        <div class="horitemtitle">{title}</div>
        <div>{fixedLenText}</div>
        <div>Cited {citations} times</div>
        <Field field={bottomText} />
      </li>
    </Link>
  );
}
