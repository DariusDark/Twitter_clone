import React from 'react'
import './Post.css';
import { Avatar } from '@material-ui/core'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

function Post({ displayName, userName, verified, timestamp, text, image, avatar }) {
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I4EQFZhWsFG4jyXidKR7XNHTzs6axq1T34Oqd_6mw=s83-c-mo" />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__header-text">
                        <h3>
                            <strong>{displayName}</strong>&nbsp;
                            <span className="post__header-speacial">
                                {verified ? <VerifiedUserIcon className="post__badge" /> : null}
                                &nbsp;<span className="post__user-id">@{userName}</span>
                            </span>
                        </h3>
                    </div>
                    <div className="post__header-description">
                        <p>I challange u to bla bla bla</p>
                    </div>
                </div>
                <img className="post__image" src="https://media2.giphy.com/media/o1FTW0Ys0jSOIRGOGr/giphy.webp" alt="" />
                <div className="post__footer">
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <RepeatIcon fontSize="small" />
                    <FavoriteBorderIcon fontSize="small" />
                    <PublishIcon fontSize="small" />
                </div>
            </div>
        </div>
    )
}

export default Post
