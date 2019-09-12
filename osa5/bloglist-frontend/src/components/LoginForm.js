import React from 'react'


const LoginForm = ({ username, password, handleLogin, userCallback, passwordCallback }) => (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => userCallback(target.value)}
        //onChange={({ target }) => App.placeUser(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => passwordCallback(target.value)}
        //onChange={({ target }) => App.setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default LoginForm