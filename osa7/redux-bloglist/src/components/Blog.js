import React from "react";
import LikeButton from "./LikeButton";
import RemoveButton from "./RemoveButton";
import { connect } from "react-redux"
import { toggleVisibility, removeBlog } from "../reducers/blogReducer"

const Blog = (props) => {
  if (props.blog === undefined ) {
    return null
}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const removeButtonVisibility = { display: props.blog.author == props.user.username ? '' : 'none' };
  return(
    <div style={blogStyle}>
      <h2>{props.blog.title}</h2>
      <a href="url">{props.blog.url}</a>
      <div>
        {props.blog.likes}
        <LikeButton id={props.blog.id}/>
      </div>
      <p>{`added by ${props.blog.author}`}</p>
      <div style={removeButtonVisibility}>
          <RemoveButton id={props.blog.id} />
      </div>
    </div>
  )
};
const mapStateToProps = (state) => {
  return {
    user: state.login
  }
}

const mapDispatchToProps = {
  toggleVisibility,
  removeBlog
} 

export default connect(
  mapStateToProps,
  mapDispatchToProps)(Blog);
