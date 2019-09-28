import React from 'react'
import Blog from './Blog'
const BlogRows = ({ blogs, addLike, removeBlog }) => {
    blogs.sort((a, b) => b.likes - a.likes)
    
    return (
        <div>
            <h1>blogs</h1>
            {blogs.map(blog => (
                <Blog
                    key={blog.id}
                    blog={blog}
                    addLike={addLike}
                    removeBlog={removeBlog}
                />
            )
            )}
        </div>
    )
}

export default BlogRows