import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { BrowserRouter as Router,
Route, Link, Redirect, withRouter
} from 'react-router-dom'

const BlogRows = (props) => {
    const linkStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5
    };
    
//<Blog key={blog.id} id={blog.id} blog={blog} />

    const blogList = props.blogs.map(blog =>
        <div key={blog.id} style={linkStyle}>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>{blog.title}</Link> 
        </div>
    )

return (
    <div>
        <h1>blogs</h1>
        <div>
            {blogList}
        </div>
    </div>
)
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
    (BlogRows)