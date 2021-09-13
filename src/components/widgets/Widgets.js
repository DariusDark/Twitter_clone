import React from 'react'
import './Widgets.css'
import {
    TwitterTimelineEmbed,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
    return (
        <div className="widgets">
            <div className="widgets__input-container">
                <input className="widgets__input" placeholder="Search Twitter" type="text" />
                <SearchIcon className="widgets__search-icon" />
            </div>

            <div className="widgets__container">

                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="AlifBank"
                    options={{ height: 400 }}
                />
            </div>
        </div>
    )
}

export default Widgets
