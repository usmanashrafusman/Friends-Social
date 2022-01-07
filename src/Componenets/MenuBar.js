import React from 'react'
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import ListItemIcon from "@mui/material/ListItemIcon";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

export default function MenuBar() {
    return (
        <div className="navlinks-wrapper">
                <div className="navlinks">
                  <ListItemIcon>
                    <Link to="/home" className="link">
                      {<HomeIcon style={{ color: "#1976d2" }} />}
                    </Link>
                  </ListItemIcon>

                  <ListItemIcon>
                    <Link to="/setting" className="link">
                      {<SettingsIcon style={{ color: "#1976d2" }} />}
                    </Link>
                  </ListItemIcon>

                  <ListItemIcon>
                    <Link to="/setting" className="link">
                      {<NotificationsIcon style={{ color: "#1976d2" }} />}
                    </Link>
                  </ListItemIcon>

                  <ListItemIcon>
                    <Link to="/setting" className="link">
                      {<MailIcon style={{ color: "#1976d2" }} />}
                    </Link>
                  </ListItemIcon>
                </div>
              </div>
    )
}
