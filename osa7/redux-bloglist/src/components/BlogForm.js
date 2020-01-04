import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from  '../reducers/notificationReducer'


const BlogForm = (props) => {    
    const blogObject = {
        title: '',
        author: '',
        url: '',
        user: '',
        visible: false,
        isAuthor: false
    }

    const addBlog = (event) => {
        event.preventDefault();
        const title = event.target.blogtitle.value
        const author = event.target.blogauthor.value
        const url = event.target.blogurl.value
        blogObject.title = title
        blogObject.author = author
        blogObject.url = url
        blogObject.user = props.user.id
        event.target.blogtitle.value = ""
        event.target.blogauthor.value = ""
        event.target.blogurl.value = ""
        props.setNotification(`added a new blog ${title}`, 2)
        props.createBlog(blogObject)
    }
    return (
        <div>
            <h1>create new</h1>
            <form onSubmit={addBlog}>
                <div>
                    title: 
                    <input name="blogtitle"
                    />
                </div>
                <div>
                    author: 
                    <input name="blogauthor"
                    />
                </div>
                <div>
                    url:
                     <input name="blogurl"
                    />
                </div>
                <div>
                    <button type="submit">create</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.login
    }
}

const mapDispatchToProps = {
    createBlog,
    setNotification
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)
    (BlogForm)