import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Post.css';
import { Avatar } from '@material-ui/core';
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// import FavoriteIcon from '@material-ui/icons/Favorite';
import Delete from '@material-ui/icons/DeleteOutlined';
import Update from '@material-ui/icons/Create';
import ThreeDots from '@material-ui/icons/MoreHoriz';
import ShareIcon from '@material-ui/icons/Share';
import { useSelector } from 'react-redux';



function Post({ post, likeFunc, deleteFunc, updateFunc }) {
    const user = useSelector(state => state.user);
    const [toggleMenu, setToggleMenu] = useState(false);
    const [contentValue, setContentValue] = useState(post.content);
    const [toggleUpdate, setToggleUpdate] = useState(false);

    function likeHandler() {
        const updatedData = {
            id: post.id,
            likes: ++post.likes
        }
        likeFunc(updatedData)
    }
    function handleDelete() {
        const updatedData = {
            id: post.id
        }
        deleteFunc(updatedData);
    }
    function handleUpdate() {
        const trimedValue = contentValue.trim();
        const updatedData = {
            id: post.id,
            content: trimedValue
        }
        updateFunc(updatedData);
        setToggleUpdate(!toggleUpdate);
    }


    function handleChange(event) {
        setContentValue(event.target.value);
    }

    function handleToggle() {
        setToggleMenu(!toggleMenu);
    }
    function handleCancel() {
        setToggleUpdate(!toggleUpdate);
    }
    function handleToggleUpdate() {
        setToggleUpdate(!toggleUpdate);
    }

    const users = useSelector(state => state.users);
    let creator = () => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === post.creatorId) {
                return users[i];
            }
        }
    }
    let postCreator = creator();
    return (
        <div className="post">
            <div className="post__avatar">
                <Avatar src="https://lh3.googleusercontent.com/ogw/ADea4I4EQFZhWsFG4jyXidKR7XNHTzs6axq1T34Oqd_6mw=s83-c-mo" />
            </div>
            <div className="post__body">
                <div className="post__header">
                    <div className="post__header-text">
                        <h3>
                            <Link to="#" className="post__user-link">
                                <span className="post__user-name">{postCreator.userName}</span>&nbsp;
                                <span className="post__header-speacial">
                                    <VerifiedUserIcon className="post__badge" />&nbsp;
                                    <span className="post__user-id">@{postCreator.userName}</span>
                                </span>
                            </Link>
                        </h3>
                        {postCreator.id === user.id ?
                            <div onClick={handleToggle} className={`post__header-options ${toggleMenu ? 'active' : 'inactive'}`}>
                                <ThreeDots className="post__options-icon t-02" fontSize="medium" />
                                <div className="post__header-dropdown">
                                    <div className="post__options-delete" onClick={handleDelete}>
                                        <Delete className="post__options-delete-icon" fontSize="medium" />
                                        <p className="post__options-delete-text">Delete</p>
                                    </div>
                                    <div className="post__options-update" onClick={handleToggleUpdate}>
                                        <Update className="post__options-update-icon" fontSize="medium" />
                                        <p className="post__option-update-text">Update your post</p>
                                    </div>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                    <div className="post__header-description">
                        <p>{post.content}</p>
                    </div>
                </div>
                {post?.photo ? <img className="post__image" src={post.photo} alt={post.photo.alt} /> : null}
                <div className="post__footer">
                    <div className="post__footer-comments">
                        <ChatBubbleOutlineIcon className="post__comments-icon t-02" fontSize="small" />
                        {post?.comments ? <span className="post__comments t-02">{post.comments}</span> : null}
                    </div>
                    <div className="post__footer-retweets">
                        <RepeatIcon className="post__retweets-icon t-02" fontSize="small" />
                        {post?.retweet ? <span className="post__retweets t-02">{post.retweets}</span> : null}
                    </div>
                    <div className="post__footer-likes" onClick={likeHandler}>
                        <FavoriteBorderIcon className="post__likes-icon t-02" fontSize="small" />
                        {post?.likes ? <span className="post__likes t-02">{post.likes}</span> : null}
                    </div>
                    <div className="post__footer-share">
                        <ShareIcon className="post__share-icon t-02" fontSize="small" />
                    </div>
                </div>
            </div>
            <div className={`post__modal-screen ${toggleUpdate ? 'active' : 'inactive'}`}>
                <div className="modal-screen__container">
                    <textarea className="modal-screen__textarea" onInput={handleChange} value={contentValue}></textarea>
                    <div className="modal-screen__btns">
                        <button className="modal-screen__cancel-button" onClick={handleCancel}>Cancel</button>
                        <button className="modal-screen__update-button" onClick={handleUpdate}>Update Tweet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post
