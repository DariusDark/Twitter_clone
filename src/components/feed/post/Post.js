import React from 'react'
import './Post.css';
import { Avatar } from '@material-ui/core'
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import Delete from '@material-ui/icons/DeleteOutlined';

function Post({ post, likeFunc, deleteFunc }) {
    function likeHandler() {
        const updatedData = {
            id: post.id,
            likes: ++post.likes
        }
        likeFunc(updatedData)
    }
    function deleteHandler() {
        const updatedData = {
            id: post.id
        }
        deleteFunc(updatedData);
    }
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I4EQFZhWsFG4jyXidKR7XNHTzs6axq1T34Oqd_6mw=s83-c-mo" />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__header-text">
                        <h3>
                            <strong>Darius Dark</strong>&nbsp;
                            <span className="post__header-speacial">
                                <VerifiedUserIcon className="post__badge" />
                                &nbsp;<span className="post__user-id">@darius_dark</span>
                            </span>
                        </h3>
                        <button className="post__delete" onClick={deleteHandler}><Delete fontSize="medium" /></button>
                    </div>
                    <div className="post__header-description">
                        <p>{post.content}</p>
                    </div>
                </div>
                <img className="post__image" src={post?.photo || 'https://www.allianceplast.com/wp-content/uploads/no-image.png'} alt="" />
                <div className="post__footer">
                    <ChatBubbleOutlineIcon fontSize="small" />
                    <RepeatIcon fontSize="small" />
                    <div className="post__footer-likes">
                        <FavoriteBorderIcon className="likes-icon" fontSize="small" onClick={likeHandler} />
                        <span className="likes">{post.likes}</span>
                    </div>
                    <PublishIcon fontSize="small" />
                </div>
            </div>
        </div>
    )
}

export default Post
