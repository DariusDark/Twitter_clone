const baseUrl = 'http://localhost:9999/api/'

const getPosts = () => {
    return fetch(`${baseUrl}posts`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(json => json)
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
    return fetch(`${baseUrl}posts`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    }).then(res => res.json())
}

const deletePost = (id) => {
    return fetch(`${baseUrl}posts/${id}`)
        .then(res => res.json())
}

export {
    getPosts,
    getById,
    addPost,
    updatePost,
    deletePost,
}