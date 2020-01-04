import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            const sorted = action.data.sort((a, b) => b.likes - a.likes)
            return sorted
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'TOGGLE_VISIBILITY':
            const blog = state.find(b => b.id === action.id)
            const toggledBlog = {
                ...blog,
                visible: !blog.visible,
                isAuthor: action.author === action.username ? true : false
            }
            const toggledState = state.map(b =>
                b.id !== action.id ? b : toggledBlog)
            return toggledState
        case 'LIKE':
            const id = action.likedBlog.id
            const changedState = state.map(blog => 
                blog.id !== id ? blog : action.likedBlog)
                .sort((a,b) => b.likes - a.likes)
            return changedState
        case 'REMOVE':
            return action.blogs
        default:
            return state
    }
}

export default blogReducer

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogService.create(content)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const toggleVisibility = (blog, user) => {
    return dispatch => {
        dispatch ({
        type: 'TOGGLE_VISIBILITY',
        id: blog.id,
        author: blog.author,
        username: user.username
    })
    }
}

export const like = (id) => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        const blogToLike = blogs.find(b => b.id === id)
        const changedBlog = {
            ...blogToLike,
            likes: blogToLike.likes + 1,
            visible: true
        }
        const likedBlog = await blogService.update(changedBlog)
        dispatch({
            type: 'LIKE',
            likedBlog
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.deleteBlog(id)
        const blogs = await blogService.getAll()
        dispatch({
            type: 'REMOVE',
            id: id,
            blogs: blogs
        })
    }
}