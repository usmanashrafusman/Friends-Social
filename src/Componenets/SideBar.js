import React from 'react'
import List from "@mui/material/List";
import PostNav from "./PostsNav";
import SettingTab from './SettingTab';
import HomeTab from './HomeTab'
import FindFriendsTab from './FindFriendsTab'


export default function SideBar() {
    return (
        <List>
            <HomeTab/>
            <PostNav />
            <FindFriendsTab/>
            <SettingTab/>
        </List>
    )
}
