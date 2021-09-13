import React from 'react';
import './SidebarOption.css';

function SidebarOption({ active, text, Icon }) {
    return (
        <div className={`sidebar__option ${active && "active"}`}>
            <Icon className="sidebar__icon"/>
            <h2 className="sidebar__text">{text}</h2>
        </div>
    );
}

export default SidebarOption;