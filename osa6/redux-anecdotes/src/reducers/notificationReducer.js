const notificationReducer = (state = 'Testi test', action) => {
    switch(action.type) {
        case 'VOTED':
            return action.notification
        default:
            return state
    }
}

export default notificationReducer