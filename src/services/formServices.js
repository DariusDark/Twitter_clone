const baseUrl = 'http://localhost:9999/api/users/';
const allUsersUrl = 'http://localhost:9999/api/allUsers/';

const getUsers = () => {
    return fetch(`${allUsersUrl}`, {
        method: 'GET'
    })
    .then(res => res.json())
};

const createUser = (newUser) => {
    return fetch(`${baseUrl}add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
    }).then(res => res.json())
};

const userIn = (user) => {
    return fetch(`${baseUrl}?${user}`)
    .then(res => res.json())
};

export {
    getUsers,
    createUser,
    userIn
}