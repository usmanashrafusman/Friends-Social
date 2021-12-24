import React from "react";
import HomeIcon from "@mui/icons-material/Home";
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
        navigate("/post");
      }}
    >
      <ListItemIcon>
        <Link to="/" className="link">
          {<HomeIcon style={{ color: "#1976d2" }} />}
        </Link>
      </ListItemIcon>
      <Link to="/" className="link">
        <ListItemText primary="News Feed" />
      </Link>
    </ListItem>
  );
}
