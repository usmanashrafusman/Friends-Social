import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function CardHead(props) {
  return (
    <CardHeader
      avatar={<Avatar alt={props.name} src={props.src} />}
      action={
        <IconButton aria-label="settings">
          {" "}
          <MoreVertIcon />{" "}
        </IconButton>
      }
      title={props.name}
      subheader={props.time}
    />
  );
}
