import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PictureInPictureIcon from "@mui/icons-material/PictureInPicture";
import Link from "@mui/material/Link";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./State/index";

export default function PostsNav() {
  const dispatch = useDispatch();
  const { postFromReducer } = bindActionCreators(actionCreators, dispatch);
  const postDiv = useSelector((state) => state.postFromReducer);

  const onPost = () => {
    if (!postDiv) {
      postFromReducer(true);
    }
  };

  return (
    <ListItem button onClick={onPost}>
      <ListItemIcon>
        <Link to="/" className="link">
          {<PictureInPictureIcon />}
        </Link>
      </ListItemIcon>
      <Link to="/" className="link">
        <ListItemText primary="Posts" />
      </Link>
    </ListItem>
  );
}
