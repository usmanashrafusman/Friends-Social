import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import {useNavigate , Link} from 'react-router-dom'
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function SettingTab() {
    const navigate = useNavigate();
    return (
        <ListItem
        button
        onClick={() => {
          navigate("/setting");
        }}
      >
        <ListItemIcon>
          <Link to="/" className="link">
            {<SettingsIcon style={{color:"#1976d2"}}/>}
          </Link>
        </ListItemIcon>
        <Link to="/" className="link">
          <ListItemText primary="Setting" />
        </Link>
      </ListItem>
    )
}
