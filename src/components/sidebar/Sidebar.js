import React from 'react';
import './Sidebar.css';
import SidebarOption from './SidebarOption.js';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <div className="sidebar">
            <Link to="/home">
                <TwitterIcon className="sidebar__twitter-icon" />
            </Link>
            <SidebarOption active Icon={HomeIcon} text="Home" />
            <SidebarOption Icon={SearchIcon} text="Explore" />
            <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
            <SidebarOption Icon={MailOutlineIcon} text="Messages" />
            <SidebarOption Icon={PermIdentityIcon} text="Profile" />
            <SidebarOption Icon={MoreHorizIcon} text="More" />
            <Button variant="outlined" className="sidebar__tweet" fullWidth>Tweet</Button>
        </div>
    );
}

export default Sidebar;