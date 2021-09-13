import React from 'react'
import './Feed.css';
import TweetBox from './tweetbox/TweetBox.js'; 
import Post from './post/Post.js';

function Feed() {
    return (
        <div className="feed">
            {/* Header */}
            <div className="feed__header">
            <h2 className="feed__title">Home</h2>

            </div>

            {/* TweetBox */}
            <TweetBox />

            {/* Post */}
            <Post 
            displayName="Darius Dark"
            userName="darius_dark"
            verified={true}
            text="There is work to be done"
            avatar="https://lh3.googleusercontent.com/ogw/ADea4I4EQFZhWsFG4jyXidKR7XNHTzs6axq1T34Oqd_6mw=s83-c-mo"
            timestamp={Date.now()}
            />
        </div>
    )
}

export default Feed
