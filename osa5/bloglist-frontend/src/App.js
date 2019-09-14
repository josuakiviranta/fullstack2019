import React, { useState, useEffect } from 'react'
import './App.css';
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogRows from './components/BlogRows';
import BlogForm from './components/BlogForm';
import LogoutButton from './components/LogoutButton';

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    window.localStorage.clear()
    fetchBlogs()
  }, [])

  const userCallback = (username) => {
    setUsername(username)
  }

  const passwordCallback = (password) => {
    setPassword(password)
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log('inside add blog')
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(() => {
        console.log('created blog object')
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
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

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.clear()
      setUser(null)
    } catch (exception) {
      setErrorMessage('problem with loggingout')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

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
        :
        <div>
          <h1>blogs</h1>
          <div> 
          {user.name} logged in
          <LogoutButton 
          user={user}
          handleLogout={handleLogout}
          />  
          </div>
          <BlogForm
            title={newTitle}
            author={newAuthor}
            url={newUrl}
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
            addBlog={addBlog}
          />
          <BlogRows
            blogs={blogs}
          />
        </div>
      }
    </div>
  );
}

export default App;
