const baseUrl = 'http://localhost:9999/api/'

const axios = async (url, params) => {
    let result = null;
    await fetch(url, {...params}).then(res => res.json()).then(json => result = json)
    return result
}

const getPosts = () => {
    let result = axios(`${baseUrl}posts`, { method: 'GET' })
    return result
}

const getById = (id) => {
    return fetch(`${baseUrl}posts/${id}`, {
        method: 'GET',
    }).then(res => res.json())
}

const addPost = (newPost) => {
    return fetch(`${baseUrl}posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost)
    }).then(res => res.json())
}

const updatePost = (updateData) => {
    return fetch(`${baseUrl}posts/${updateData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    }).then(res => res.json())
}

const likePost = (updatedData) => {
    return fetch(`${baseUrl}postLikes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    }).then(res => res.json())
}

const deletePost = (updatedData) => {
    return fetch(`${baseUrl}postRemove`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
    })
        .then(res => res.json())
}

export {
    getPosts,
    getById,
    addPost,
    updatePost,
    deletePost,
    likePost,
}