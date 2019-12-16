const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'ANECDOTE_FILTER':
            return action.content
        default:
            return state
    }
}

export default filterReducer

export const filterChange = ( content ) => {
    return {
        type: 'ANECDOTE_FILTER',
        content
    }
}