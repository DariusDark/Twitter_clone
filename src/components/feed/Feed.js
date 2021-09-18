import React, { useState, useEffect } from 'react'
import './Feed.css';
import TweetBox from './tweetbox/TweetBox.js';
import Post from './post/Post.js';
import { getPosts, addPost, likePost, deletePost, updateContent } from '../../services/postsServices';

function Feed() {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        getPosts().then(res => {
            setPosts(res)
        })
    }, [])


    function createPost(newPost) {
        addPost(newPost).then((res) => {
            setPosts([res, ...posts])
        })
    }
    function likeEdit(updatedData) {
        likePost(updatedData).then(res => {
            const currPostIndex = posts.findIndex((item) => item.id === res.id);
            const postsCopy = [...posts];
            postsCopy.splice(currPostIndex, 1, res);
            setPosts([...postsCopy]);
        })
    }

    function deleteEdit(updatedData) {
        deletePost(updatedData).then(res => {
            const currPostIndex = posts.findIndex((item) => item.id === res.id);
            const postsCopy = [...posts];
            postsCopy.splice(currPostIndex, 1);
            setPosts([...postsCopy]);
        })
    }

    function contentEdit(updatedData) {
        updateContent(updatedData).then(res => {
            const currPostIndex = posts.findIndex((item) => item.id === res.id);
            const postsCopy = [...posts];
            postsCopy.splice(currPostIndex, 1, res);
            setPosts([...postsCopy]);
        })
    }

    return (
        <div className="feed">
            {/* Header */}
            <div className="feed__header">
                <h2 className="feed__title">Home</h2>
            </div>

            {/* TweetBox */}
            <TweetBox createFunc={createPost} />

            {/* Post */}

            {posts.map(item => <Post
                key={item.id}
                post={item}
                likeFunc={likeEdit}
                deleteFunc={deleteEdit}
                updateFunc={contentEdit}
            />)}
        </div>
    )
}

export default Feed
