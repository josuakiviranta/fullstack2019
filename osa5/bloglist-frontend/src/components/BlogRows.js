import React from 'react'
import Blog from './Blog'
const BlogRows = ({ blogs, user, handleLogout }) => {
    const rows = () => {
        return (blogs.map(blog =>
            <Blog
                key={blog.id}
                blog={blog}
            />
        )
        )
    }
    console.log('Rows', rows())
    console.log('User === null ?', user)
    return (
        <div>
            <h1>blogs</h1>
            <div>
                {user.name} logged in
                <button id={user.id} onClick={handleLogout}>logout</button>
            </div>
            <p></p>
            {rows()}
        </div>
    )
}

export default BlogRows