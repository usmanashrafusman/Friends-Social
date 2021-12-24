import React from "react";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useNavigate, Link } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function HomeTab() {
  const navigate = useNavigate();
  return (
    <ListItem
      button
      onClick={() => {
        navigate("/users");
      }}
    >
      <ListItemIcon>
        <Link to="/" className="link">
          {<GroupAddIcon style={{ color: "#1976d2" }} />}
        </Link>
      </ListItemIcon>
      <Link to="/" className="link">
        <ListItemText primary="Find Friends" />
      </Link>
    </ListItem>
  );
}
