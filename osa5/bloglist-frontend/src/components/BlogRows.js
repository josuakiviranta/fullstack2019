import React from 'react'
import Blog from './Blog'
const BlogRows = ({ blogs, user }) => {
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
            {user.name} logged in
            <p></p>
            {rows()}
        </div>
    )
}

export default BlogRows