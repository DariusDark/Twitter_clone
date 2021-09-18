
const defaultState = {
    loggedIn: false,
    user: {},
    users: {}
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return { ...state, loggedIn: true, user: action.payload }
        case "ADD_ALLUSERS":
            return {...state, users: action.payload}
        default:
            return state
    }
};

export default reducer;