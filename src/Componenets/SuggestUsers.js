import React from "react";
import Avatar from "@mui/material/Avatar";

export default function CardHead(props) {
  return (
    <div
      className="userCl"
      onClick={() => {
        props.show();
        props.set();
      }}
    >
      <Avatar alt={props.name} src={props.src} />
      <p>{props.name}</p>
    </div>
  );
}
