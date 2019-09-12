import React from 'react'


const LoginForm = ({ username, password, handleLogin, userCallback, passwordCallback }) => (
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

export default LoginForm