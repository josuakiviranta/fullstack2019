const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'VOTE_NOTIFICATION':
            return "You voted " + action.content
        case 'CREATION_NOTIFICATION':
            return "New anecdote " + action.content
        case 'HIDE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export default notificationReducer

export const notifyVote = (content) => {
    return {
        type: 'VOTE_NOTIFICATION',
        content
    }
}

export const notifyCreation = (content) => {
    return {
        type: 'CREATION_NOTIFICATION',
        content
    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE_NOTIFICATION'
    }
}

