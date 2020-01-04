import React, { useEffect } from "react";
import "./App.css";
//import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import BlogRows from "./components/BlogRows";
import BlogForm from "./components/BlogForm";
import LogoutButton from "./components/LogoutButton";
import Togglable from "./components/Togglable";
// import { useField } from './hooks'
import { connect } from "react-redux";
import Notification from "./components/Notification";
import { hideNotification, setNotification} from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, getUser } from "./reducers/loginReducer";

function App(props) {
  useEffect(() => {
    props.getUser();
  }, []);

  useEffect(() => {
    props.initializeBlogs();
  });
  return (
    <div className="App">
      <Notification />
      {props.login === null ? (
        <LoginForm />
      ) : (
        <div className="BlogsView">
          <h1>blogs</h1>
          <div>
            {props.login.username} logged in
            <LogoutButton />
          </div>
          <Togglable buttonLabel="new blog">
            <BlogForm />
          </Togglable>
          <BlogRows />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = {
  hideNotification,
  setNotification,
  initializeBlogs,
  setUser,
  getUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
