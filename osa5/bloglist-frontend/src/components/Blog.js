import React, { useState } from 'react'
import LikeButton from './LikeButton'
import RemoveButton from './RemoveButton'

const Blog = ({ blog, addLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  // const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisibility()}>{blog.title} </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes <LikeButton blogId={blog.id} addLike={addLike} />
        </div>
        <div>added by {blog.author}</div>
        <div>
          <RemoveButton blogId={blog.id} removeBlog={removeBlog} />
        </div>
      </div>
    </div>
  )
}

export default Blog