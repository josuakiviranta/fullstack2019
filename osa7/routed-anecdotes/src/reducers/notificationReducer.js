const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'NOTIFICATION':
            return action.content
        case 'HIDE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

export default notificationReducer

export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch ({
        type: 'NOTIFICATION',
        content, 
        time
        })
        await setTimeout(() => {
            dispatch(hideNotification())
        }, time * 1000)
    }
}


export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}