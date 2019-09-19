import React, { useState } from 'react'
import LikeButton from './LikeButton'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisibility()}>
        <div style={hideWhenVisible}>
          {blog.title} {blog.author}
        </div>
        <div style={showWhenVisible}>
          <div>{blog.title}</div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            {blog.likes} likes <LikeButton/>
          </div>
          <div>added by {blog.author}</div>
        </div>
      </div>
    </div>
  )
}

export default Blog