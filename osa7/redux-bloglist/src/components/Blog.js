import React from "react";
import LikeButton from "./LikeButton";
import RemoveButton from "./RemoveButton";
import { connect } from "react-redux"
import { toggleVisibility, removeBlog } from "../reducers/blogReducer"

const Blog = (props) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const showWhenVisible = { display: props.blog.visible ? '' : 'none' };
  const removeButtonVisibility = { display: props.blog.isAuthor ? '' : 'none' };

  return (
    <div style={blogStyle}>
      <div onClick={() => props.toggleVisibility(props.blog, props.user)} className="title">{props.blog.title}</div>
      <div style={showWhenVisible} className="togglableContent">
        <a href={props.blog.url}>{props.blog.url}</a>
        <div>
          {props.blog.likes} likes 
          <LikeButton blogId={props.id}  />
        </div>
        <div>added by {props.blog.author}</div>
        <div style={removeButtonVisibility}>
          <RemoveButton id={props.id} />
        </div>
      </div>
    </div>
  );

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
