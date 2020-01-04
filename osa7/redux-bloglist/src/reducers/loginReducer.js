import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'GET_USER':
            return action.content
        case 'SET_USER':
            return action.content
        case 'HANDLE_LOGOUT':
            return null
        default:
            return state
    }
}

export default loginReducer


export const getUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        const user = JSON.parse(loggedUserJSON)
        if (user) {
        await blogService.setToken(user.token)
        }
        dispatch({
            type: 'GET_USER',
            content: user
        })
}
}


export const setUser = (loginObject) => {
    return async dispatch => {
        //console.log("SOSOSOSOSO")
        const users = await userService.getAll()
        users.forEach(u => console.log("User", u))
        const user = await loginService.login(loginObject)
        window.localStorage.setItem(
            'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        //const users = await loginService.getAll()
        //users.forEach(user => console.log("USER: ", user))
        dispatch({
            type: 'SET_USER',
            content: user
        })
    }
}

export const handleLogout = () => {
    return dispatch => {
        window.localStorage.clear()
        dispatch({
            type: 'HANDLE_LOGOUT'
        })
    }
}