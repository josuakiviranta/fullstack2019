import React , { useState, useEffect } from 'react'
//import logo from './logo.svg';
import './App.css';
import blogService from './services/blogs'
import Blog from './components/Blog'
//import { thisExpression } from '@babel/types';

function App() {
const [blogs, setBlogs] = useState([])

  useEffect(() =>{
    blogService
    .getAll()
    .then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  const rows = () => blogs.map(blog => 
    <Blog
      key={blog.id}
      blog={blog}
    />
    )

  return (
    <div className="App">
      <h1>Blogs</h1>

      {/*<Notification message={errorMessage} />*/}

      <h2>Login</h2>
      {rows()}
    </div> 
    ); 
}

export default App;

/*
    <div className="App">
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />*
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
    