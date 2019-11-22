import React from 'react'
// import PropTypes from 'prop-types'
import { useField } from '../hooks'
// import { constants } from 'crypto';


const LoginForm = ({ handleLogin, userCallback, passwordCallback }) => {
  const usrname = useField('text')
  const psword = useField('password')
  
  return (
    <div className="Login">
      <h1>log into application</h1>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
          {...usrname}
          {...userCallback(usrname.value)}
          />
        </div>
        <div>
          password
          <input 
          {...psword}
          {...passwordCallback(psword.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

/*
LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  userCallback: PropTypes.func.isRequired,
  passwordCallback: PropTypes.func.isRequired
}
*/

export default LoginForm