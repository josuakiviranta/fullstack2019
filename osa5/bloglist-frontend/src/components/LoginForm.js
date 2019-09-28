import React from 'react'
import PropTypes from 'prop-types'


const LoginForm = ({ username, password, handleLogin, userCallback, passwordCallback }) => {
  return (
    <div>
      <h1>log into application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
        <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => userCallback(target.value)}
          />
        </div>
        <div>
          password
        <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => passwordCallback(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  userCallback: PropTypes.func.isRequired,
  passwordCallback: PropTypes.func.isRequired
}

export default LoginForm