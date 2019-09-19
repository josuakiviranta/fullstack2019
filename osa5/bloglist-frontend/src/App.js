import React, { useState, useEffect } from 'react'
import './App.css';
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/ErrorNotification'
import LoginForm from './components/LoginForm'
import BlogRows from './components/BlogRows';
import BlogForm from './components/BlogForm';
import LogoutButton from './components/LogoutButton';
import SuccessNotification from './components/SuccessNotification';
import Togglable from './components/Togglable'

function App() {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

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
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      user: user.id
    }


    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setBlogs(blogs.concat(returnedBlog))
        showSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
  }

  const showSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage(null)
    }, 7000)
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
      setErrorMessage('wrong username or password')
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
      <SuccessNotification message={successMessage} />

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
          <Togglable buttonLabel="new note">
            <BlogForm
              title={newTitle}
              author={newAuthor}
              url={newUrl}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleUrlChange={handleUrlChange}
              addBlog={addBlog}
            />
          </Togglable>
          <BlogRows
            blogs={blogs}
          />
        </div>
      }
    </div>
  );
}

export default App;
