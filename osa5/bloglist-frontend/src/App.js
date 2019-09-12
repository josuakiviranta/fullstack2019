import React , { useState, useEffect } from 'react'
import './App.css';
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogRows from './components/BlogRows';

function App() {
const [blogs, setBlogs] = useState([])
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [user, setUser] = useState(null)
const [errorMessage, setErrorMessage] = useState(null)


const userCallback = (username) => {
  setUsername(username)
}

const passwordCallback = (password) => {
  setPassword(password)
}

const handleLogin = async (event) => {
  event.preventDefault()
  try{
    const user = await loginService.login({
      username, password,
    })

    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}

  useEffect(() =>{
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])



  return (
    <div className="App">

      <Notification message={errorMessage} />

      {user === null ?
      <LoginForm 
      username={username} 
      password={password} 
      handleLogin={handleLogin}
      userCallback={userCallback}
      passwordCallback={passwordCallback} 
      />
      : <BlogRows blogs={blogs} user={user} />}
        
    </div> 
    ); 
}

export default App;
    