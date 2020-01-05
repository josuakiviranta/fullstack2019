import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/loginReducer'
import { Route } from 'react-bootstrap'

const LoginForm = (props) => {
  const loginObject = {
    username: null,
    password: null
  }
  
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    loginObject.username = username
    loginObject.password = password
    try {
    props.setUser(loginObject)
    }catch (exception) {
      props.setNotification('wrong username or password', 2)
    }
    
  }

  return (
    <div className="Login">
      <h1>log into application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input name="username"/>
        </div>
        <div>
          password
          <input name="password" type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}


const mapDispatchToProps = {
  setNotification,
  setUser: setUser
}


export default connect(
  null,
  mapDispatchToProps)
  (LoginForm)