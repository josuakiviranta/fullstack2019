import React from 'react'
import Blog from './Blog'
const BlogRows = ({ blogs }) => {
    const rows = () => {
        return (blogs.map(blog =>
            <Blog
                key={blog.id}
                blog={blog}
            />
        )
        )
    }
    return (
        <div>
            <h1>blogs</h1>
            {rows()}
        </div>
    )
}

export default BlogRows