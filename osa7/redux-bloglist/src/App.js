import React, { useEffect } from "react";
import "./App.css";
//import loginService from './services/login'
import LoginForm from "./components/LoginForm";
import BlogRows from "./components/BlogRows";
import BlogForm from "./components/BlogForm";
import LogoutButton from "./components/LogoutButton";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import User from "./components/User"
// import { useField } from './hooks'
import { connect } from "react-redux";
import Notification from "./components/Notification";
import { hideNotification, setNotification} from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { setUser, getUser } from "./reducers/loginReducer";
import { getUsers } from "./reducers/userReducer"
import { BrowserRouter as Router,
Route, Link, Redirect, withRouter
} from 'react-router-dom'



function App(props) {
  const padding = {
    paddingRight: 5
  }

  useEffect(() => {
    props.getUser();
  }, []);

  useEffect(() => {
    props.getUsers()
    props.initializeBlogs();
  }, []);


  const userById = (id) => {
    return (
      props.users.find(u => u.id === id)
    )
  }
 
  return (
    <div className="App">
      <Notification />
      {props.login === null ? (
        <LoginForm />
      ) : (
        <div className="BlogsView">
          <Router>
            <h1>blogs</h1>
            <div>
              {props.login.username} logged in
              <LogoutButton />
            </div>
            <Togglable buttonLabel="new blog">
            <BlogForm />
            </Togglable>
            <div>
              <Link style={padding} to="/users">users</Link>
              <Link style={padding} to="/">blogs</Link>
            </div>
            <Route exact path="/" render={() =>
            <BlogRows/>
            } />
            <Route exact path="/users" render={() =>
            <Users/>}/>
            <Route exact path="/users/:id" render={({ match }) => 
            <User user={props.users.find(u => u.id === match.params.id)
            }/>
            } />
            </Router>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    login: state.login,
    users: state.users
  };
};

const mapDispatchToProps = {
  hideNotification,
  setNotification,
  initializeBlogs,
  setUser,
  getUser,
  getUsers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
