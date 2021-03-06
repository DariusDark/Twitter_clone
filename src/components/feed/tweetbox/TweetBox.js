import React, { useState } from 'react';
import { Avatar, Button } from '@material-ui/core';
import './TweetBox.css';
import { useSelector } from 'react-redux';

function TweetBox({ createFunc }) {
    const [content, setContent] = useState('')
    const user = useSelector(state => state.user);
    function create(event) {
        event.preventDefault();
        if (content.trim()) {
            const newPost = {
                content: content.trim(),
                userId: user.id
            }
            createFunc(newPost);
            setContent('');
        }
    }
    return (
        <div className="tweet-box">
            <form 
            className="tweet-box__form" 
            onSubmit={(event) => {
                event.preventDefault();
            }}>
                <div className="tweet-box__form-container">
                    <Avatar
                        className="tweet-box__user-avatar"
                        src="https://lh3.googleusercontent.com/ogw/ADea4I4EQFZhWsFG4jyXidKR7XNHTzs6axq1T34Oqd_6mw=s83-c-mo"
                    />
                    <input
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        className="tweet-box__input"
                        placeholder="What's happening?"
                        type="text"
                    />
                </div>
                <Button onClick={create} className={`tweet-box__tweet-button`}>Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox;
