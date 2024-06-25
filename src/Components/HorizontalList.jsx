//renders a horizontal list.
//props: item to render.

import HorizontalListItem from "./HorizontalListItem.jsx";

export default function HorizontalList(props) {
  const HorizontalListItems = props.items.map((item) => (
    <HorizontalListItem context={props.context} item={item} />
  ));
  return <ul class="horlist">{HorizontalListItems}</ul>;
}
