import React from 'react'
import Blog from './Blog'
const BlogRows = ({ blogs, addLike, removeBlog, username }) => {
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
                    username={username}
                />
            )
            )}
        </div>
    )
}

export default BlogRows