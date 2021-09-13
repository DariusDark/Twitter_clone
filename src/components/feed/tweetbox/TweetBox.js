import React from 'react'
import { Avatar, Button } from '@material-ui/core'
import './TweetBox.css';

function TweetBox() {
    return (
        <div className="tweet-box">
            <form className="tweet-box__form">
                <div className="tweet-box__form-container">
                    <Avatar className="tweet-box__user-avatar" src="https://lh3.googleusercontent.com/ogw/ADea4I4EQFZhWsFG4jyXidKR7XNHTzs6axq1T34Oqd_6mw=s83-c-mo" />
                    <input className="tweet-box__input" placeholder="What's happening?" type="text" />
                </div>
                <input  className="tweet-box__input-image" placeholder="Enter image URL" type="text" />
                <Button className="tweet-box__tweet-button">Tweet</Button>
            </form>
        </div>
    )
}

export default TweetBox
