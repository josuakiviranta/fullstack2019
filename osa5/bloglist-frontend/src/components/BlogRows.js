import React from 'react'
import Blog from './Blog'
const BlogRows = ({ blogs, addLike }) => {
    blogs.sort((a, b) => b.likes - a.likes)
    const rows = () => {
        return (blogs.map(blog =>
            <Blog
                key={blog.id}
                blog={blog}
                addLike={addLike}
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