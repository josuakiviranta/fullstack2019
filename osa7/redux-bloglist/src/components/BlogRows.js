import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { like } from '../reducers/blogReducer'

const BlogRows = (props) => {
    
    const blogList = props.blogs.map(blog => 
            <Blog key={blog.id} id={blog.id} blog={blog} />
    )

return (
    <div>
        <h1>blogs</h1>
        <ul>
            {blogList}
        </ul>
    </div>
)
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
    like
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (BlogRows)