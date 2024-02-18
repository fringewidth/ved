//renders a list item. First item will be used to link to the data entity and will not be rendered.
//Second item will be rendered as a header
//Last item will be rendered as a field.
import React from "react";

export default function HorizontalListItem(props) {
  const entries = Object.entries(props.item);
  const [, [, title], ...rest] = entries;
  const [, field] = rest.pop();
  const [, citations] = rest.pop();
  const normalText = rest.map(([, value]) => {
    if (value.length > 100) {
      value = value.slice(0, 150) + "...";
    }
    return <p>{value}</p>;
  });

  return (
    <div class="horlistitem">
      <div class="horitemtitle">{title}</div>
      <div>{normalText}</div>
      <div>Cited {citations} times</div>
      <div>{field}</div>
    </div>
  );
}
